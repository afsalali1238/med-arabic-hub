import { Week } from "../course";

export const week1: Week = {
  "id": "week-1",
  "number": 1,
  "title": "Clinical Greetings, Etiquette & Patient Intake",
  "timeAllocation": "1.5h Audio/Video · 2.5h Speaking & Phonetic Mimicry · 2h Interactive Scenarios",
  "coreConcepts": [
    "The first five minutes of the clinical encounter"
  ],
  "focusAreas": [
    {
      "title": "Overview",
      "description": "Establishes the sociolinguistic framework for the Dubai clinic. Transition from textbook greetings to authentic, region-specific demographic intake, navigating cultural respect paradigms to build immediate therapeutic alliance."
    }
  ],
  "vocabTables": [
    {
      "caption": "Greeting",
      "headers": [
        "English",
        "Arabic Script",
        "Transliteration",
        "Context"
      ],
      "rows": [
        [
          "Hello / Welcome",
          "مرحباً / أهلاً وسهلاً",
          "Marhaban / Ahlan wa sahlan",
          "Universal greeting; Ahlan is highly common in the Levant."
        ]
      ]
    },
    {
      "caption": "Inquiry",
      "headers": [
        "English",
        "Arabic Script",
        "Transliteration",
        "Context"
      ],
      "rows": [
        [
          "How are you?",
          "كيف حالك؟ / شلونك؟",
          "Keef halak? / Shlonak?",
          "Shlonak (m) / Shlonik (f) is standard Khaleeji phrasing."
        ]
      ]
    },
    {
      "caption": "Respect Marker",
      "headers": [
        "English",
        "Arabic Script",
        "Transliteration",
        "Context"
      ],
      "rows": [
        [
          "Older Male Patient",
          "حجي / عمي",
          "Hajji / Ami",
          "Mandatory for older Gulf patients; establishes rapport."
        ],
        [
          "Older Female Patient",
          "حجة / خالتي",
          "Hajja / Khalti",
          "Conveys familial respect, lowering patient anxiety."
        ]
      ]
    },
    {
      "caption": "Demographic",
      "headers": [
        "English",
        "Arabic Script",
        "Transliteration",
        "Context"
      ],
      "rows": [
        [
          "What is your name?",
          "إيش اسمك؟",
          "Esh ismek?",
          "Esh is the colloquial interrogative for 'What'."
        ],
        [
          "How old are you?",
          "كم عمرك؟",
          "Kem umrek?",
          "Vital for establishing age-related pathologies."
        ],
        [
          "What is your occupation?",
          "إيش وظيفتك؟",
          "Esh wadeefathek?",
          "Essential for ergonomic and postural assessments."
        ],
        [
          "Where do you work/live?",
          "وين تشتغل؟ / وين تسكن؟",
          "Vain thashthaagal? / Vain thaskoon?",
          "Vain is the colloquial equivalent to MSA Ayna (Where)."
        ]
      ]
    }
  ],
  "resources": [
    {
      "type": "video",
      "title": "Emirati Arabic Live Lesson for Medical Professionals (AlRamsa)",
      "description": "",
      "url": "https://www.youtube.com/watch?v=sFOJI2bHIHI"
    },
    {
      "type": "audio",
      "title": "Simple & Easy Arabic Podcast (Beginner Greetings)",
      "description": "",
      "url": "https://preply.com/en/blog/arabic-podcasts/"
    },
    {
      "type": "docs",
      "title": "Basic Arabic Medical Vocabulary for Healthcare Professionals",
      "description": "",
      "url": "https://www.tareequljannah.com/blogs/arabic-vocabulary-for-healthcare-professionals/"
    }
  ],
  "checkpoints": [
    {
      "id": "w1-c1",
      "label": "Mastered 25-card demographic & cultural respect flashcard deck."
    },
    {
      "id": "w1-c2",
      "label": "Recorded voice submission of the standard intake sequence with correct Khaleeji intonation."
    },
    {
      "id": "w1-c3",
      "label": "Clinical Drill Completed."
    }
  ],
  "scenario": {
    "patient": "An older male Emirati patient enters the clinic for his initial consultation regarding bilateral knee osteoarthritis. Welcome him respectfully, invite him to sit down, ask for his name, inquire about his age, and ask about his current occupation to understand his daily physical load.",
    "instructions": "Draft the exact conversational Arabic response to welcome this patient and conduct the demographic intake, using appropriate Khaleeji dialect markers and cultural respect titles. Provide the dialogue in both Arabic script and transliteration.",
    "answerKey": {
      "arabic": "أهلاً وسهلاً حجي، كيف حالك اليوم؟ تفضل، استريح هنا. إيش اسمك لو سمحت؟ كم عمرك؟ وإيش وظيفتك؟",
      "transliteration": "Ahlan wa sahlan Hajji, keef halak al-youm? Tafaddal, istareeh hina. Esh ismek law samaht? Kem umrek? Wa esh wadeefathek?",
      "rationale": "Addressing the older patient as Hajji (a term of high respect for elders in the Gulf and Levant) instantly bypasses the sterility of a standard medical encounter. Keef halak al-youm? is the empathetic opener. Tafaddal, istareeh hina softens the clinical environment. Using Esh instead of MSA Ma, and Kem for 'how much', mirrors natural Dubai speech. Adding law samaht (if you please) makes the intake feel like a conversation rather than an interrogation."
    }
  }
};
