export type VocabRow = {
  category: string;
  english: string;
  arabic: string;
  translit: string;
  context: string;
};

export type ResourceType = "video" | "audio" | "docs";

export type Resource = {
  type: ResourceType;
  label: string;
  url: string;
};

export type Assignment = {
  scenario: string;
  instructions: string;
  answerTranslit: string;
  answerArabic: string;
  rationale: string;
};

export type Week = {
  id: number;
  title: string;
  subtitle: string;
  overview: string;
  timeAllocation: string;
  vocab: VocabRow[];
  resources: Resource[];
  checkpoints: string[];
  assignment: Assignment;
};

export const COURSE_TITLE = "Medical Arabic for Physiotherapists";
export const COURSE_SUBTITLE =
  "Movement & Healing: Conversational Medical Arabic";

export const LEVELS = [
  { level: 1, title: "Student", min: 0 },
  { level: 2, title: "Clinical Novice", min: 100 },
  { level: 3, title: "Bedside Communicator", min: 250 },
  { level: 4, title: "Fluent Clinician", min: 450 },
  { level: 5, title: "Clinical Communicator", min: 700 },
];

export const XP_PER_TASK = 10;
export const XP_PER_SCENARIO = 50;

export function levelForXp(xp: number) {
  let current = LEVELS[0];
  for (const l of LEVELS) {
    if (xp >= l.min) current = l;
  }
  const idx = LEVELS.indexOf(current);
  const next = LEVELS[idx + 1] ?? null;
  return { ...current, next };
}

