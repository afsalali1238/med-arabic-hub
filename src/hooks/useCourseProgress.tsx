import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { toast } from "sonner";
import type { VocabEntry } from "@/data/course";
import {
  WEEKS,
  XP_PER_QUIZ,
  XP_PER_FLASHCARD,
  XP_PER_WEEK,
  levelForXp,
  TRACKS,
} from "@/data/course";
const STORAGE_KEY = "medical-arabic-course-v1";

export interface CourseProgress {
  completedCheckpoints: string[];
  checkpointScores: Record<string, { score: number; timestamp: number }>;
  assignments: Record<string, { answers: string; submitted: boolean; selfScore?: string }>;
  notes: Record<string, string>;
  vocabBank: VocabEntry[];
}

const EMPTY: CourseProgress = {
  completedCheckpoints: [],
  checkpointScores: {},
  assignments: {},
  notes: {},
  vocabBank: [],
};

function load(): CourseProgress {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<CourseProgress>;
    return {
      completedCheckpoints: parsed.completedCheckpoints ?? [],
      checkpointScores: parsed.checkpointScores ?? {},
      assignments: parsed.assignments ?? {},
      notes: parsed.notes ?? {},
      vocabBank: parsed.vocabBank ?? [],
    };
  } catch {
    return EMPTY;
  }
}

export const CourseProgressContext = createContext<ReturnType<
  typeof useCourseProgressProvider
> | null>(null);

export function CourseProgressProvider({ children }: { children: ReactNode }) {
  const progress = useCourseProgressProvider();
  return (
    <CourseProgressContext.Provider value={progress}>{children}</CourseProgressContext.Provider>
  );
}

export function useCourseProgress() {
  const ctx = useContext(CourseProgressContext);
  if (!ctx) throw new Error("useCourseProgress must be used within CourseProgressProvider");
  return ctx;
}

