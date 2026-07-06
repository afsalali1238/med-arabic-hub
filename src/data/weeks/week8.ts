import { Week } from "../course";

export const week8: Week = {
  "id": "week-8",
  "number": 8,
  "title": "Discharge, Home Care & Capstone",
  "timeAllocation": "1h Video/Audio Wrap-up · 2h Rehearsing Capstone · 3h Capstone Completion",
  "coreConcepts": [
    "Closing the therapeutic encounter warmly"
  ],
  "focusAreas": [
    {
      "title": "Overview",
      "description": "The final module culminates the clinical interaction: anticipatory guidance on post-treatment responses (DOMS), lifestyle modifications, a final teach-back comprehension check, and culturally warm farewells to close the encounter and secure follow-up."
    }
  ],
  "vocabTables": [
    {
      "caption": "Expectation Management",
      "headers": [
        "English",
        "Arabic Script",
        "Transliteration",
        "Context"
      ],
      "rows": [
        [
          "There will be a little pain tomorrow.",
          "بكرا، فيه شوي ألم بسيط.",
          "Bokra, fi shui alam baseeth.",
          "Pre-empts anxiety over Delayed Onset Muscle Soreness (DOMS)."
        ]
      ]
    },
    {
      "caption": "Reassurance",
      "headers": [
        "English",
        "Arabic Script",
        "Transliteration",
        "Context"
      ],
      "rows": [
        [
          "This is normal.",
          "هذا عادي.",
          "Haada aadi.",
          "Validates the soreness as a normal healing response."
        ]
      ]
    },
    {
      "caption": "Home Care",
      "headers": [
        "English",
        "Arabic Script",
        "Transliteration",
        "Context"
      ],
      "rows": [
        [
          "You must rest.",
          "لازم راحة.",
          "Laazim raaha.",
          "Prescribing relative rest for tissue recovery."
        ]
      ]
    },
    {
      "caption": "Comprehension Check",
      "headers": [
        "English",
        "Arabic Script",
        "Transliteration",
        "Context"
      ],
      "rows": [
        [
          "Do you understand?",
          "هل تفهم؟",
          "Hal tafham?",
          "Initiates the teach-back method to verify HEP compliance."
        ]
      ]
    },
    {
      "caption": "Cultural Farewell",
      "headers": [
        "English",
        "Arabic Script",
        "Transliteration",
        "Context"
      ],
      "rows": [
        [
          "May God heal you.",
          "الله يشفيك.",
          "Allah yashfeek.",
          "Standard religious/cultural well-wish across all dialects."
        ],
        [
          "Health is ahead of you.",
          "قدامك العافية.",
          "Guddaamak al-aafiyah.",
          "Highly localized Khaleeji idiom wishing a rapid recovery."
        ]
      ]
    }
  ],
  "resources": [
    {
      "type": "video",
      "title": "How to Comfort and Encourage in Levantine Arabic (Shababeek)",
      "description": "",
      "url": "https://shababeekcenter.com/podcast/how-to-comfort-and-encourage-in-levantine-arabic/"
    },
    {
      "type": "audio",
      "title": "Libyamedcast (broader Arabic medical discussions)",
      "description": "",
      "url": "https://libyamedcast.com/tag/arabic-podcast/"
    },
    {
      "type": "docs",
      "title": "Important Arabic words and phrases for healthcare professionals",
      "description": "",
      "url": "https://www.tareequljannah.com/blogs/arabic-vocabulary-for-healthcare-professionals/"
    }
  ],
  "checkpoints": [
    {
      "id": "w8-c1",
      "label": "Mastered 5 distinct cultural phrases for wishing a patient well or a speedy recovery."
    },
    {
      "id": "w8-c2",
      "label": "Role-played a complete discharge sequence checking for patient understanding."
    },
    {
      "id": "w8-c3",
      "label": "Capstone Project Uploaded & Approved."
    }
  ],
  "scenario": {
    "patient": "CAPSTONE — The initial evaluation is ending for an older post-op knee replacement patient. Manage expectations by informing them there will be a little pain tomorrow but that this is normal. Advise them they need rest at home, check they fully understand the exercise instructions, and warmly wish them a speedy recovery using local idioms as they leave.",
    "instructions": "Write the comprehensive, continuous closing dialogue in Arabic. Utilize culturally appropriate comforting phrases alongside the clinical advice to foster a strong therapeutic alliance. Provide both script and transliteration.",
    "answerKey": {
      "arabic": "بكرا، فيه شوي ألم بسيط، هذا عادي. لازم راحة في البيت. هل تفهم التمارين؟ سلامتك، قدامك العافية.",
      "transliteration": "Bokra, fi shui alam baseeth, haada aadi. Laazim raaha fi al-bait. Hal tafham al-thamareen? Salamtek, guddaamak al-aafiyah.",
      "rationale": "Warning with Bokra, fi shui alam baseeth prevents panic when DOMS occurs; haada aadi reduces catastrophization. Laazim raaha fi al-bait reinforces tissue healing. Hal tafham al-thamareen? triggers the teach-back method to verify compliance. Concluding with Salamtek and the localized Khaleeji idiom Guddaamak al-aafiyah leaves the patient feeling deeply cared for and culturally respected."
    }
  }
};
