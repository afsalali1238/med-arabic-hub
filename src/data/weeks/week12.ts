import { Week } from "../course";

export const week12: Week = {
  "id": "week-12",
  "number": 12,
  "title": "Empathy & Patient De-escalation",
  "timeAllocation": "2 hours Listening/Video, 2 hours Speaking Practice, 2 hours Assignment",
  "coreConcepts": [
    "De-escalation vocabulary",
    "Explaining insurance denials or requirements",
    "Offering generic clinical alternatives"
  ],
  "focusAreas": [
    {
      "title": "Conflict Resolution",
      "description": "Managing emotional distress and administrative friction at the pharmacy counter."
    }
  ],
  "vocabTables": [
    {
      "caption": "Administrative and Empathy Phrases",
      "headers": [
        "English",
        "Arabic Script",
        "Transliteration"
      ],
      "rows": [
        [
          "Please calm down",
          "أرجو الهدوء",
          "Arju al-hudoo'"
        ],
        [
          "I understand your situation",
          "أنا أتفهم وضعك",
          "Ana atafahham wad'ak"
        ],
        [
          "Pre-authorization",
          "موافقة مسبقة",
          "Muwafaqa musabbaqa"
        ],
        [
          "Claim Rejected",
          "مطالبة مرفوضة",
          "Mutalaba marfouda"
        ],
        [
          "Do not worry",
          "لا تقلق",
          "La taqlaq"
        ],
        [
          "I will contact the doctor",
          "سأتصل بالطبيب",
          "Sa-uttasil bi-l-tabeeb"
        ],
        [
          "As directed by physician",
          "حسب إرشادات الطبيب",
          "Hasab ershaadaat altabeeb"
        ],
        [
          "For external use",
          "للاستعمال الخارجي",
          "Lelestemaal alkhaarejy"
        ],
        [
          "Rub into the affected area",
          "ادهن المنطقة المصابة",
          "Edhan el manteqah almusaabah"
        ]
      ]
    }
  ],
  "resources": [
    {
      "type": "video",
      "title": "Arabic Medical Empathy and Communication",
      "description": "Phrases for calming patients and showing empathy in healthcare.",
      "url": "https://www.youtube.com/results?search_query=arabic+medical+empathy+and+communication"
    }
  ],
  "checkpoints": [
    {
      "id": "w8-c1",
      "label": "Mastered 10 key de-escalation phrases."
    },
    {
      "id": "w8-c2",
      "label": "Completed the Final Capstone Roleplay Submission."
    }
  ],
  "scenario": {
    "patient": "A mother is visibly frustrated because her child’s prescribed brand-name asthma inhaler is not covered by insurance.",
    "instructions": "De-escalate her frustration, validate her concern, and offer to contact the prescribing doctor to change the prescription to an approved generic alternative.",
    "answerKey": {
      "arabic": "أعتذر منك، أنا أقدر وضعك. للأسف التأمين رفض تغطية هذا البخاخ. لكن لا تقلقي، سأتصل بالطبيب الآن وأطلب منه كتابة بديل يغطيه التأمين.",
      "transliteration": "A'tadhir minki, ana uqaddir wad'aki. Li-l-asaf al-ta'meen rafada taghtiyat hadha al-bakhakh. Lakin la taqlaqi, sa-uttasil bi-l-tabeeb al-aan wa atlub minhu kitabat badeel yughatteehi al-ta'meen.",
      "rationale": "Replaces conflict with active problem-solving using standard empathetic markers and professional healthcare terms."
    }
  }
};
