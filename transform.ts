import * as fs from 'fs';
import { WEEKS as oldWeeks, COURSE_TITLE, COURSE_SUBTITLE, LEVELS as oldLevels } from './src/data/course';

const newWeeks = oldWeeks.map(w => {
  // Group vocab into tables by category
  const categories = Array.from(new Set(w.vocab.map(v => v.category)));
  const vocabTables = categories.map(cat => ({
    caption: cat,
    headers: ["English", "Arabic Script", "Transliteration", "Context"],
    rows: w.vocab.filter(v => v.category === cat).map(v => [
      v.english, v.arabic, v.translit, v.context || ""
    ])
  }));

  return {
    id: `week-${w.id}`,
    number: w.id,
    title: w.title,
    timeAllocation: w.timeAllocation,
    coreConcepts: [w.subtitle],
    focusAreas: [
      {
        title: "Overview",
        description: w.overview
      }
    ],
    vocabTables,
    resources: w.resources.map(r => ({
      type: r.type,
      title: r.label,
      description: "",
      url: r.url
    })),
    checkpoints: w.checkpoints.map((c, idx) => ({
      id: `w${w.id}-c${idx + 1}`,
      label: c
    })),
    scenario: {
      patient: w.assignment.scenario,
      instructions: w.assignment.instructions,
      answerKey: {
        arabic: w.assignment.answerArabic,
        transliteration: w.assignment.answerTranslit,
        rationale: w.assignment.rationale
      }
    }
  };
});

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

export const WEEKS: Week[] = ${JSON.stringify(newWeeks, null, 2)};

export interface VocabEntry {
  id: string;
  arabic: string;
  transliteration: string;
  note?: string;
  nextReviewDate?: number;
  interval?: number;
}

export const LEVELS = ${JSON.stringify(oldLevels, null, 2)};

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
`;

fs.writeFileSync('./src/data/course.ts', newContent);
