import { useCallback, useState, useRef } from "react";
import { getAudioFilename } from "@/lib/hash";

export function useTextToSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const speak = useCallback(async (text: string, fallbackText?: string) => {
    // Stop any existing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    try {
      setSpeaking(true);
      const filename = await getAudioFilename(text);
      const audio = new Audio(`/audio/${filename}`);
      audioRef.current = audio;

      audio.onended = () => {
        setSpeaking(false);
        audioRef.current = null;
      };

      audio.onerror = () => {
        console.error("Failed to play audio file:", filename);
        // Fallback to English TTS if available
        if (fallbackText && typeof window !== "undefined" && "speechSynthesis" in window) {
          const utterance = new SpeechSynthesisUtterance(fallbackText);
          utterance.lang = "en-US";
          utterance.rate = 0.85;
          utterance.onend = () => setSpeaking(false);
          utterance.onerror = () => setSpeaking(false);
          window.speechSynthesis.speak(utterance);
        } else {
          setSpeaking(false);
        }
      };

      await audio.play();
    } catch (err) {
      console.error("Audio playback failed", err);
      setSpeaking(false);
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
  }, []);

  return { speak, stop, speaking, supported: true };
}
