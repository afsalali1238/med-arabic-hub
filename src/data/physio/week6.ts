import { Week } from "../course";

export const week6: Week = {
  id: "week-6",
  number: 6,
  title: "Lower Quarter, Gait & Corrective Cuing",
  timeAllocation: "2h Video/Gait Observation · 2h Verbal Cuing & Spatial Awareness · 2h Assignment",
  coreConcepts: ["Real-time corrections during dynamic movement"],
  focusAreas: [
    {
      title: "Overview",
      description:
        "Shifting focus to the lower extremities, gait analysis, and the dynamic skill of corrective feedback. Providing real-time corrections during weight-bearing movements is one of the most cognitively demanding linguistic tasks, requiring rapid, authoritative syntax.",
    },
  ],
  vocabTables: [
    {
      caption: "Lower Body Motor",
      headers: ["English", "Arabic Script", "Transliteration", "Context"],
      rows: [
        [
          "Walk / Stand (Stop)",
          "امشي / وقف",
          "Emshi / Woqaff",
          "Foundational commands for gait analysis and treadmill training.",
        ],
        [
          "Bend / Straighten",
          "اثني / تمدد",
          "Ithni / Thema'dad",
          "Assessing knee and hip active range of motion.",
        ],
      ],
    },
    {
      caption: "Corrective Interruption",
      headers: ["English", "Arabic Script", "Transliteration", "Context"],
      rows: [
        [
          "Stop! That is wrong.",
          "وقف! هذاك غلط.",
          "Woqaff! Haadak galath.",
          "Abruptly halting a faulty or dangerous movement pattern.",
        ],
      ],
    },
    {
      caption: "Redirection",
      headers: ["English", "Arabic Script", "Transliteration", "Context"],
      rows: [
        [
          "Not like that. Like this.",
          "مو كذا. نفس هذا.",
          "Mo qida. Nafs haada.",
          "Redirecting the motor pattern using visual demonstration.",
        ],
      ],
    },
    {
      caption: "Isolation",
      headers: ["English", "Arabic Script", "Transliteration", "Context"],
      rows: [
        [
          "Move only this part.",
          "حرك هذا الجزء فقط.",
          "Har'rik faqath haada jiza.",
          "Cuing the patient to isolate a joint and prevent compensation.",
        ],
      ],
    },
    {
      caption: "Spatial Modifiers",
      headers: ["English", "Arabic Script", "Transliteration", "Context"],
      rows: [
        [
          "Right / Left / Front / Back",
          "يمين / يسار / قدام / ورا",
          "Yameen / Yissaar / Kaddaam / Wara",
          "Directing the trajectory of the limb in space.",
        ],
      ],
    },
  ],
  resources: [
    {
      type: "video",
      title: "Anatomy of the Lower Limb in Arabic (Dr. Wahdan 2 — movements)",
      description: "",
      url: "https://www.youtube.com/watch?v=5C1VGilMeMg",
    },
    {
      type: "audio",
      title: "Best ways to learn Arabic medical terminology (TalkPal)",
      description: "",
      url: "https://talkpal.ai/culture/what-is-the-best-way-to-learn-arabic-medical-terminology/",
    },
    {
      type: "docs",
      title: "PT Vocabulary Guide (Directional & Corrective Section)",
      description: "",
      url: "https://www.scribd.com/document/898034740/Eng-Arabic-221116-104551",
    },
  ],
  checkpoints: [
    {
      id: "w6-c1",
      label: "Mastered the 6 core spatial orientation terms to direct limb movement.",
    },
    {
      id: "w6-c2",
      label:
        "Practiced the vocal intonation of abruptly stopping a patient and providing corrective redirection.",
    },
    {
      id: "w6-c3",
      label: "Clinical Drill Completed.",
    },
  ],
  scenario: {
    patient:
      "A post-op ACL reconstruction patient is performing a mini-squat incorrectly, allowing their knee to collapse inward into dangerous valgus. Urgently tell them to stop, inform them the pattern is wrong, instruct them to move only the knee straight forward, and ask them to perform the repetition again, but slowly.",
    instructions:
      "Formulate the rapid sequence of corrective commands in Arabic. The tone must be authoritative enough to stop the dangerous movement immediately, yet instructive enough to guide the correction. Provide script and transliteration.",
    answerKey: {
      arabic: "وقف لا تسوي كذا، هذاك غلط. حرّك فقط ركبتك قدام. سوي مرة ثانية، بطيء.",
      transliteration:
        "Woqaff! La thisouvi qida, haadak galath. Har'rik faqath rukbathek kaddaam. Souvi maara thania, bathayi.",
      rationale:
        "Woqaff! followed by La thisouvi qida, haadak galath provides immediate feedback to halt the kinetic chain. Har'rik faqath rukbathek kaddaam gives a precise external spatial target using the modifier Kaddaam (forward) to prevent valgus collapse. Concluding with Souvi maara thania plus the speed modifier bathayi (slowly) restores motor control and cognitive focus.",
    },
  },
};
