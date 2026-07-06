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

import { week1 as physioWeek1 } from "./physio/week1";
import { week2 as physioWeek2 } from "./physio/week2";
import { week3 as physioWeek3 } from "./physio/week3";
import { week4 as physioWeek4 } from "./physio/week4";
import { week5 as physioWeek5 } from "./physio/week5";
import { week6 as physioWeek6 } from "./physio/week6";
import { week7 as physioWeek7 } from "./physio/week7";
import { week8 as physioWeek8 } from "./physio/week8";
import { week9 as physioWeek9 } from "./physio/week9";
import { week10 as physioWeek10 } from "./physio/week10";
import { week11 as physioWeek11 } from "./physio/week11";
import { week12 as physioWeek12 } from "./physio/week12";

import { week1 as pharmacyWeek1 } from "./pharmacy/week1";
import { week2 as pharmacyWeek2 } from "./pharmacy/week2";
import { week3 as pharmacyWeek3 } from "./pharmacy/week3";
import { week4 as pharmacyWeek4 } from "./pharmacy/week4";
import { week5 as pharmacyWeek5 } from "./pharmacy/week5";
import { week6 as pharmacyWeek6 } from "./pharmacy/week6";

export interface CourseTrack {
  id: string;
  title: string;
  subtitle: string;
  capstone?: { title: string; description: string };
  weeks: Week[];
}

export const PHYSIO_TRACK: CourseTrack = {
  id: "physio",
  title: "Medical Arabic for Physiotherapists",
  subtitle: "Movement & Healing: Conversational Medical Arabic",
  capstone: {
    title: "Discharge, Home Care & Capstone",
    description:
      "The final module culminates the clinical interaction: anticipatory guidance on post-treatment responses (DOMS), lifestyle modifications, a final teach-back comprehension check, and culturally warm farewells to close the encounter and secure follow-up.",
  },
  weeks: [
    physioWeek1,
    physioWeek2,
    physioWeek3,
    physioWeek4,
    physioWeek5,
    physioWeek6,
    physioWeek7,
    physioWeek8,
    physioWeek9,
    physioWeek10,
    physioWeek11,
    physioWeek12,
  ],
};

export const PHARMACY_TRACK: CourseTrack = {
  id: "pharmacy",
  title: "Medical Arabic for Pharmacy",
  subtitle: "Medications, Dosage & Instructions",
  weeks: [pharmacyWeek1, pharmacyWeek2, pharmacyWeek3, pharmacyWeek4, pharmacyWeek5, pharmacyWeek6],
};

export const TRACKS = [PHYSIO_TRACK, PHARMACY_TRACK];

// Default backwards compatibility (so everything doesn't immediately break before we update it)
export const COURSE_TITLE = PHYSIO_TRACK.title;
export const COURSE_SUBTITLE = PHYSIO_TRACK.subtitle;
export const CAPSTONE = PHYSIO_TRACK.capstone;
export const WEEKS: Week[] = PHYSIO_TRACK.weeks;

export interface VocabEntry {
  id: string;
  english: string;
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
    level: 1,
    title: "Student",
    min: 0,
  },
  {
    level: 2,
    title: "Clinical Novice",
    min: 100,
  },
  {
    level: 3,
    title: "Bedside Communicator",
    min: 250,
  },
  {
    level: 4,
    title: "Fluent Clinician",
    min: 450,
  },
  {
    level: 5,
    title: "Clinical Communicator",
    min: 700,
  },
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
