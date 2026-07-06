import { Week } from "../course";

export const week10: Week = {
  "id": "week-10",
  "number": 10,
  "title": "Demographics & History Taking",
  "timeAllocation": "2 hours Listening/Video, 2 hours Speaking Practice, 2 hours Assignment",
  "coreConcepts": [
    "Asking about age and weight",
    "Inquiring about allergies",
    "Checking pregnancy status"
  ],
  "focusAreas": [
    {
      "title": "Medical History Gathering",
      "description": "Formulating standard interrogatives to safely assess a patient's background."
    }
  ],
  "vocabTables": [
    {
      "caption": "Clinical Inquiries",
      "headers": [
        "English",
        "Arabic Script",
        "Transliteration"
      ],
      "rows": [
        [
          "How old are you?",
          "كم عمرك؟",
          "Kam omruka/omruki?"
        ],
        [
          "Do you have allergies?",
          "هل لديك حساسية؟",
          "Hal ladayka hasasiyah?"
        ],
        [
          "Are you pregnant?",
          "هل أنتِ حامل؟",
          "Hal anti hamil?"
        ],
        [
          "What are your symptoms?",
          "ما هي الأعراض؟",
          "Ma hiya al-a'raad?"
        ],
        [
          "Are you taking other medications?",
          "هل تأخذ أدوية أخرى؟",
          "Hal ta'khudh adwiyah ukhra?"
        ],
        [
          "Blood",
          "دم",
          "Dam"
        ],
        [
          "Skin",
          "جلد",
          "Jild"
        ],
        [
          "Heart",
          "قلب",
          "Qalb"
        ],
        [
          "Face",
          "وجه",
          "Wajh"
        ],
        [
          "Joint",
          "مفصل",
          "Mefsal"
        ],
        [
          "Brain",
          "دماغ",
          "Ademaagh"
        ],
        [
          "Youth",
          "شباب",
          "Shabaab"
        ],
        [
          "Old Age",
          "شيخوخة",
          "Shykhookhah"
        ],
        [
          "Infant",
          "رضيع",
          "Radee"
        ],
        [
          "Children",
          "أطفال",
          "Alatfaal"
        ]
      ]
    }
  ],
  "resources": [
    {
      "type": "video",
      "title": "Arabic Healthcare History Taking",
      "description": "Standard phrasing for medical history and patient background.",
      "url": "https://www.youtube.com/results?search_query=arabic+healthcare+history+taking"
    },
    {
      "type": "audio",
      "title": "Arabic Medical Dialogue Podcasts",
      "description": "Listening exercises for clinical questions.",
      "url": "https://www.youtube.com/results?search_query=arabic+medical+podcast+clinical"
    }
  ],
  "checkpoints": [
    {
      "id": "w2-c1",
      "label": "Mastered the syntactic structure of standard history-taking questions."
    },
    {
      "id": "w2-c2",
      "label": "Translated 10 patient intake forms from English to Arabic."
    }
  ],
  "scenario": {
    "patient": "A female patient approaches the pharmacy counter asking for an over-the-counter cough syrup for her young child.",
    "instructions": "Before dispensing, ask her the child’s exact age, whether the child has any known medication allergies, and if the child currently has a fever.",
    "answerKey": {
      "arabic": "كم عمر الطفل؟ هل لديه حساسية من أي دواء؟ وهل لديه حمى الآن؟",
      "transliteration": "Kam omru al-tifl? Hal ladayhi hasasiyah min ay dawaa'? Wa hal ladayhi humma al-aan?",
      "rationale": "Directly accesses clinical data using universally understood medical terminology (e.g., 'humma' for fever, 'hasasiyah' for allergy)."
    }
  }
};
