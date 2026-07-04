# Medical Arabic for Physiotherapists — Gamified Learning App

A native-feeling, mobile-first React web app (Duolingo-style) that teaches the 8-week "Movement & Healing" conversational Medical Arabic course. All progress persists to LocalStorage and state is structured for a clean future swap to Lovable Cloud / Supabase.

## Design & Look
- **Aesthetic:** Clean energetic healthcare — dynamic blues + energetic teals + crisp whites, on a soft off-white background. Large rounded cards (`rounded-2xl`), soft shadows, generous tap targets.
- **Fonts (loaded via `<link>` in `__root.tsx` head):** `Cairo` for Arabic (RTL), `Inter` for English. Arabic script rendered `dir="rtl"` with larger size for legibility.
- **Tokens:** Add teal/blue semantic colors + gradients to `src/styles.css` (`@theme inline` + `:root`). No hardcoded colors in components.
- **Motion:** Smooth slide-in for week detail, accordion expand for answer keys, XP bump animation, animated lightning bolt in the app bar.

## App Layout (mobile-first shell)
- **Fixed Top App Bar:** App title, current Level title + number, total XP with animated lightning-bolt icon and a thin XP-to-next-level progress bar.
- **Fixed Bottom Nav (thumb reach):** 📚 Syllabus (home) · 🗂️ Vocab Bank · 📈 Stats.
- **Main viewport:** vertical scrollable feed between the bars, max-width mobile column centered on desktop.

## Screens
1. **Syllabus (Home):** Vertical feed of Week 1–8 cards. Unlocked weeks show title, XP available, and progress ring; locked weeks show a lock and unlock hint. Tapping an unlocked card slides in the Week Detail view.
2. **Week Detail (slide-in):**
   - Header: week title, description, XP available.
   - **Vocabulary table:** clinical phrase rows (English / Arabic script RTL / transliteration / context). Each has an "add to Vocab Bank" (＋) action.
   - **Checklist timeline:** curated resources (Video/Audio/Docs) + concept checkpoints as tappable rows. Tapping the checkbox fires a micro-interaction (scale/pop + optional WebAudio click), checks it, awards **+10 XP** immediately. Resource links open in `target="_blank" rel="noopener"`.
   - **Clinical Scenario ("Boss Fight"):** English patient scenario in a prominent styled card, instructions, a large RTL-friendly `<textarea>` (English + Arabic), and a big **"Submit Consultation"** button. On submit: trigger **confetti**, award **+50 XP**, save the answer, and expand an accordion revealing the **Hidden Answer Key & Rationale** (Arabic script shown distinctly + transliteration + rationale). Completing a week's scenario unlocks the next week.
3. **Vocab Bank:** Saved phrases (from tables or a custom add form: English/Arabic/transliteration). Delete supported. Persists.
4. **Stats:** Total XP, current level + title, progress to next level, weeks completed, tasks completed, scenarios submitted, vocab count — shown with cards/rings.

## Gamification
- **XP:** +10 per checked resource/checkpoint, +50 per submitted scenario.
- **Levels (title evolves with XP):** e.g. L1 "Student" (0), L2 "Clinical Novice" (100), L3 "Bedside Communicator" (250), L4 "Fluent Clinician" (450), L5 "Clinical Communicator" (700+). Exact thresholds tuned to total available XP.
- **Rewards:** `react-confetti` burst on scenario submission; XP counter animates on gain.
- Unchecking a task reverses its XP (idempotent, keyed by unique task ID) so totals stay honest.

## State & Persistence
`useCourseState` hook (in `src/hooks/`) — single source of truth synced to LocalStorage on every change, shaped to map cleanly onto a DB later:
- `xp: number`
- `unlockedWeeks: number[]` (default `[1]`)
- `completedTasks: string[]` (unique task IDs like `w1-res-0`, `w1-check-1`)
- `assignments: Record<number, string>` (weekId → user text)
- `vocabBank: Array<{ id, english, arabic, translit, note? }>`
- Versioned storage key + safe hydration (guards against SSR `window` access and malformed JSON).

## Course Data
- All 8 weeks embedded as typed data in `src/data/course.ts`: title, overview, time allocation, core-concept vocabulary tables (English / Arabic script / transliteration / clinical relevance), curated resources (type + label + URL), concept checkpoints, and the interactive assignment (scenario, instructions, answer key: transliteration + Arabic script + rationale). Data taken verbatim from the uploaded report (Weeks 1–8, including the capstone in Week 8).

## Technical Notes
- Single-page shell in `src/routes/index.tsx` with client-side tab + detail state (keeps the native-app feel; no per-tab URL routing needed). SSR-safe: LocalStorage access guarded to client only to avoid hydration errors.
- Install `react-confetti`. Fonts via root-head `<link>` (never `@import` a URL in CSS).
- Components split under `src/components/course/` (AppBar, BottomNav, WeekCard, WeekDetail, ChecklistRow, ScenarioCard, VocabBank, Stats, Confetti wrapper).
- Update `__root.tsx` head: real title "Medical Arabic for Physiotherapists" + description + og/twitter tags.
- No backend in this pass; state layer is structured so a Supabase swap is a drop-in later.

## Out of scope (this pass)
- Real accounts/cloud sync (LocalStorage only, by request).
- Audio recording / voice submission checkpoints (rendered as checkable tasks only).
