import { Week } from "../course";

export const week3: Week = {
  "id": "week-3",
  "number": 3,
  "title": "Subjective Pain Assessment",
  "timeAllocation": "2h Patient Narrative Audio · 1.5h Vocabulary Drilling · 2.5h Assignment",
  "coreConcepts": [
    "Location, type, and chronology"
  ],
  "focusAreas": [
    {
      "title": "Overview",
      "description": "Pain is a multidimensional experience. Arab patients use a rich tapestry of adjectives and temporal markers. Map location, define chronological onset, and categorize severity using standard descriptive terminology."
    }
  ],
  "vocabTables": [
    {
      "caption": "Localization",
      "headers": [
        "English",
        "Arabic Script",
        "Transliteration",
        "Context"
      ],
      "rows": [
        [
          "Where is the pain?",
          "وين الألم؟ / وين الوجع؟",
          "Vain al-alam? / Vain al-waja'?",
          "Alam is widely understood; Waja' is specifically Levantine."
        ],
        [
          "Do you have pain here?",
          "عندك ألم هنا؟",
          "Endek alam hina?",
          "Used when palpating or pointing to a specific dermatome."
        ]
      ]
    },
    {
      "caption": "Chronology",
      "headers": [
        "English",
        "Arabic Script",
        "Transliteration",
        "Context"
      ],
      "rows": [
        [
          "Since when?",
          "من متى عندك الألم؟",
          "Min meta endek al-alam?",
          "Determines acute vs. sub-acute vs. chronic staging."
        ]
      ]
    },
    {
      "caption": "Frequency",
      "headers": [
        "English",
        "Arabic Script",
        "Transliteration",
        "Context"
      ],
      "rows": [
        [
          "Always vs. Sometimes",
          "دائماً / أحياناً",
          "Dayiman / Ahiyaanan",
          "Differentiates constant chemical from intermittent mechanical pain."
        ]
      ]
    },
    {
      "caption": "Severity",
      "headers": [
        "English",
        "Arabic Script",
        "Transliteration",
        "Context"
      ],
      "rows": [
        [
          "Severe / Moderate / Mild",
          "شديد / متوسط / خفيف",
          "Shadeed / Mutawassit / Khafif",
          "Qualitative triage markers prior to quantitative VAS scaling."
        ]
      ]
    },
    {
      "caption": "Expression",
      "headers": [
        "English",
        "Arabic Script",
        "Transliteration",
        "Context"
      ],
      "rows": [
        [
          "My back hurts",
          "ظهري يؤلمني",
          "Zahri yuʾulimuni / Zahri beewaja'ni",
          "Recognizing active verbal expressions of pain."
        ]
      ]
    }
  ],
  "resources": [
    {
      "type": "video",
      "title": "Medical Vocabulary in Levantine Arabic (Shami Speaker)",
      "description": "",
      "url": "https://www.youtube.com/watch?v=vQNyqvy3iDQ"
    },
    {
      "type": "audio",
      "title": "Gulf News Podcasts — MS Talks / Mind Your Migraine",
      "description": "",
      "url": "https://podcasts.apple.com/au/channel/gulf-news-podcasts/id6442719122"
    },
    {
      "type": "docs",
      "title": "Common Health Problems & Pain Descriptors",
      "description": "",
      "url": "https://www.arabicpod101.com/arabic-vocabulary-lists/common-health-problems"
    }
  ],
  "checkpoints": [
    {
      "id": "w3-c1",
      "label": "Mastered translation and auditory recognition of 15 pain-related adjectives and frequency adverbs."
    },
    {
      "id": "w3-c2",
      "label": "Matched pain locations and severity descriptors to native-speaker audio clips."
    },
    {
      "id": "w3-c3",
      "label": "Clinical Drill Completed."
    }
  ],
  "scenario": {
    "patient": "A female patient with chronic cervical spine issues presents for a follow-up. Conduct the subjective review: ask exactly where the pain is located in her neck, since when she has experienced this exacerbation, and whether the pain is severe or mild.",
    "instructions": "Draft the exact questions required to extract this subjective pain history in conversational Arabic. Use clear, empathetic language that guides the patient to specific answers. Provide both Arabic script and transliteration.",
    "answerKey": {
      "arabic": "وين الألم في رقبتك؟ من متى عندك هذا الألم؟ هل الألم شديد أو بسيط؟",
      "transliteration": "Vain al-alam fi raqabathek? Min meta endek haada al-alam? Hal al-alam shadeed aw baseeth?",
      "rationale": "Vain al-alam fi raqabathek? localizes the query to the cervical spine (Raqaba), forcing the patient to point to the exact segment. Min meta endek haada al-alam? is standardized Gulf phrasing for defining the chronological window. Offering a binary qualitative choice (shadeed aw baseeth) aids rapid triage — prompting with specific adjectives yields faster, more accurate documentation."
    }
  }
};