function useCourseProgressProvider() {
  const [progress, setProgress] = useState<CourseProgress>(EMPTY);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProgress(load());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      /* ignore quota errors */
    }
  }, [progress, hydrated]);

  const toggleCheckpoint = useCallback((id: string) => {
    setProgress((p) => ({
      ...p,
      completedCheckpoints: p.completedCheckpoints.includes(id)
        ? p.completedCheckpoints.filter((c) => c !== id)
        : [...p.completedCheckpoints, id],
    }));
  }, []);

  const setCheckpointScore = useCallback((id: string, score: number) => {
    setProgress((p) => ({
      ...p,
      checkpointScores: {
        ...p.checkpointScores,
        [id]: { score, timestamp: Date.now() },
      },
    }));
  }, []);

  const setAssignment = useCallback(
    (
      weekId: string,
      patch: Partial<{ answers: string; submitted: boolean; selfScore?: string }>,
    ) => {
      setProgress((p) => {
        const prev = p.assignments[weekId] ?? { answers: "", submitted: false };
        return {
          ...p,
          assignments: { ...p.assignments, [weekId]: { ...prev, ...patch } },
        };
      });
    },
    [],
  );

  const setNote = useCallback((weekId: string, value: string) => {
    setProgress((p) => ({ ...p, notes: { ...p.notes, [weekId]: value } }));
  }, []);

  const addVocab = useCallback((entry: Omit<VocabEntry, "id">) => {
    setProgress((p) => {
      // Check for duplicates
      const isDuplicate = p.vocabBank.some(
        (v) => v.arabic === entry.arabic && v.transliteration === entry.transliteration,
      );

      if (isDuplicate) {
        toast.info("Term already in Vocabulary Bank");
        return p;
      }

      toast.success("Added to Vocabulary Bank");
      return {
        ...p,
        vocabBank: [
          ...p.vocabBank,
          { ...entry, id: `v-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` },
        ],
      };
    });
  }, []);

  const removeVocab = useCallback((id: string) => {
    setProgress((p) => ({ ...p, vocabBank: p.vocabBank.filter((v) => v.id !== id) }));
  }, []);

  const updateVocab = useCallback((id: string, patch: Partial<VocabEntry>) => {
    setProgress((p) => ({
      ...p,
      vocabBank: p.vocabBank.map((v) => (v.id === id ? { ...v, ...patch } : v)),
    }));
  }, []);

  const reviewVocab = useCallback((id: string, rating: 0 | 1 | 2 | 3) => {
    // rating: 0 = Again, 1 = Hard, 2 = Good, 3 = Easy
    setProgress((p) => {
      const vocabBank = p.vocabBank.map((v) => {
        if (v.id !== id) return v;

        let { repetition = 0, interval = 0, efactor = 2.5 } = v;

        if (rating >= 2) {
          // Correct response
          if (repetition === 0) {
            interval = 1;
          } else if (repetition === 1) {
            interval = 6;
          } else {
            interval = Math.round(interval * efactor);
          }
          repetition += 1;
        } else {
          // Incorrect response
          repetition = 0;
          interval = 1;
        }

        efactor = efactor + (0.1 - (3 - rating) * (0.08 + (3 - rating) * 0.02));
        if (efactor < 1.3) efactor = 1.3;

        const nextReviewDate = Date.now() + interval * 24 * 60 * 60 * 1000;

        return { ...v, repetition, interval, efactor, nextReviewDate };
      });
      return { ...p, vocabBank };
    });
  }, []);

  const exportProgress = useCallback(() => {
    try {
      const dataStr = JSON.stringify(progress, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const exportFileDefaultName = `medical-arabic-progress-${new Date().toISOString().split("T")[0]}.json`;

      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", url);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();
      URL.revokeObjectURL(url);

      toast.success("Progress exported successfully");
    } catch (e) {
      toast.error("Failed to export progress");
    }
  }, [progress]);

  const exportAnkiCSV = useCallback(async () => {
    try {
      if (progress.vocabBank.length === 0) {
        toast.info("Vocabulary Bank is empty");
        return;
      }

      const { getAudioFilename } = await import("@/lib/hash");

      let csvContent = "";
      for (const v of progress.vocabBank) {
        const audioFile = await getAudioFilename(v.arabic);
        // Basic Anki import format: Front, Back, Audio (Wait, Anki CSV usually uses tabs or commas. Let's use comma and quotes)
        const front = `"${v.arabic.replace(/"/g, '""')}<br/><br/><small>${v.transliteration.replace(/"/g, '""')}</small>"`;
        const back = `"${v.english.replace(/"/g, '""')}"`;
        const audio = `"[sound:${audioFile}]"`;
        csvContent += `${front},${back},${audio}\n`;
      }

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", url);
      linkElement.setAttribute(
        "download",
        `medical-arabic-anki-${new Date().toISOString().split("T")[0]}.csv`,
      );
      linkElement.click();
      URL.revokeObjectURL(url);

      toast.success("Anki CSV exported successfully", {
        description: "Copy your /public/audio/ files into your Anki collection.media folder.",
      });
    } catch (e) {
      console.error(e);
      toast.error("Failed to export Anki CSV");
    }
  }, [progress]);

  const importProgress = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = e.target?.result as string;
        const parsed = JSON.parse(result) as Partial<CourseProgress>;

        // Basic validation
        if (typeof parsed !== "object" || parsed === null) {
          throw new Error("Invalid format");
        }

        setProgress({
          completedCheckpoints: Array.isArray(parsed.completedCheckpoints)
            ? parsed.completedCheckpoints
            : [],
          checkpointScores:
            typeof parsed.checkpointScores === "object" ? parsed.checkpointScores : {},
          assignments: typeof parsed.assignments === "object" ? parsed.assignments : {},
          notes: typeof parsed.notes === "object" ? parsed.notes : {},
          vocabBank: Array.isArray(parsed.vocabBank) ? parsed.vocabBank : [],
        });

        toast.success("Progress imported successfully");
      } catch (err) {
        console.error(err);
        toast.error("Invalid backup file. Could not import progress.");
      }
    };
    reader.onerror = () => {
      toast.error("Failed to read the file.");
    };
    reader.readAsText(file);
  }, []);

  const calculateWeekProgress = useCallback(
    (trackId: string, weekId: string) => {
      const track = TRACKS.find((t) => t.id === trackId);
      if (!track) return { doneCheckpoints: 0, scenarioDone: 0, doneTotal: 0, total: 1, pct: 0 };
      const week = track.weeks.find((w) => w.id === weekId);
      if (!week) return { doneCheckpoints: 0, scenarioDone: 0, doneTotal: 0, total: 1, pct: 0 };

      const done = week.checkpoints.filter((c) =>
        progress.completedCheckpoints.includes(c.id),
      ).length;
      const scenarioDone = progress.assignments[weekId]?.submitted ? 1 : 0;
      const total = week.checkpoints.length + 1;
      return {
        doneCheckpoints: done,
        scenarioDone,
        doneTotal: done + scenarioDone,
        total,
        pct: Math.round(((done + scenarioDone) / total) * 100),
      };
    },
    [progress.completedCheckpoints, progress.assignments],
  );

  const calculateOverallProgress = useCallback(
    (trackId: string) => {
      const track = TRACKS.find((t) => t.id === trackId);
      if (!track) return { globalCompleted: 0, totalCheckpoints: 1, globalPct: 0 };
      const totalCheckpoints = track.weeks.reduce((n, w) => n + w.checkpoints.length + 1, 0);
      const globalCompleted =
        progress.completedCheckpoints.length +
        Object.values(progress.assignments).filter((a) => a.submitted).length;

      return {
        globalCompleted,
        totalCheckpoints,
        globalPct: totalCheckpoints ? Math.round((globalCompleted / totalCheckpoints) * 100) : 0,
      };
    },
    [progress.completedCheckpoints, progress.assignments],
  );

  const xp = useMemo(() => {
    let total = 0;
    total += progress.completedCheckpoints.length * XP_PER_QUIZ;
    total += progress.vocabBank.length * XP_PER_FLASHCARD;

    TRACKS.forEach((track) => {
      track.weeks.forEach((week) => {
        const done = week.checkpoints.filter((c) =>
          progress.completedCheckpoints.includes(c.id),
        ).length;
        const scenarioDone = progress.assignments[week.id]?.submitted ? 1 : 0;
        if (done + scenarioDone === week.checkpoints.length + 1) {
          total += XP_PER_WEEK;
        }
      });
    });
    return total;
  }, [progress]);

  const level = useMemo(() => levelForXp(xp), [xp]);

  return {
    progress,
    hydrated,
    toggleCheckpoint,
    setCheckpointScore,
    setAssignment,
    setNote,
    addVocab,
    removeVocab,
    updateVocab,
    reviewVocab,
    exportProgress,
    exportAnkiCSV,
    importProgress,
    calculateWeekProgress,
    calculateOverallProgress,
    xp,
    level,
  };
}
