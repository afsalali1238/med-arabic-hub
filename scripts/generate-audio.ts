import fs from 'fs';
import path from 'path';
import * as googleTTS from 'google-tts-api';
import { WEEKS } from '../src/data/course';

const AUDIO_DIR = path.join(process.cwd(), 'public/audio');

async function getAudioFilename(text: string) {
  const msgBuffer = new TextEncoder().encode(text);
  const hashBuffer = await globalThis.crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex + ".mp3";
}

async function downloadAudio(text: string, filename: string) {
  const filepath = path.join(AUDIO_DIR, filename);
  if (fs.existsSync(filepath)) {
    console.log(`Skipping ${filename} (already exists)`);
    return;
  }
  
  try {
    const url = googleTTS.getAudioUrl(text, {
      lang: 'ar',
      slow: false,
      host: 'https://translate.google.com',
    });
    
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(filepath, Buffer.from(buffer));
    console.log(`Downloaded ${filename}`);
  } catch (err) {
    console.error(`Failed to download audio for text: ${text}`, err);
  }
}

async function main() {
  if (!fs.existsSync(AUDIO_DIR)) {
    fs.mkdirSync(AUDIO_DIR, { recursive: true });
  }

  const allArabicStrings = new Set<string>();

  for (const week of WEEKS) {
    for (const table of week.vocabTables) {
      for (const row of table.rows) {
        if (row[1]) allArabicStrings.add(row[1]);
      }
    }
    if (week.scenario?.answerKey?.arabic) {
      allArabicStrings.add(week.scenario.answerKey.arabic);
    }
  }

  console.log(`Found ${allArabicStrings.size} unique Arabic strings.`);

  for (const text of allArabicStrings) {
    const filename = await getAudioFilename(text);
    await downloadAudio(text, filename);
    await new Promise(r => setTimeout(r, 500)); // Rate limiting
  }
  
  console.log("Audio generation complete.");
}

main().catch(console.error);
