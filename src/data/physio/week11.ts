import { Week } from "../course";

export const week11: Week = {
  id: "week-11",
  number: 11,
  title: "General Symptoms & Triage",
  timeAllocation: "2 hours Listening/Video, 2 hours Speaking Practice, 2 hours Assignment",
  coreConcepts: [
    "Anatomical vocabulary for isolating pain",
    "Symptom elicitation",
    "Pain scale assessment",
  ],
  focusAreas: [
    {
      title: "Triage and OTC Recommendations",
      description: "Identifying red-flag symptoms and recommending over-the-counter solutions.",
    },
  ],
  vocabTables: [
    {
      caption: "Anatomy and Symptoms",
      headers: ["English", "Arabic Script", "Transliteration"],
      rows: [
        ["Pain / Ache", "ألم", "Alam"],
        ["Cough", "سعال", "Su'aal"],
        ["Nausea", "غثيان", "Ghathayan"],
        ["Cold", "زكام / برد", "Zukaam / Bard"],
        ["Vomiting", "قيء", "Qaee'"],
        ["Headache", "صداع", "Sudaa'"],
        ["Burn", "حرق", "Harq"],
        ["Weakness", "ضعف", "Da'ff"],
        ["Irritation / Allergy", "حساسية", "Hasaasyeah"],
        ["Infection", "التهاب", "Iltihaab"],
        ["Fever", "حمى", "Hummaa"],
        ["Influenza", "أنفلونزا", "Enflunzaa"],
        ["Sore Throat", "ألم في الحلق", "Alam fi al-halq"],
      ],
    },
  ],
  resources: [
    {
      type: "video",
      title: "Arabic Medical Symptom Vocabulary",
      description: "Visual identification of symptoms and body parts.",
      url: "https://www.youtube.com/results?search_query=arabic+medical+symptom+vocabulary",
    },
  ],
  checkpoints: [
    {
      id: "w5-c1",
      label: "Mastered 20 anatomical terms and 15 symptom descriptors.",
    },
    {
      id: "w5-c2",
      label: "Roleplayed an OTC triage decision tree.",
    },
  ],
  scenario: {
    patient:
      "A 25-year-old female patient complains of severe stomach cramps and diarrhea that started yesterday.",
    instructions:
      "Verify if she has a fever, recommend an oral rehydration salt alongside an antidiarrheal, and advise her to see a doctor if symptoms persist past 48 hours.",
    answerKey: {
      arabic:
        "هل لديك حمى أو غثيان؟ سأعطيك دواء للإسهال ومحلول جفاف لتعويض السوائل. إذا استمر المغص أكثر من يومين، يجب مراجعة الطبيب.",
      transliteration:
        "Hal ladayki humma aw ghathayan? Sa-u'tiki dawaa' li-l-ishaal wa mahloul jafaf li-ta'weed al-sawa'il. Idha istamarra al-maghas akthar min yawmayn, yajibu muraja'at al-tabeeb.",
      rationale:
        "Translates precise clinical actions (replacing fluids, medical referral) into standard Arabic suitable for safe OTC triage.",
    },
  },
};
