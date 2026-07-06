import { Week } from "../course";

export const week2: Week = {
  "id": "week-2",
  "number": 2,
  "title": "Musculoskeletal Anatomy & Chief Complaint",
  "timeAllocation": "2h Video/Visual Anatomy Mapping · 2h Pronunciation Practice · 2h Assignment & Quiz",
  "coreConcepts": [
    "From academic anatomy to the words patients actually use"
  ],
  "focusAreas": [
    {
      "title": "Overview",
      "description": "Effective PT requires precision in anatomical landmarks and mechanisms of injury. Patients communicate symptoms with highly localized, colloquial vocabulary — this module transitions from university anatomy to the terms used on the treatment plinth."
    }
  ],
  "vocabTables": [
    {
      "caption": "Axial Skeleton",
      "headers": [
        "English",
        "Arabic Script",
        "Transliteration",
        "Context"
      ],
      "rows": [
        [
          "Back / Neck / Chest",
          "ظهر / رقبة / صدر",
          "Daahar / Raqaba / Sadar",
          "Primary regions for postural pain and radiculopathy."
        ]
      ]
    },
    {
      "caption": "Appendicular",
      "headers": [
        "English",
        "Arabic Script",
        "Transliteration",
        "Context"
      ],
      "rows": [
        [
          "Shoulder / Knee",
          "كتف / ركبة",
          "Kethif / Rukba",
          "Most frequently assessed joints in outpatient PT."
        ],
        [
          "Elbow / Wrist",
          "كوع / معصم",
          "Koo' / Mi'sam",
          "Common sites for tendinopathies (e.g., tennis elbow)."
        ]
      ]
    },
    {
      "caption": "Soft Tissue",
      "headers": [
        "English",
        "Arabic Script",
        "Transliteration",
        "Context"
      ],
      "rows": [
        [
          "Muscle / Joint",
          "عضلة / مفصل",
          "Adaala / Mifsal",
          "Differentiating contractile vs. inert tissue pain."
        ],
        [
          "Ligament / Cartilage",
          "رباط / غضروف",
          "Ribaath / Gadroof",
          "Ribaath Saleebi is specifically used for the ACL."
        ]
      ]
    },
    {
      "caption": "Mechanism",
      "headers": [
        "English",
        "Arabic Script",
        "Transliteration",
        "Context"
      ],
      "rows": [
        [
          "Fall / Injury",
          "وقعت / إصابة",
          "Wokkaath / Asaaba",
          "Used in historical questioning: Hal wokkaath? (Did you fall?)."
        ],
        [
          "Heavy Lifting",
          "رفع شيء ثقيل",
          "Irffaath shay thakayil",
          "Assessing occupational or gym-related lifting mechanisms."
        ]
      ]
    }
  ],
  "resources": [
    {
      "type": "video",
      "title": "Anatomy of Lower Limb in Arabic (Dr. Wahdan 2)",
      "description": "",
      "url": "https://www.youtube.com/watch?v=5C1VGilMeMg"
    },
    {
      "type": "audio",
      "title": "Arabic Medical Terminology pronunciation exercises",
      "description": "",
      "url": "https://earabiclearning.com/blog/2021/12/medical-terms-in-arabic/"
    },
    {
      "type": "docs",
      "title": "Physical Therapy & Musculoskeletal Glossary (Scribd)",
      "description": "",
      "url": "https://www.scribd.com/document/898034740/Eng-Arabic-221116-104551"
    }
  ],
  "checkpoints": [
    {
      "id": "w2-c1",
      "label": "Identified 20 major anatomical structures on an interactive body map using dialectal audio cues."
    },
    {
      "id": "w2-c2",
      "label": "Differentiated soft tissue vocabulary: matched Ribaath with ligament and Gadroof with cartilage/meniscus."
    },
    {
      "id": "w2-c3",
      "label": "Clinical Drill Completed."
    }
  ],
  "scenario": {
    "patient": "A young Levantine male athlete presents following a traumatic football injury. Establish the mechanism of injury: ask if he fell, if he heard a 'click' or 'pop' in his knee, then explain the issue might involve his meniscus (cartilage) or ACL.",
    "instructions": "Formulate the clinical questions and explanation in conversational Levantine/Gulf blended Arabic. Use the correct colloquial anatomical terms for the knee, cartilage, and ligament. Provide the continuous dialogue in both Arabic script and transliteration.",
    "answerKey": {
      "arabic": "هل وقعت وإنت تلعب كرة قدم؟ هل سمعت صوت \"كليك\" في ركبتك؟ المشكلة ممكن تكون في الغضروف أو الرباط الصليبي.",
      "transliteration": "Hal wokkaath wa enta tilaab koorath qadam? Hal samath soth \"click\" fi rukbathek? Al-mushkila mumkin takoon fi al-gadroof aw al-ribaath al-saleebi.",
      "rationale": "Hal wokkaath investigates the biomechanical force of the injury. English medical onomatopoeia (like 'click') is heavily used as a loanword by Arab clinicians and patients — using it demonstrates fluency, whereas literal translation would confuse. Gadroof (cartilage/meniscus) and Ribaath Saleebi (cruciate ligament/ACL) are the practical nouns adopted over complex MSA equivalents."
    }
  }
};
