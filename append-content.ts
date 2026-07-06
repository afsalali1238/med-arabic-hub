import fs from 'fs';
import path from 'path';

const araCoursePath = 'C:\\Users\\HP\\Desktop\\antigravity\\Ara\\src\\data\\course.ts';
const physioCoursePath = 'C:\\Users\\HP\\Desktop\\antigravity\\physio\\src\\data\\course.ts';

// We can extract the raw text or we can just run a regex/ast parse.
// A simpler way: we just read both files as strings, but since they are TypeScript, we can't `require` them easily without compiling.
// Actually, I can use tsx to import both, merge the WEEKS array, and then overwrite physio/course.ts.
// But wait, if I import them, I get JS objects. I'd have to serialize them back to TS code, which means JSON.stringify.
// But `course.ts` contains `export type ...` and `export const COURSE_TITLE ...`. I can just rewrite the whole file with JSON.stringify for WEEKS, like I did earlier!

import { WEEKS as araWeeks } from '../Ara/src/data/course';
import { WEEKS as physioWeeks, COURSE_TITLE, COURSE_SUBTITLE, CAPSTONE, LEVELS, XP_PER_QUIZ, XP_PER_FLASHCARD, XP_PER_WEEK } from './src/data/course';

const weeksToAdd = [
  araWeeks[0], // Dispensing & Admin (rename to Clinical Administration)
  araWeeks[1], // History Taking
  araWeeks[4], // Symptoms & OTC (rename to Symptoms & Triage)
  araWeeks[7], // Empathy
];

let nextNumber = physioWeeks.length + 1;

for (const w of weeksToAdd) {
  w.id = `week-${nextNumber}`;
  w.number = nextNumber;
  
  if (w.title === "Dispensing & Administrative Basics") w.title = "Clinical Administration Basics";
  if (w.title === "Symptoms & OTC Triage") w.title = "General Symptoms & Triage";
  
  physioWeeks.push(w);
  nextNumber++;
}

const newContent = `export type ResourceType = "video" | "audio" | "article" | "docs";

export interface Resource {
  type: ResourceType;
  title: string;
  description: string;
  url: string;
}

export interface VocabTable {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface Checkpoint {
  id: string;
  label: string;
}

export interface Scenario {
  patient: string;
  instructions: string;
  answerKey: {
    arabic: string;
    transliteration: string;
    rationale: string;
  };
}

export interface Week {
  id: string;
  number: number;
  title: string;
  timeAllocation: string;
  coreConcepts: string[];
  focusAreas: { title: string; description: string }[];
  vocabTables: VocabTable[];
  resources: Resource[];
  checkpoints: Checkpoint[];
  scenario: Scenario;
}

export const COURSE_TITLE = ${JSON.stringify(COURSE_TITLE)};
export const COURSE_SUBTITLE = ${JSON.stringify(COURSE_SUBTITLE)};

export const CAPSTONE = ${JSON.stringify(CAPSTONE, null, 2)};

export const WEEKS: Week[] = ${JSON.stringify(physioWeeks, null, 2)};

export interface VocabEntry {
  id: string;
  arabic: string;
  transliteration: string;
  note?: string;
  nextReviewDate?: number;
  interval?: number;
}

export const LEVELS = ${JSON.stringify(LEVELS, null, 2)};

export const XP_PER_QUIZ = ${XP_PER_QUIZ};
export const XP_PER_FLASHCARD = ${XP_PER_FLASHCARD};
export const XP_PER_WEEK = ${XP_PER_WEEK};

export function levelForXp(xp: number) {
  let current = LEVELS[0];
  for (const l of LEVELS) {
    if (xp >= l.min) current = l;
  }
  const idx = LEVELS.indexOf(current);
  const next = LEVELS[idx + 1] ?? null;
  return { ...current, next };
}
`;

fs.writeFileSync(physioCoursePath, newContent);
console.log("Successfully appended Ara weeks to Physio course.ts");
