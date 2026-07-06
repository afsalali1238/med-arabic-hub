import { Week } from "../course";

export const week5: Week = {
  "id": "week-5",
  "number": 5,
  "title": "Directional Movement Commands",
  "timeAllocation": "2.5h Grammar & Imperative Conjugation · 1.5h Active Listening · 2h Assignment",
  "coreConcepts": [
    "Upper quarter assessment & gender-specific imperatives"
  ],
  "focusAreas": [
    {
      "title": "Overview",
      "description": "PT relies on imperative verbs to guide AROM, PROM, and MMT safely. This module focuses on the upper extremities and the critical grammatical rules of gender-specific command conjugations — the masculine base modified with an '-i' suffix for female patients."
    }
  ],
  "vocabTables": [
    {
      "caption": "Resistance",
      "headers": [
        "English",
        "Arabic Script",
        "Transliteration",
        "Context"
      ],
      "rows": [
        [
          "Push / Pull",
          "ادفع / اسحب — ادفعي / اسحبي",
          "Idfa / Idfai · Ishaab / Ishaabi",
          "Push / Pull against the therapist during MMT."
        ]
      ]
    },
    {
      "caption": "Elevation",
      "headers": [
        "English",
        "Arabic Script",
        "Transliteration",
        "Context"
      ],
      "rows": [
        [
          "Lift",
          "ارفع — ارفعي",
          "Irfa / Irfai",
          "Lift (e.g., lift your arm/shoulder)."
        ]
      ]
    },
    {
      "caption": "Positional",
      "headers": [
        "English",
        "Arabic Script",
        "Transliteration",
        "Context"
      ],
      "rows": [
        [
          "Turn / Look at me",
          "لف / شوفني — لفي / شوفيني",
          "Lif / Lifi · Shoof ni / Shoofi ni",
          "Used for visual redirection."
        ]
      ]
    },
    {
      "caption": "Stabilization",
      "headers": [
        "English",
        "Arabic Script",
        "Transliteration",
        "Context"
      ],
      "rows": [
        [
          "Keep there / Hold this position",
          "خليك هناك — خليكي هناك",
          "Halli hinaak / Halliki hinaak",
          "Essential for testing joint stability."
        ]
      ]
    },
    {
      "caption": "Mimicry",
      "headers": [
        "English",
        "Arabic Script",
        "Transliteration",
        "Context"
      ],
      "rows": [
        [
          "Do exactly like this",
          "سوي نفس هذا",
          "Souvi nafs haada",
          "Utilized for visual demonstration of complex biomechanics."
        ]
      ]
    },
    {
      "caption": "Effort Modifier",
      "headers": [
        "English",
        "Arabic Script",
        "Transliteration",
        "Context"
      ],
      "rows": [
        [
          "Use more force",
          "زيادة قوة",
          "Zyaada koova",
          "Ensuring maximum voluntary contraction during testing."
        ]
      ]
    }
  ],
  "resources": [
    {
      "type": "video",
      "title": "Lesson 8: Verbs in Emirati Dialect (AlRamsa Institute)",
      "description": "",
      "url": "https://www.youtube.com/watch?v=3G-poc6bZyg"
    },
    {
      "type": "audio",
      "title": "Talk In Arabic (Levantine/Gulf imperatives)",
      "description": "",
      "url": "https://talkinarabic.com/"
    },
    {
      "type": "docs",
      "title": "Physical Therapy Vocabulary Guide (Commands Section)",
      "description": "",
      "url": "https://www.scribd.com/document/898034740/Eng-Arabic-221116-104551"
    }
  ],
  "checkpoints": [
    {
      "id": "w5-c1",
      "label": "Conjugated 15 core movement verbs into accurate polite imperative forms for both masculine and feminine cases."
    },
    {
      "id": "w5-c2",
      "label": "Constructed 10 functional sentences combining an imperative verb with a specific anatomical structure."
    },
    {
      "id": "w5-c3",
      "label": "Clinical Drill Completed."
    }
  ],
  "scenario": {
    "patient": "During manual muscle testing for shoulder flexion and abduction, you need to instruct a female patient to: look at you, do exactly like this (demonstrating), lift her arm, and push against your hand using more force to test peak strength.",
    "instructions": "Write the string of movement commands in Arabic, ensuring strict adherence to the gender-appropriate conjugations for a female patient. Structure the phrasing to be authoritative yet clinically appropriate. Provide both script and transliteration.",
    "answerKey": {
      "arabic": "شوفيني، سوي نفس هذا. ارفعي يدك، ادفعي يدي، استخدمي زيادة قوة.",
      "transliteration": "Shoofi ni, souvi nafs haada. Irfai yadek, idfai yadi, isthek'demi zyaada koova.",
      "rationale": "Because the patient is female, imperative verbs take the feminine '-i' suffix: Shoof becomes Shoofi ni, Irfa becomes Irfai, Idfa becomes Idfai. Isthek'demi zyaada koova elicits maximum effort during MMT, ensuring an accurate muscle grade. The visual mimicry cue Souvi nafs haada prevents misinterpretation of complex multi-planar shoulder movements."
    }
  }
};
