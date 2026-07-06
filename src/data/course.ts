export type ResourceType = "video" | "audio" | "article" | "docs";

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

import { week1 } from "./weeks/week1";
import { week2 } from "./weeks/week2";
import { week3 } from "./weeks/week3";
import { week4 } from "./weeks/week4";
import { week5 } from "./weeks/week5";
import { week6 } from "./weeks/week6";
import { week7 } from "./weeks/week7";
import { week8 } from "./weeks/week8";
import { week9 } from "./weeks/week9";
import { week10 } from "./weeks/week10";
import { week11 } from "./weeks/week11";
import { week12 } from "./weeks/week12";

export const COURSE_TITLE = "Medical Arabic for Physiotherapists";
export const COURSE_SUBTITLE = "Movement & Healing: Conversational Medical Arabic";

export const CAPSTONE = {
  "title": "Discharge, Home Care & Capstone",
  "description": "The final module culminates the clinical interaction: anticipatory guidance on post-treatment responses (DOMS), lifestyle modifications, a final teach-back comprehension check, and culturally warm farewells to close the encounter and secure follow-up."
};

export const WEEKS: Week[] = [
  week1,
  week2,
  week3,
  week4,
  week5,
  week6,
  week7,
  week8,
  week9,
  week10,
  week11,
  week12
];

export interface VocabEntry {
  id: string;
  arabic: string;
  transliteration: string;
  note?: string;
  nextReviewDate?: number;
  // SM-2 SRS Algorithm Fields
  repetition?: number; // Number of consecutive correct answers
  interval?: number; // Days until next review
  efactor?: number; // Easiness factor (starts at 2.5)
}

export const LEVELS = [
  {
    "level": 1,
    "title": "Student",
    "min": 0
  },
  {
    "level": 2,
    "title": "Clinical Novice",
    "min": 100
  },
  {
    "level": 3,
    "title": "Bedside Communicator",
    "min": 250
  },
  {
    "level": 4,
    "title": "Fluent Clinician",
    "min": 450
  },
  {
    "level": 5,
    "title": "Clinical Communicator",
    "min": 700
  }
];

export const XP_PER_QUIZ = 25;
export const XP_PER_FLASHCARD = 5;
export const XP_PER_WEEK = 50;

export function levelForXp(xp: number) {
  let current = LEVELS[0];
  for (const l of LEVELS) {
    if (xp >= l.min) current = l;
  }
  const idx = LEVELS.indexOf(current);
  const next = LEVELS[idx + 1] ?? null;
  return { ...current, next };
}
