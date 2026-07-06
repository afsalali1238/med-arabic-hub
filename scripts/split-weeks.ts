import fs from "fs";
import path from "path";

const COURSE_FILE = path.join(process.cwd(), "src/data/course.ts");
const WEEKS_DIR = path.join(process.cwd(), "src/data/weeks");

async function splitWeeks() {
  if (!fs.existsSync(WEEKS_DIR)) {
    fs.mkdirSync(WEEKS_DIR, { recursive: true });
  }

  // Use ts-node/tsx to import the current data
  const {
    WEEKS,
    COURSE_TITLE,
    COURSE_SUBTITLE,
    CAPSTONE,
    LEVELS,
    XP_PER_QUIZ,
    XP_PER_FLASHCARD,
    XP_PER_WEEK,
  } = await import("../src/data/course");

  const imports = [];
  const weekNames = [];

  for (const week of WEEKS) {
    const varName = `week${week.number}`;
    const filename = `week${week.number}.ts`;
    const filepath = path.join(WEEKS_DIR, filename);

    const content = `import { Week } from "../course";

export const ${varName}: Week = ${JSON.stringify(week, null, 2)};
`;
    fs.writeFileSync(filepath, content);
    console.log("Created", filename);

    imports.push(`import { ${varName} } from "./weeks/week${week.number}";`);
    weekNames.push(varName);
  }

  // Now rewrite course.ts to use these imports
  const newCourseTs = `export type ResourceType = "video" | "audio" | "article" | "docs";

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

${imports.join("\n")}

export const COURSE_TITLE = ${JSON.stringify(COURSE_TITLE)};
export const COURSE_SUBTITLE = ${JSON.stringify(COURSE_SUBTITLE)};

export const CAPSTONE = ${JSON.stringify(CAPSTONE, null, 2)};

export const WEEKS: Week[] = [
  ${weekNames.join(",\n  ")}
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

  fs.writeFileSync(COURSE_FILE, newCourseTs);
  console.log("course.ts has been updated successfully.");
}

splitWeeks().catch(console.error);
