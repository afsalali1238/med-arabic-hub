import { Volume2, VolumeX } from "lucide-react";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  text: string;
  fallbackText?: string;
  className?: string;
}

export function SpeakButton({ text, fallbackText, className }: Props) {
  const { speak, stop, speaking, supported } = useTextToSpeech();

  if (!supported) return null;

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (speaking) stop();
        else speak(text, fallbackText);
      }}
      className={cn(
        "h-7 w-7 text-muted-foreground transition-all hover:text-primary focus:opacity-100",
        speaking && "animate-pulse text-primary",
        className,
      )}
      title={speaking ? "Stop" : "Listen to pronunciation"}
      aria-label="Listen to pronunciation"
    >
      {speaking ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
    </Button>
  );
}
