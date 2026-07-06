import { Week } from "../course";

export const week7: Week = {
  id: "week-7",
  number: 7,
  title: "Home Exercise Program (HEP)",
  timeAllocation: "1.5h Concept Review · 2.5h Translating Exercise Protocols · 2h Assignment",
  coreConcepts: ["Prescribing sets, reps & driving compliance"],
  focusAreas: [
    {
      title: "Overview",
      description:
        "Clinical efficacy relies on compliance outside the clinic. This module covers explaining protocols, prescribing exact sets and reps, describing resistance equipment, and detailing the physiological rationale to ensure profound patient buy-in.",
    },
  ],
  vocabTables: [
    {
      caption: "Dosage (Reps)",
      headers: ["English", "Arabic Script", "Transliteration", "Context"],
      rows: [
        [
          "Do it 10 times",
          "سوي عشرة مرات",
          "Souvi ashra maarath",
          "Maarath (times) is the standard plural modifier for repetitions.",
        ],
      ],
    },
    {
      caption: "Dosage (Sets)",
      headers: ["English", "Arabic Script", "Transliteration", "Context"],
      rows: [
        [
          "Repeat again",
          "كرر مرة ثانية",
          "Ker'r maara thania",
          "Instructing the patient to perform subsequent sets.",
        ],
      ],
    },
    {
      caption: "Intensity Modifier",
      headers: ["English", "Arabic Script", "Transliteration", "Context"],
      rows: [
        [
          "Simple / Light exercise",
          "تمرين بسيط / خفيف",
          "Thamreen baseeth / hafeef",
          "Used to reduce patient fear-avoidance behavior.",
        ],
        ["Heavy", "ثقيل", "Thakayil", "Used when prescribing weighted resistance training."],
      ],
    },
    {
      caption: "Physiological Rationale",
      headers: ["English", "Arabic Script", "Transliteration", "Context"],
      rows: [
        [
          "Your muscles are weak, you must strengthen them.",
          "عضلاتك ضعيف، لازم تقوية.",
          "Adaalathek d'ayif, laazim thak'viath.",
          "Establishes medical necessity to drive compliance.",
        ],
      ],
    },
    {
      caption: "Daily Frequency",
      headers: ["English", "Arabic Script", "Transliteration", "Context"],
      rows: [
        [
          "Twice a day",
          "مرتين في اليوم",
          "Marratayn fii l-yawm",
          "Prescribing the frequency of the HEP.",
        ],
      ],
    },
  ],
  resources: [
    {
      type: "video",
      title: "65 Must-Know Arabic Words/Phrases for Healthcare",
      description: "",
      url: "https://www.scribd.com/document/467153936/65-Must-Know-Arabic-Words-Phrases-for-Anyone-Working-in-Healthcare",
    },
    {
      type: "audio",
      title: "Health on Track Podcast (Gulf wellness vernacular)",
      description: "",
      url: "https://www.giggulf.ae/en/personal/products/health-insurance/health-on-track-podcast",
    },
    {
      type: "docs",
      title: "Common Terms Used While Evaluation & Treatment",
      description: "",
      url: "https://www.scribd.com/document/898034740/Eng-Arabic-221116-104551",
    },
  ],
  checkpoints: [
    {
      id: "w7-c1",
      label:
        "Accurately translated a standard '3 sets of 10 reps, twice a day' protocol into colloquial Arabic.",
    },
    {
      id: "w7-c2",
      label: "Formulated a basic physiological explanation for targeted muscle strengthening.",
    },
    {
      id: "w7-c3",
      label: "Clinical Drill Completed.",
    },
  ],
  scenario: {
    patient:
      "A patient with subacromial shoulder impingement needs to begin an active rotator cuff strengthening program. First explain the rationale — that their shoulder muscles are weak and require strengthening. Then instruct the patient to perform a specific light resistance band exercise 10 times, and to repeat that set again.",
    instructions:
      "Write the educational rationale and the exact exercise prescription in conversational Arabic. Ensure the tone is educational and encouraging, driving patient compliance. Provide both script and transliteration.",
    answerKey: {
      arabic: "عضلات كتفك ضعيف، لازم تقوية. هذا تمرين بسيط. سوي عشرة مرات، وكرر مرة ثانية.",
      transliteration:
        "Adaalat kethifek d'ayif, laazim thak'viath. Haada thamreen baseeth. Souvi ashra maarath, wa ker'r maara thania.",
      rationale:
        "Beginning with the pathology — Adaalat kethifek d'ayif — establishes clear medical necessity, and laazim thak'viath provides the biomechanical solution. Categorizing the movement as a thamreen baseeth (light exercise) reduces anxiety and fear-avoidance. Souvi ashra maarath and ker'r deliver the exact dosimetric parameters required for an effective HEP.",
    },
  },
};
