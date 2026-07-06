import { Week } from "../course";

export const week4: Week = {
  id: "pharmacy-week-4",
  number: 4,
  title: "Medication Delivery: Routes of Administration",
  timeAllocation: "45-60 minutes",
  coreConcepts: ["Administration routes", "Injection types"],
  focusAreas: [{ title: "Delivery", description: "How medication enters the body." }],
  vocabTables: [
    {
      caption: "Routes of Administration",
      headers: ["English", "Arabic", "Transliteration"],
      rows: [
        ["Orally", "بالفم", "Bil-fam"],
        ["Sublingual", "تحت اللسان", "Taht allesaan"],
        ["Rectally", "شرجي", "Shargee"],
        ["Vaginally", "مهبلي", "Mehbalee"],
        ["Intramuscular Injection", "حقنة بالعضل", "Huqnah bel 'adal"],
        ["Intravenous", "حقنة بالوريد", "Huqnah bel wareed"],
        ["Intradermal Injection", "حقنة في الأدمة", "Huqnah fi al-adamah"],
        ["Subcutaneous Injection", "حقنة تحت الجلد", "Huqnah taht al-geld"],
        ["Inhalation", "استنشاق", "Estenshaaq"],
        ["Drops Topically", "نقط موضعية", "Nuqat mawde'yyah"],
      ],
    },
  ],
  resources: [],
  checkpoints: [{ id: "pharmacy-wk4-cp1", label: "Routes Quiz" }],
  scenario: {
    patient: "You must give the medication by mouth.",
    instructions: "Translate: 'Orally'",
    answerKey: { arabic: "بالفم", transliteration: "Bil-fam", rationale: "Oral administration." },
  },
};
