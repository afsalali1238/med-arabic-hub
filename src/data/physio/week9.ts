import { Week } from "../course";

export const week9: Week = {
  id: "week-9",
  number: 9,
  title: "Clinical Administration Basics",
  timeAllocation: "2 hours Listening/Video, 2 hours Speaking Practice, 2 hours Assignment",
  coreConcepts: [
    "Professional clinical greetings",
    "Administrative intake and data collection",
    "Navigating patients within the pharmacy",
  ],
  focusAreas: [
    {
      title: "Patient Intake",
      description: "Requesting identification, insurance, and medical prescriptions politely.",
    },
  ],
  vocabTables: [
    {
      caption: "Administrative Vocabulary",
      headers: ["English", "Arabic Script", "Transliteration"],
      rows: [
        ["How are you?", "كيف حالك؟", "Kayfa haluka?"],
        ["How can I help you?", "كيف أقدر أساعدك؟", "Kayfa aqdir usa'idak?"],
        ["ID Card", "بطاقة الهوية", "Bitaqat al-hawiya"],
        ["Health Insurance", "تأمين صحي", "Ta'meen sihhi"],
        ["Medical Prescription", "وصفة طبية", "Wasfa tibbiyya"],
        ["Please wait here", "من فضلك انتظر هنا", "Min fadlik intadhir huna"],
        ["Excuse me / If you please", "لو سمحت", "Law samaht"],
        ["Pain", "ألم", "Alam"],
        ["Water", "ماء", "Maa"],
        ["Medicine / Drug", "دواء", "Dawaa'"],
        ["Patient", "مريض", "Marid"],
        ["Hospital", "مستشفى", "Mustashfa"],
        ["Clinic", "عيادة", "'Eyaadah"],
        ["Rehab Center / Clinic", "مركز تأهيل", "Markaz Ta'heel"],
      ],
    },
  ],
  resources: [
    {
      type: "video",
      title: "Arabic Medical Pharmacy Vocabulary",
      description: "Vocabulary for greeting and processing patients.",
      url: "https://www.youtube.com/results?search_query=arabic+medical+pharmacy+vocabulary",
    },
    {
      type: "article",
      title: "Arabic Vocabulary for Healthcare Professionals",
      description: "Comprehensive medical vocabulary for healthcare settings.",
      url: "https://www.tareequljannah.com/blogs/arabic-vocabulary-for-healthcare-professionals/",
    },
  ],
  checkpoints: [
    {
      id: "w1-c1",
      label: "Mastered 25 standard administrative phrases.",
    },
    {
      id: "w1-c2",
      label: "Roleplayed processing an ID and insurance card.",
    },
  ],
  scenario: {
    patient: "A 45-year-old male patient presents to the pharmacy counter.",
    instructions:
      "Welcome him respectfully, ask for his prescription, ID, and insurance card to process his medication.",
    answerKey: {
      arabic:
        "أهلاً بك. كيف حالك؟ أعطني الوصفة لو سمحت، وهل ممكن بطاقة الهوية وبطاقة التأمين؟ تفضل بالجلوس هنا دقائق وسنجهز لك الدواء.",
      transliteration:
        "Ahlan bika. Kayfa haluka? A'tini al-wasfa law samaht, wa hal mumkin bitaqat al-hawiya wa bitaqat al-ta'meen? Tafaddal bi-l-juloos huna daqaiq wa sanujahhiz laka al-dawaa'.",
      rationale:
        "Uses standard, professional Medical Arabic to establish a polite clinical boundary while efficiently gathering administrative requirements.",
    },
  },
};