export const WEEKS: Week[] = [
  {
    id: 1,
    title: "Clinical Greetings, Etiquette & Patient Intake",
    subtitle: "The first five minutes of the clinical encounter",
    overview:
      "Establishes the sociolinguistic framework for the Dubai clinic. Transition from textbook greetings to authentic, region-specific demographic intake, navigating cultural respect paradigms to build immediate therapeutic alliance.",
    timeAllocation:
      "1.5h Audio/Video · 2.5h Speaking & Phonetic Mimicry · 2h Interactive Scenarios",
    vocab: [
      {
        category: "Greeting",
        english: "Hello / Welcome",
        arabic: "مرحباً / أهلاً وسهلاً",
        translit: "Marhaban / Ahlan wa sahlan",
        context: "Universal greeting; Ahlan is highly common in the Levant.",
      },
      {
        category: "Inquiry",
        english: "How are you?",
        arabic: "كيف حالك؟ / شلونك؟",
        translit: "Keef halak? / Shlonak?",
        context: "Shlonak (m) / Shlonik (f) is standard Khaleeji phrasing.",
      },
      {
        category: "Respect Marker",
        english: "Older Male Patient",
        arabic: "حجي / عمي",
        translit: "Hajji / Ami",
        context: "Mandatory for older Gulf patients; establishes rapport.",
      },
      {
        category: "Respect Marker",
        english: "Older Female Patient",
        arabic: "حجة / خالتي",
        translit: "Hajja / Khalti",
        context: "Conveys familial respect, lowering patient anxiety.",
      },
      {
        category: "Demographic",
        english: "What is your name?",
        arabic: "إيش اسمك؟",
        translit: "Esh ismek?",
        context: "Esh is the colloquial interrogative for 'What'.",
      },
      {
        category: "Demographic",
        english: "How old are you?",
        arabic: "كم عمرك؟",
        translit: "Kem umrek?",
        context: "Vital for establishing age-related pathologies.",
      },
      {
        category: "Demographic",
        english: "What is your occupation?",
        arabic: "إيش وظيفتك؟",
        translit: "Esh wadeefathek?",
        context: "Essential for ergonomic and postural assessments.",
      },
      {
        category: "Demographic",
        english: "Where do you work/live?",
        arabic: "وين تشتغل؟ / وين تسكن؟",
        translit: "Vain thashthaagal? / Vain thaskoon?",
        context: "Vain is the colloquial equivalent to MSA Ayna (Where).",
      },
    ],
    resources: [
      {
        type: "video",
        label: "Emirati Arabic Live Lesson for Medical Professionals (AlRamsa)",
        url: "https://www.youtube.com/watch?v=sFOJI2bHIHI",
      },
      {
        type: "audio",
        label: "Simple & Easy Arabic Podcast (Beginner Greetings)",
        url: "https://preply.com/en/blog/arabic-podcasts/",
      },
      {
        type: "docs",
        label: "Basic Arabic Medical Vocabulary for Healthcare Professionals",
        url: "https://www.tareequljannah.com/blogs/arabic-vocabulary-for-healthcare-professionals/",
      },
    ],
    checkpoints: [
      "Mastered 25-card demographic & cultural respect flashcard deck.",
      "Recorded voice submission of the standard intake sequence with correct Khaleeji intonation.",
      "Clinical Drill Completed.",
    ],
    assignment: {
      scenario:
        "An older male Emirati patient enters the clinic for his initial consultation regarding bilateral knee osteoarthritis. Welcome him respectfully, invite him to sit down, ask for his name, inquire about his age, and ask about his current occupation to understand his daily physical load.",
      instructions:
        "Draft the exact conversational Arabic response to welcome this patient and conduct the demographic intake, using appropriate Khaleeji dialect markers and cultural respect titles. Provide the dialogue in both Arabic script and transliteration.",
      answerTranslit:
        "Ahlan wa sahlan Hajji, keef halak al-youm? Tafaddal, istareeh hina. Esh ismek law samaht? Kem umrek? Wa esh wadeefathek?",
      answerArabic:
        "أهلاً وسهلاً حجي، كيف حالك اليوم؟ تفضل، استريح هنا. إيش اسمك لو سمحت؟ كم عمرك؟ وإيش وظيفتك؟",
      rationale:
        "Addressing the older patient as Hajji (a term of high respect for elders in the Gulf and Levant) instantly bypasses the sterility of a standard medical encounter. Keef halak al-youm? is the empathetic opener. Tafaddal, istareeh hina softens the clinical environment. Using Esh instead of MSA Ma, and Kem for 'how much', mirrors natural Dubai speech. Adding law samaht (if you please) makes the intake feel like a conversation rather than an interrogation.",
    },
  },
  {
    id: 2,
    title: "Musculoskeletal Anatomy & Chief Complaint",
    subtitle: "From academic anatomy to the words patients actually use",
    overview:
      "Effective PT requires precision in anatomical landmarks and mechanisms of injury. Patients communicate symptoms with highly localized, colloquial vocabulary — this module transitions from university anatomy to the terms used on the treatment plinth.",
    timeAllocation:
      "2h Video/Visual Anatomy Mapping · 2h Pronunciation Practice · 2h Assignment & Quiz",
    vocab: [
      {
        category: "Axial Skeleton",
        english: "Back / Neck / Chest",
        arabic: "ظهر / رقبة / صدر",
        translit: "Daahar / Raqaba / Sadar",
        context: "Primary regions for postural pain and radiculopathy.",
      },
      {
        category: "Appendicular",
        english: "Shoulder / Knee",
        arabic: "كتف / ركبة",
        translit: "Kethif / Rukba",
        context: "Most frequently assessed joints in outpatient PT.",
      },
      {
        category: "Appendicular",
        english: "Elbow / Wrist",
        arabic: "كوع / معصم",
        translit: "Koo' / Mi'sam",
        context: "Common sites for tendinopathies (e.g., tennis elbow).",
      },
      {
        category: "Soft Tissue",
        english: "Muscle / Joint",
        arabic: "عضلة / مفصل",
        translit: "Adaala / Mifsal",
        context: "Differentiating contractile vs. inert tissue pain.",
      },
      {
        category: "Soft Tissue",
        english: "Ligament / Cartilage",
        arabic: "رباط / غضروف",
        translit: "Ribaath / Gadroof",
        context: "Ribaath Saleebi is specifically used for the ACL.",
      },
      {
        category: "Mechanism",
        english: "Fall / Injury",
        arabic: "وقعت / إصابة",
        translit: "Wokkaath / Asaaba",
        context: "Used in historical questioning: Hal wokkaath? (Did you fall?).",
      },
      {
        category: "Mechanism",
        english: "Heavy Lifting",
        arabic: "رفع شيء ثقيل",
        translit: "Irffaath shay thakayil",
        context: "Assessing occupational or gym-related lifting mechanisms.",
      },
    ],
    resources: [
      {
        type: "video",
        label: "Anatomy of Lower Limb in Arabic (Dr. Wahdan 2)",
        url: "https://www.youtube.com/watch?v=5C1VGilMeMg",
      },
      {
        type: "audio",
        label: "Arabic Medical Terminology pronunciation exercises",
        url: "https://earabiclearning.com/blog/2021/12/medical-terms-in-arabic/",
      },
      {
        type: "docs",
        label: "Physical Therapy & Musculoskeletal Glossary (Scribd)",
        url: "https://www.scribd.com/document/898034740/Eng-Arabic-221116-104551",
      },
    ],
    checkpoints: [
      "Identified 20 major anatomical structures on an interactive body map using dialectal audio cues.",
      "Differentiated soft tissue vocabulary: matched Ribaath with ligament and Gadroof with cartilage/meniscus.",
      "Clinical Drill Completed.",
    ],
    assignment: {
      scenario:
        "A young Levantine male athlete presents following a traumatic football injury. Establish the mechanism of injury: ask if he fell, if he heard a 'click' or 'pop' in his knee, then explain the issue might involve his meniscus (cartilage) or ACL.",
      instructions:
        "Formulate the clinical questions and explanation in conversational Levantine/Gulf blended Arabic. Use the correct colloquial anatomical terms for the knee, cartilage, and ligament. Provide the continuous dialogue in both Arabic script and transliteration.",
      answerTranslit:
        "Hal wokkaath wa enta tilaab koorath qadam? Hal samath soth \"click\" fi rukbathek? Al-mushkila mumkin takoon fi al-gadroof aw al-ribaath al-saleebi.",
      answerArabic:
        "هل وقعت وإنت تلعب كرة قدم؟ هل سمعت صوت \"كليك\" في ركبتك؟ المشكلة ممكن تكون في الغضروف أو الرباط الصليبي.",
      rationale:
        "Hal wokkaath investigates the biomechanical force of the injury. English medical onomatopoeia (like 'click') is heavily used as a loanword by Arab clinicians and patients — using it demonstrates fluency, whereas literal translation would confuse. Gadroof (cartilage/meniscus) and Ribaath Saleebi (cruciate ligament/ACL) are the practical nouns adopted over complex MSA equivalents.",
    },
  },
  {
    id: 3,
    title: "Subjective Pain Assessment",
    subtitle: "Location, type, and chronology",
    overview:
      "Pain is a multidimensional experience. Arab patients use a rich tapestry of adjectives and temporal markers. Map location, define chronological onset, and categorize severity using standard descriptive terminology.",
    timeAllocation:
      "2h Patient Narrative Audio · 1.5h Vocabulary Drilling · 2.5h Assignment",
    vocab: [
      {
        category: "Localization",
        english: "Where is the pain?",
        arabic: "وين الألم؟ / وين الوجع؟",
        translit: "Vain al-alam? / Vain al-waja'?",
        context: "Alam is widely understood; Waja' is specifically Levantine.",
      },
      {
        category: "Localization",
        english: "Do you have pain here?",
        arabic: "عندك ألم هنا؟",
        translit: "Endek alam hina?",
        context: "Used when palpating or pointing to a specific dermatome.",
      },
      {
        category: "Chronology",
        english: "Since when?",
        arabic: "من متى عندك الألم؟",
        translit: "Min meta endek al-alam?",
        context: "Determines acute vs. sub-acute vs. chronic staging.",
      },
      {
        category: "Frequency",
        english: "Always vs. Sometimes",
        arabic: "دائماً / أحياناً",
        translit: "Dayiman / Ahiyaanan",
        context: "Differentiates constant chemical from intermittent mechanical pain.",
      },
      {
        category: "Severity",
        english: "Severe / Moderate / Mild",
        arabic: "شديد / متوسط / خفيف",
        translit: "Shadeed / Mutawassit / Khafif",
        context: "Qualitative triage markers prior to quantitative VAS scaling.",
      },
      {
        category: "Expression",
        english: "My back hurts",
        arabic: "ظهري يؤلمني",
        translit: "Zahri yuʾulimuni / Zahri beewaja'ni",
        context: "Recognizing active verbal expressions of pain.",
      },
    ],
    resources: [
      {
        type: "video",
        label: "Medical Vocabulary in Levantine Arabic (Shami Speaker)",
        url: "https://www.youtube.com/watch?v=vQNyqvy3iDQ",
      },
      {
        type: "audio",
        label: "Gulf News Podcasts — MS Talks / Mind Your Migraine",
        url: "https://podcasts.apple.com/au/channel/gulf-news-podcasts/id6442719122",
      },
      {
        type: "docs",
        label: "Common Health Problems & Pain Descriptors",
        url: "https://www.arabicpod101.com/arabic-vocabulary-lists/common-health-problems",
      },
    ],
    checkpoints: [
      "Mastered translation and auditory recognition of 15 pain-related adjectives and frequency adverbs.",
      "Matched pain locations and severity descriptors to native-speaker audio clips.",
      "Clinical Drill Completed.",
    ],
    assignment: {
      scenario:
        "A female patient with chronic cervical spine issues presents for a follow-up. Conduct the subjective review: ask exactly where the pain is located in her neck, since when she has experienced this exacerbation, and whether the pain is severe or mild.",
      instructions:
        "Draft the exact questions required to extract this subjective pain history in conversational Arabic. Use clear, empathetic language that guides the patient to specific answers. Provide both Arabic script and transliteration.",
      answerTranslit:
        "Vain al-alam fi raqabathek? Min meta endek haada al-alam? Hal al-alam shadeed aw baseeth?",
      answerArabic:
        "وين الألم في رقبتك؟ من متى عندك هذا الألم؟ هل الألم شديد أو بسيط؟",
      rationale:
        "Vain al-alam fi raqabathek? localizes the query to the cervical spine (Raqaba), forcing the patient to point to the exact segment. Min meta endek haada al-alam? is standardized Gulf phrasing for defining the chronological window. Offering a binary qualitative choice (shadeed aw baseeth) aids rapid triage — prompting with specific adjectives yields faster, more accurate documentation.",
    },
  },
  {
    id: 4,
    title: "Objective Pain Assessment",
    subtitle: "Scale, aggravating, and easing factors",
    overview:
      "Quantify symptomology and assess mechanical provocations. This week bridges subjective patient reporting and objective clinical measurement, establishing empirical baselines for future re-assessment.",
    timeAllocation:
      "1.5h Video Observation · 2h Role-Play Simulation · 2.5h Assignment & Synthesis",
    vocab: [
      {
        category: "Pain Scale (VAS)",
        english: "Out of ten, how much is the pain?",
        arabic: "من عشرة، كم الألم؟",
        translit: "Min a'shara, kem al-alam?",
        context: "Establishes the quantifiable baseline on the 0-10 scale.",
      },
      {
        category: "Mechanical Provocation",
        english: "Does it hurt when I do this?",
        arabic: "عندك ألم لما أسوي كذا؟",
        translit: "Endek alam lemma asouvi qida?",
        context: "Concurrent verbal cuing during passive range of motion.",
      },
      {
        category: "Palpation Provocation",
        english: "Does it hurt when I press here?",
        arabic: "عندك ألم لما أضغط هنا؟",
        translit: "Endek alam lemma ed'goth hina?",
        context: "Essential for identifying point tenderness and trigger points.",
      },
      {
        category: "Red Flag Screening",
        english: "Do you have night pain?",
        arabic: "عندك ألم في الليل؟",
        translit: "Endek alam fi lel?",
        context: "Screening for systemic pathology or inflammatory states.",
      },
      {
        category: "Symptom Spread",
        english: "Only here, or everywhere?",
        arabic: "هنا بس، أو كل مكان؟",
        translit: "Hina bas, aw kul makaan?",
        context: "Differentiating localized facet pain from radiating radiculopathy.",
      },
    ],
    resources: [
      {
        type: "video",
        label: "50 Essential Arabic Words for Nurses | Gulf Medical Vocabulary",
        url: "https://www.youtube.com/watch?v=iu1WNEQglQY",
      },
      {
        type: "audio",
        label: "Learn Arabic Podcast: Health / Medical Consultations",
        url: "https://www.youtube.com/watch?v=EE0TtA8UkC8",
      },
      {
        type: "docs",
        label: "Hospital Vocabulary in Arabic (Kalimah Center)",
        url: "https://kalimah-center.com/hospital-vocabulary-in-arabic/",
      },
    ],
    checkpoints: [
      "Demonstrated auditory comprehension and verbal fluency of numbers 1-10 in the context of pain scaling.",
      "Formulated three distinct questions testing mechanical provocation during simulated palpation.",
      "Clinical Drill Completed.",
    ],
    assignment: {
      scenario:
        "An adult patient with suspected lumbar radiculopathy (sciatica) is lying prone on the plinth. You need to press on their lower lumbar spine, ask if it hurts when you press there, ask if the pain stays in that spot or radiates everywhere, and finally ask them to rate the provoked pain out of ten.",
      instructions:
        "Write the sequential string of assessment questions in Arabic as you physically perform the palpation test. Ensure the transition between location, radiation, and scaling is fluid. Provide both script and transliteration.",
      answerTranslit:
        "Endek alam lemma ed'goth hina fi daaharek? Hina bas, aw kul makaan? Min a'shara, kem al-alam?",
      answerArabic:
        "عندك ألم لما أضغط هنا في ظهرك؟ هنا بس، أو كل مكان؟ من عشرة، كم الألم؟",
      rationale:
        "Manual therapy requires concurrent verbal cues aligned with hand movements. Endek alam lemma ed'goth hina? is a direct query for objective testing, with fi daaharek focusing sensory attention on the back. Hina bas, aw kul makaan? efficiently identifies radiating nerve pain without complex neurological vocabulary. Min a'shara, kem al-alam? locks in the quantifiable data point immediately after provocation.",
    },
  },
  {
    id: 5,
    title: "Directional Movement Commands",
    subtitle: "Upper quarter assessment & gender-specific imperatives",
    overview:
      "PT relies on imperative verbs to guide AROM, PROM, and MMT safely. This module focuses on the upper extremities and the critical grammatical rules of gender-specific command conjugations — the masculine base modified with an '-i' suffix for female patients.",
    timeAllocation:
      "2.5h Grammar & Imperative Conjugation · 1.5h Active Listening · 2h Assignment",
    vocab: [
      {
        category: "Resistance",
        english: "Push / Pull",
        arabic: "ادفع / اسحب — ادفعي / اسحبي",
        translit: "Idfa / Idfai · Ishaab / Ishaabi",
        context: "Push / Pull against the therapist during MMT.",
      },
      {
        category: "Elevation",
        english: "Lift",
        arabic: "ارفع — ارفعي",
        translit: "Irfa / Irfai",
        context: "Lift (e.g., lift your arm/shoulder).",
      },
      {
        category: "Positional",
        english: "Turn / Look at me",
        arabic: "لف / شوفني — لفي / شوفيني",
        translit: "Lif / Lifi · Shoof ni / Shoofi ni",
        context: "Used for visual redirection.",
      },
      {
        category: "Stabilization",
        english: "Keep there / Hold this position",
        arabic: "خليك هناك — خليكي هناك",
        translit: "Halli hinaak / Halliki hinaak",
        context: "Essential for testing joint stability.",
      },
      {
        category: "Mimicry",
        english: "Do exactly like this",
        arabic: "سوي نفس هذا",
        translit: "Souvi nafs haada",
        context: "Utilized for visual demonstration of complex biomechanics.",
      },
      {
        category: "Effort Modifier",
        english: "Use more force",
        arabic: "زيادة قوة",
        translit: "Zyaada koova",
        context: "Ensuring maximum voluntary contraction during testing.",
      },
    ],
    resources: [
      {
        type: "video",
        label: "Lesson 8: Verbs in Emirati Dialect (AlRamsa Institute)",
        url: "https://www.youtube.com/watch?v=3G-poc6bZyg",
      },
      {
        type: "audio",
        label: "Talk In Arabic (Levantine/Gulf imperatives)",
        url: "https://talkinarabic.com/",
      },
      {
        type: "docs",
        label: "Physical Therapy Vocabulary Guide (Commands Section)",
        url: "https://www.scribd.com/document/898034740/Eng-Arabic-221116-104551",
      },
    ],
    checkpoints: [
      "Conjugated 15 core movement verbs into accurate polite imperative forms for both masculine and feminine cases.",
      "Constructed 10 functional sentences combining an imperative verb with a specific anatomical structure.",
      "Clinical Drill Completed.",
    ],
    assignment: {
      scenario:
        "During manual muscle testing for shoulder flexion and abduction, you need to instruct a female patient to: look at you, do exactly like this (demonstrating), lift her arm, and push against your hand using more force to test peak strength.",
      instructions:
        "Write the string of movement commands in Arabic, ensuring strict adherence to the gender-appropriate conjugations for a female patient. Structure the phrasing to be authoritative yet clinically appropriate. Provide both script and transliteration.",
      answerTranslit:
        "Shoofi ni, souvi nafs haada. Irfai yadek, idfai yadi, isthek'demi zyaada koova.",
      answerArabic:
        "شوفيني، سوي نفس هذا. ارفعي يدك، ادفعي يدي، استخدمي زيادة قوة.",
      rationale:
        "Because the patient is female, imperative verbs take the feminine '-i' suffix: Shoof becomes Shoofi ni, Irfa becomes Irfai, Idfa becomes Idfai. Isthek'demi zyaada koova elicits maximum effort during MMT, ensuring an accurate muscle grade. The visual mimicry cue Souvi nafs haada prevents misinterpretation of complex multi-planar shoulder movements.",
    },
  },
  {
    id: 6,
    title: "Lower Quarter, Gait & Corrective Cuing",
    subtitle: "Real-time corrections during dynamic movement",
    overview:
      "Shifting focus to the lower extremities, gait analysis, and the dynamic skill of corrective feedback. Providing real-time corrections during weight-bearing movements is one of the most cognitively demanding linguistic tasks, requiring rapid, authoritative syntax.",
    timeAllocation:
      "2h Video/Gait Observation · 2h Verbal Cuing & Spatial Awareness · 2h Assignment",
    vocab: [
      {
        category: "Lower Body Motor",
        english: "Walk / Stand (Stop)",
        arabic: "امشي / وقف",
        translit: "Emshi / Woqaff",
        context: "Foundational commands for gait analysis and treadmill training.",
      },
      {
        category: "Lower Body Motor",
        english: "Bend / Straighten",
        arabic: "اثني / تمدد",
        translit: "Ithni / Thema'dad",
        context: "Assessing knee and hip active range of motion.",
      },
      {
        category: "Corrective Interruption",
        english: "Stop! That is wrong.",
        arabic: "وقف! هذاك غلط.",
        translit: "Woqaff! Haadak galath.",
        context: "Abruptly halting a faulty or dangerous movement pattern.",
      },
      {
        category: "Redirection",
        english: "Not like that. Like this.",
        arabic: "مو كذا. نفس هذا.",
        translit: "Mo qida. Nafs haada.",
        context: "Redirecting the motor pattern using visual demonstration.",
      },
      {
        category: "Isolation",
        english: "Move only this part.",
        arabic: "حرك هذا الجزء فقط.",
        translit: "Har'rik faqath haada jiza.",
        context: "Cuing the patient to isolate a joint and prevent compensation.",
      },
      {
        category: "Spatial Modifiers",
        english: "Right / Left / Front / Back",
        arabic: "يمين / يسار / قدام / ورا",
        translit: "Yameen / Yissaar / Kaddaam / Wara",
        context: "Directing the trajectory of the limb in space.",
      },
    ],
    resources: [
      {
        type: "video",
        label: "Anatomy of the Lower Limb in Arabic (Dr. Wahdan 2 — movements)",
        url: "https://www.youtube.com/watch?v=5C1VGilMeMg",
      },
      {
        type: "audio",
        label: "Best ways to learn Arabic medical terminology (TalkPal)",
        url: "https://talkpal.ai/culture/what-is-the-best-way-to-learn-arabic-medical-terminology/",
      },
      {
        type: "docs",
        label: "PT Vocabulary Guide (Directional & Corrective Section)",
        url: "https://www.scribd.com/document/898034740/Eng-Arabic-221116-104551",
      },
    ],
    checkpoints: [
      "Mastered the 6 core spatial orientation terms to direct limb movement.",
      "Practiced the vocal intonation of abruptly stopping a patient and providing corrective redirection.",
      "Clinical Drill Completed.",
    ],
    assignment: {
      scenario:
        "A post-op ACL reconstruction patient is performing a mini-squat incorrectly, allowing their knee to collapse inward into dangerous valgus. Urgently tell them to stop, inform them the pattern is wrong, instruct them to move only the knee straight forward, and ask them to perform the repetition again, but slowly.",
      instructions:
        "Formulate the rapid sequence of corrective commands in Arabic. The tone must be authoritative enough to stop the dangerous movement immediately, yet instructive enough to guide the correction. Provide script and transliteration.",
      answerTranslit:
        "Woqaff! La thisouvi qida, haadak galath. Har'rik faqath rukbathek kaddaam. Souvi maara thania, bathayi.",
      answerArabic:
        "وقف لا تسوي كذا، هذاك غلط. حرّك فقط ركبتك قدام. سوي مرة ثانية، بطيء.",
      rationale:
        "Woqaff! followed by La thisouvi qida, haadak galath provides immediate feedback to halt the kinetic chain. Har'rik faqath rukbathek kaddaam gives a precise external spatial target using the modifier Kaddaam (forward) to prevent valgus collapse. Concluding with Souvi maara thania plus the speed modifier bathayi (slowly) restores motor control and cognitive focus.",
    },
  },
  {
    id: 7,
    title: "Home Exercise Program (HEP)",
    subtitle: "Prescribing sets, reps & driving compliance",
    overview:
      "Clinical efficacy relies on compliance outside the clinic. This module covers explaining protocols, prescribing exact sets and reps, describing resistance equipment, and detailing the physiological rationale to ensure profound patient buy-in.",
    timeAllocation:
      "1.5h Concept Review · 2.5h Translating Exercise Protocols · 2h Assignment",
    vocab: [
      {
        category: "Dosage (Reps)",
        english: "Do it 10 times",
        arabic: "سوي عشرة مرات",
        translit: "Souvi ashra maarath",
        context: "Maarath (times) is the standard plural modifier for repetitions.",
      },
      {
        category: "Dosage (Sets)",
        english: "Repeat again",
        arabic: "كرر مرة ثانية",
        translit: "Ker'r maara thania",
        context: "Instructing the patient to perform subsequent sets.",
      },
      {
        category: "Intensity Modifier",
        english: "Simple / Light exercise",
        arabic: "تمرين بسيط / خفيف",
        translit: "Thamreen baseeth / hafeef",
        context: "Used to reduce patient fear-avoidance behavior.",
      },
      {
        category: "Intensity Modifier",
        english: "Heavy",
        arabic: "ثقيل",
        translit: "Thakayil",
        context: "Used when prescribing weighted resistance training.",
      },
      {
        category: "Physiological Rationale",
        english: "Your muscles are weak, you must strengthen them.",
        arabic: "عضلاتك ضعيف، لازم تقوية.",
        translit: "Adaalathek d'ayif, laazim thak'viath.",
        context: "Establishes medical necessity to drive compliance.",
      },
      {
        category: "Daily Frequency",
        english: "Twice a day",
        arabic: "مرتين في اليوم",
        translit: "Marratayn fii l-yawm",
        context: "Prescribing the frequency of the HEP.",
      },
    ],
    resources: [
      {
        type: "video",
        label: "65 Must-Know Arabic Words/Phrases for Healthcare",
        url: "https://www.scribd.com/document/467153936/65-Must-Know-Arabic-Words-Phrases-for-Anyone-Working-in-Healthcare",
      },
      {
        type: "audio",
        label: "Health on Track Podcast (Gulf wellness vernacular)",
        url: "https://www.giggulf.ae/en/personal/products/health-insurance/health-on-track-podcast",
      },
      {
        type: "docs",
        label: "Common Terms Used While Evaluation & Treatment",
        url: "https://www.scribd.com/document/898034740/Eng-Arabic-221116-104551",
      },
    ],
    checkpoints: [
      "Accurately translated a standard '3 sets of 10 reps, twice a day' protocol into colloquial Arabic.",
      "Formulated a basic physiological explanation for targeted muscle strengthening.",
      "Clinical Drill Completed.",
    ],
    assignment: {
      scenario:
        "A patient with subacromial shoulder impingement needs to begin an active rotator cuff strengthening program. First explain the rationale — that their shoulder muscles are weak and require strengthening. Then instruct the patient to perform a specific light resistance band exercise 10 times, and to repeat that set again.",
      instructions:
        "Write the educational rationale and the exact exercise prescription in conversational Arabic. Ensure the tone is educational and encouraging, driving patient compliance. Provide both script and transliteration.",
      answerTranslit:
        "Adaalat kethifek d'ayif, laazim thak'viath. Haada thamreen baseeth. Souvi ashra maarath, wa ker'r maara thania.",
      answerArabic:
        "عضلات كتفك ضعيف، لازم تقوية. هذا تمرين بسيط. سوي عشرة مرات، وكرر مرة ثانية.",
      rationale:
        "Beginning with the pathology — Adaalat kethifek d'ayif — establishes clear medical necessity, and laazim thak'viath provides the biomechanical solution. Categorizing the movement as a thamreen baseeth (light exercise) reduces anxiety and fear-avoidance. Souvi ashra maarath and ker'r deliver the exact dosimetric parameters required for an effective HEP.",
    },
  },
  {
    id: 8,
    title: "Discharge, Home Care & Capstone",
    subtitle: "Closing the therapeutic encounter warmly",
    overview:
      "The final module culminates the clinical interaction: anticipatory guidance on post-treatment responses (DOMS), lifestyle modifications, a final teach-back comprehension check, and culturally warm farewells to close the encounter and secure follow-up.",
    timeAllocation:
      "1h Video/Audio Wrap-up · 2h Rehearsing Capstone · 3h Capstone Completion",
    vocab: [
      {
        category: "Expectation Management",
        english: "There will be a little pain tomorrow.",
        arabic: "بكرا، فيه شوي ألم بسيط.",
        translit: "Bokra, fi shui alam baseeth.",
        context: "Pre-empts anxiety over Delayed Onset Muscle Soreness (DOMS).",
      },
      {
        category: "Reassurance",
        english: "This is normal.",
        arabic: "هذا عادي.",
        translit: "Haada aadi.",
        context: "Validates the soreness as a normal healing response.",
      },
      {
        category: "Home Care",
        english: "You must rest.",
        arabic: "لازم راحة.",
        translit: "Laazim raaha.",
        context: "Prescribing relative rest for tissue recovery.",
      },
      {
        category: "Comprehension Check",
        english: "Do you understand?",
        arabic: "هل تفهم؟",
        translit: "Hal tafham?",
        context: "Initiates the teach-back method to verify HEP compliance.",
      },
      {
        category: "Cultural Farewell",
        english: "May God heal you.",
        arabic: "الله يشفيك.",
        translit: "Allah yashfeek.",
        context: "Standard religious/cultural well-wish across all dialects.",
      },
      {
        category: "Cultural Farewell",
        english: "Health is ahead of you.",
        arabic: "قدامك العافية.",
        translit: "Guddaamak al-aafiyah.",
        context: "Highly localized Khaleeji idiom wishing a rapid recovery.",
      },
    ],
    resources: [
      {
        type: "video",
        label: "How to Comfort and Encourage in Levantine Arabic (Shababeek)",
        url: "https://shababeekcenter.com/podcast/how-to-comfort-and-encourage-in-levantine-arabic/",
      },
      {
        type: "audio",
        label: "Libyamedcast (broader Arabic medical discussions)",
        url: "https://libyamedcast.com/tag/arabic-podcast/",
      },
      {
        type: "docs",
        label: "Important Arabic words and phrases for healthcare professionals",
        url: "https://www.tareequljannah.com/blogs/arabic-vocabulary-for-healthcare-professionals/",
      },
    ],
    checkpoints: [
      "Mastered 5 distinct cultural phrases for wishing a patient well or a speedy recovery.",
      "Role-played a complete discharge sequence checking for patient understanding.",
      "Capstone Project Uploaded & Approved.",
    ],
    assignment: {
      scenario:
        "CAPSTONE — The initial evaluation is ending for an older post-op knee replacement patient. Manage expectations by informing them there will be a little pain tomorrow but that this is normal. Advise them they need rest at home, check they fully understand the exercise instructions, and warmly wish them a speedy recovery using local idioms as they leave.",
      instructions:
        "Write the comprehensive, continuous closing dialogue in Arabic. Utilize culturally appropriate comforting phrases alongside the clinical advice to foster a strong therapeutic alliance. Provide both script and transliteration.",
      answerTranslit:
        "Bokra, fi shui alam baseeth, haada aadi. Laazim raaha fi al-bait. Hal tafham al-thamareen? Salamtek, guddaamak al-aafiyah.",
      answerArabic:
        "بكرا، فيه شوي ألم بسيط، هذا عادي. لازم راحة في البيت. هل تفهم التمارين؟ سلامتك، قدامك العافية.",
      rationale:
        "Warning with Bokra, fi shui alam baseeth prevents panic when DOMS occurs; haada aadi reduces catastrophization. Laazim raaha fi al-bait reinforces tissue healing. Hal tafham al-thamareen? triggers the teach-back method to verify compliance. Concluding with Salamtek and the localized Khaleeji idiom Guddaamak al-aafiyah leaves the patient feeling deeply cared for and culturally respected.",
    },
  },
];
