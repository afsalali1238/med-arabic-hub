import { Week } from "../course";

export const week4: Week = {
  "id": "week-4",
  "number": 4,
  "title": "Objective Pain Assessment",
  "timeAllocation": "1.5h Video Observation · 2h Role-Play Simulation · 2.5h Assignment & Synthesis",
  "coreConcepts": [
    "Scale, aggravating, and easing factors"
  ],
  "focusAreas": [
    {
      "title": "Overview",
      "description": "Quantify symptomology and assess mechanical provocations. This week bridges subjective patient reporting and objective clinical measurement, establishing empirical baselines for future re-assessment."
    }
  ],
  "vocabTables": [
    {
      "caption": "Pain Scale (VAS)",
      "headers": [
        "English",
        "Arabic Script",
        "Transliteration",
        "Context"
      ],
      "rows": [
        [
          "Out of ten, how much is the pain?",
          "من عشرة، كم الألم؟",
          "Min a'shara, kem al-alam?",
          "Establishes the quantifiable baseline on the 0-10 scale."
        ]
      ]
    },
    {
      "caption": "Mechanical Provocation",
      "headers": [
        "English",
        "Arabic Script",
        "Transliteration",
        "Context"
      ],
      "rows": [
        [
          "Does it hurt when I do this?",
          "عندك ألم لما أسوي كذا؟",
          "Endek alam lemma asouvi qida?",
          "Concurrent verbal cuing during passive range of motion."
        ]
      ]
    },
    {
      "caption": "Palpation Provocation",
      "headers": [
        "English",
        "Arabic Script",
        "Transliteration",
        "Context"
      ],
      "rows": [
        [
          "Does it hurt when I press here?",
          "عندك ألم لما أضغط هنا؟",
          "Endek alam lemma ed'goth hina?",
          "Essential for identifying point tenderness and trigger points."
        ]
      ]
    },
    {
      "caption": "Red Flag Screening",
      "headers": [
        "English",
        "Arabic Script",
        "Transliteration",
        "Context"
      ],
      "rows": [
        [
          "Do you have night pain?",
          "عندك ألم في الليل؟",
          "Endek alam fi lel?",
          "Screening for systemic pathology or inflammatory states."
        ]
      ]
    },
    {
      "caption": "Symptom Spread",
      "headers": [
        "English",
        "Arabic Script",
        "Transliteration",
        "Context"
      ],
      "rows": [
        [
          "Only here, or everywhere?",
          "هنا بس، أو كل مكان؟",
          "Hina bas, aw kul makaan?",
          "Differentiating localized facet pain from radiating radiculopathy."
        ]
      ]
    }
  ],
  "resources": [
    {
      "type": "video",
      "title": "50 Essential Arabic Words for Nurses | Gulf Medical Vocabulary",
      "description": "",
      "url": "https://www.youtube.com/watch?v=iu1WNEQglQY"
    },
    {
      "type": "audio",
      "title": "Learn Arabic Podcast: Health / Medical Consultations",
      "description": "",
      "url": "https://www.youtube.com/watch?v=EE0TtA8UkC8"
    },
    {
      "type": "docs",
      "title": "Hospital Vocabulary in Arabic (Kalimah Center)",
      "description": "",
      "url": "https://kalimah-center.com/hospital-vocabulary-in-arabic/"
    }
  ],
  "checkpoints": [
    {
      "id": "w4-c1",
      "label": "Demonstrated auditory comprehension and verbal fluency of numbers 1-10 in the context of pain scaling."
    },
    {
      "id": "w4-c2",
      "label": "Formulated three distinct questions testing mechanical provocation during simulated palpation."
    },
    {
      "id": "w4-c3",
      "label": "Clinical Drill Completed."
    }
  ],
  "scenario": {
    "patient": "An adult patient with suspected lumbar radiculopathy (sciatica) is lying prone on the plinth. You need to press on their lower lumbar spine, ask if it hurts when you press there, ask if the pain stays in that spot or radiates everywhere, and finally ask them to rate the provoked pain out of ten.",
    "instructions": "Write the sequential string of assessment questions in Arabic as you physically perform the palpation test. Ensure the transition between location, radiation, and scaling is fluid. Provide both script and transliteration.",
    "answerKey": {
      "arabic": "عندك ألم لما أضغط هنا في ظهرك؟ هنا بس، أو كل مكان؟ من عشرة، كم الألم؟",
      "transliteration": "Endek alam lemma ed'goth hina fi daaharek? Hina bas, aw kul makaan? Min a'shara, kem al-alam?",
      "rationale": "Manual therapy requires concurrent verbal cues aligned with hand movements. Endek alam lemma ed'goth hina? is a direct query for objective testing, with fi daaharek focusing sensory attention on the back. Hina bas, aw kul makaan? efficiently identifies radiating nerve pain without complex neurological vocabulary. Min a'shara, kem al-alam? locks in the quantifiable data point immediately after provocation."
    }
  }
};
