# Med-Arabic-Hub (Physiotherapy Edition)

Med-Arabic-Hub is a dedicated, offline-first mobile web application designed to teach physiotherapists conversational Medical Arabic tailored specifically for the clinical environment in the Middle East. It focuses purely on **movement, healing, and practical clinical scenarios**—stripping away irrelevant vocabulary.

## 🚀 Features

* **12-Week Specialized Curriculum**: Covers Greetings, Musculoskeletal Anatomy, Pain Assessment, Range of Motion Commands, and De-escalation/Empathy.
* **SuperMemo-2 (SM-2) Spaced Repetition**: Anki-style algorithmic flashcards track retention and automatically resurface words when you are about to forget them.
* **Fuzzy Arabic Assessment**: Practice typing Arabic freely! The custom assessment engine intelligently strips *harakat* (diacritics) and normalizes tricky letters (like Alif variants or Ta Marbuta) so you're graded on comprehension, not perfect keyboard spelling.
* **Global Clinical Dictionary**: Instantly search all medical terminology from across the 12 weeks. Play audio pronunciations mid-session or bookmark words directly to your SRS flashcard bank.
* **True MP3 Audio Generation**: Every Arabic string is run through a custom pipeline that hits the Google TTS API to generate and cache highly accurate, native-sounding MP3 files (`public/audio/`).
* **Offline-First & Gamified**: Powered entirely on the client side via `localStorage`. Earn XP, level up your clinical rank, and track progress without needing an internet connection on the clinic floor.

## 🛠️ Tech Stack

* **Framework:** React 18 & Vite
* **Routing:** `@tanstack/react-router` (File-based routing)
* **Styling:** Tailwind CSS & `shadcn/ui` (Radix Primitives)
* **State/Caching:** `@tanstack/react-query` & Custom Hooks
* **Deployment target:** Cloudflare Pages (Nitro preset)

## 📦 Local Development

1. **Install dependencies:**
   ```bash
   npm install
   # or
   bun install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   npm run start
   ```

## 🎙️ Adding New Content & Audio

The curriculum data is decoupled into modular files located in `src/data/weeks/`. To add a new week or expand vocabulary:

1. Create or edit a file in `src/data/weeks/` (e.g., `week13.ts`).
2. Add it to the `WEEKS` array in `src/data/course.ts`.
3. Generate the missing MP3 audio files by running the custom audio scraping pipeline:
   ```bash
   npm run generate:audio
   ```
   *(This script will hash every Arabic string, skip existing MP3s, and download any new pronunciations to `public/audio/`)*

## 🤝 Contributing

This project is built for maximum utility for healthcare workers. When contributing, keep the focus on **clinical relevance** and **offline reliability**. Avoid pulling in large network dependencies that would hinder the app's performance on spotty hospital WiFi.
