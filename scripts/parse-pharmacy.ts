import fs from "fs";
import path from "path";

const markdownPath = "C:/Users/HP/Desktop/antigravity/Ara/Medical Pharmacy Terminology.md";
const outDir = "C:/Users/HP/Desktop/antigravity/physio/src/data/pharmacy";

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const markdown = fs.readFileSync(markdownPath, "utf-8");
const sections = markdown.split("## ").slice(1);

const WEEK_META: Record<
  number,
  {
    title: string;
    time: string;
    concepts: string[];
    focus: unknown[];
    checkpoints: unknown[];
    scenario: unknown;
  }
> = {
  1: {
    title: "Fundamentals: General Vocabulary & Anatomy",
    time: "45-60 minutes",
    concepts: ["Basic body parts", "General clinical terms"],
    focus: [{ title: "Anatomy", description: "Learn the primary organs and body parts." }],
    checkpoints: [{ id: "pharmacy-wk1-cp1", label: "General Vocabulary Quiz" }],
    scenario: {
      patient: "A patient complains of pain in their stomach.",
      instructions: "Translate: 'Pain in the stomach'",
      answerKey: {
        arabic: "ألم معدة",
        transliteration: "Alam ma'edah",
        rationale: "Basic anatomy terms.",
      },
    },
  },
  2: {
    title: "Clinical Assessment: Symptoms & Diseases",
    time: "45-60 minutes",
    concepts: ["Common symptoms", "Identifying diseases"],
    focus: [{ title: "Assessment", description: "Recognize common patient complaints." }],
    checkpoints: [{ id: "pharmacy-wk2-cp1", label: "Symptoms Quiz" }],
    scenario: {
      patient: "A patient has a high temperature.",
      instructions: "Translate: 'Fever'",
      answerKey: { arabic: "حمى", transliteration: "Hummaa", rationale: "Common symptom." },
    },
  },
  3: {
    title: "Pharmacology: Dosage Forms & Drug Classes",
    time: "45-60 minutes",
    concepts: ["Drug classes", "Formulations"],
    focus: [{ title: "Formulations", description: "Distinguish between tablets, syrups, etc." }],
    checkpoints: [{ id: "pharmacy-wk3-cp1", label: "Dosage Forms Quiz" }],
    scenario: {
      patient: "Patient needs a painkiller pill.",
      instructions: "Translate: 'Tablet'",
      answerKey: { arabic: "حبوب", transliteration: "Huboob", rationale: "Tablet formulation." },
    },
  },
  4: {
    title: "Medication Delivery: Routes of Administration",
    time: "45-60 minutes",
    concepts: ["Administration routes", "Injection types"],
    focus: [{ title: "Delivery", description: "How medication enters the body." }],
    checkpoints: [{ id: "pharmacy-wk4-cp1", label: "Routes Quiz" }],
    scenario: {
      patient: "You must give the medication by mouth.",
      instructions: "Translate: 'Orally'",
      answerKey: { arabic: "بالفم", transliteration: "Bil-fam", rationale: "Oral administration." },
    },
  },
  5: {
    title: "Scheduling: Dosage, Frequency & Timings",
    time: "45-60 minutes",
    concepts: ["Frequency", "Timing of doses"],
    focus: [{ title: "Timing", description: "When to take the medication." }],
    checkpoints: [{ id: "pharmacy-wk5-cp1", label: "Timing Quiz" }],
    scenario: {
      patient: "Instruct the patient to take the pill twice daily.",
      instructions: "Translate: 'Twice daily'",
      answerKey: {
        arabic: "مرتين في اليوم",
        transliteration: "Marratayn fee alyoom",
        rationale: "Frequency instructions.",
      },
    },
  },
  6: {
    title: "Patient Education: Common Medical Instructions",
    time: "45-60 minutes",
    concepts: ["Patient warnings", "Usage instructions"],
    focus: [{ title: "Education", description: "Safety and usage guidelines." }],
    checkpoints: [{ id: "pharmacy-wk6-cp1", label: "Instructions Quiz" }],
    scenario: {
      patient: "The bottle must be shaken.",
      instructions: "Translate: 'Shake the bottle before use'",
      answerKey: {
        arabic: "رج الزجاجة قبل الاستعمال",
        transliteration: "Ruj alzujaajah qabel alest'maal",
        rationale: "Preparation instruction.",
      },
    },
  },
};

sections.forEach((section, idx) => {
  const weekNum = idx + 1;
  const lines = section.split("\n");
  const sectionTitle = lines[0].replace(/^\d+\.\s*/, "").trim();

  const headers: string[] = ["English", "Arabic", "Transliteration"];
  const rows: string[][] = [];

  lines.forEach((line) => {
    if (line.startsWith("|") && !line.includes("---") && !line.includes("English Term")) {
      const parts = line
        .split("|")
        .map((p) => p.trim())
        .filter(Boolean);
      if (parts.length === 3) {
        rows.push([parts[0], parts[1], parts[2]]);
      }
    }
  });

  const meta = WEEK_META[weekNum];

  const code = `import { Week } from "../course";

export const week${weekNum}: Week = {
  id: "pharmacy-week-${weekNum}",
  number: ${weekNum},
  title: ${JSON.stringify(meta.title)},
  timeAllocation: ${JSON.stringify(meta.time)},
  coreConcepts: ${JSON.stringify(meta.concepts)},
  focusAreas: ${JSON.stringify(meta.focus)},
  vocabTables: [
    {
      caption: ${JSON.stringify(sectionTitle)},
      headers: ${JSON.stringify(headers)},
      rows: ${JSON.stringify(rows)}
    }
  ],
  resources: [],
  checkpoints: ${JSON.stringify(meta.checkpoints)},
  scenario: ${JSON.stringify(meta.scenario)}
};
`;

  fs.writeFileSync(path.join(outDir, "week" + weekNum + ".ts"), code);
  console.log("Generated pharmacy week " + weekNum);
});
