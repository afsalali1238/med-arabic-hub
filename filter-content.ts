import fs from 'fs';
import path from 'path';

// Import the current data
import { WEEKS as physioWeeks, COURSE_TITLE, COURSE_SUBTITLE, CAPSTONE, LEVELS, XP_PER_QUIZ, XP_PER_FLASHCARD, XP_PER_WEEK } from './src/data/course';

// We want to clean up weeks 9, 10, 11, and 12
const termsToRemove = [
  "Pharmacy",
  "Liver",
  "Kidney",
  "Urine",
  "Milk",
  "Food",
  "Conjunctiva",
  "Cerebrum",
  "Tongue",
  "Breast",
  "Death",
  "Constipation",
  "Diarrhea",
  "Stomach cramps",
  "Toothache",
  "Indigestion",
  "Baldness",
  "Tonsillitis",
  "Motion Sickness",
  "Dry Skin",
  "Two drops each eye 4 times a day",
  "Chew; Do Not Swallow Whole",
  "To be given orally",
  "Shake the bottle before use",
  "Use in pregnancy",
  "Use in lactation",
  "For internal use",
  "Not to be repeated",
  "Keep at room temperature",
  "Use without dilution",
  "Keep the bottle tightly closed",
  "Keep out of the reach of children",
  "Avoid contact with eye, skin, and clothes",
  "Store in a dry place, protect from light",
  "Store in a refrigerator",
  "Complete the course",
  "Alternative (Generic)",
  "Up to the mark"
];

for (const w of physioWeeks) {
  if (w.number >= 9) {
    for (const table of w.vocabTables) {
      // Filter out rows where the English term is in termsToRemove
      table.rows = table.rows.filter(row => !termsToRemove.includes(row[0]));
    }
  }
}

// Add a specific physio replacement for Pharmacy
const week9 = physioWeeks.find(w => w.number === 9);
if (week9) {
  week9.vocabTables[0].rows.push([
    "Rehab Center / Clinic",
    "مركز تأهيل",
    "Markaz Ta'heel"
  ]);
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

fs.writeFileSync('./src/data/course.ts', newContent);
console.log("Successfully filtered irrelevant terms from course.ts");
