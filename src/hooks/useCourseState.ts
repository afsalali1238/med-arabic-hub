import { useCallback, useEffect, useState } from "react";
import {
  WEEKS,
  XP_PER_SCENARIO,
  XP_PER_TASK,
  levelForXp,
} from "@/data/course";

const STORAGE_KEY = "medical-arabic-pt::v1";

export type VocabEntry = {
  id: string;
  english: string;
  arabic: string;
  translit: string;
  note?: string;
};

export type CourseState = {
  xp: number;
  unlockedWeeks: number[];
  completedTasks: string[];
  assignments: Record<number, string>;
  vocabBank: VocabEntry[];
};

const DEFAULT_STATE: CourseState = {
  xp: 0,
  unlockedWeeks: [1],
  completedTasks: [],
  assignments: {},
  vocabBank: [],
};

function loadState(): CourseState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<CourseState>;
    return {
      xp: typeof parsed.xp === "number" ? parsed.xp : 0,
      unlockedWeeks:
        Array.isArray(parsed.unlockedWeeks) && parsed.unlockedWeeks.length
          ? parsed.unlockedWeeks
          : [1],
      completedTasks: Array.isArray(parsed.completedTasks)
        ? parsed.completedTasks
        : [],
      assignments:
        parsed.assignments && typeof parsed.assignments === "object"
          ? (parsed.assignments as Record<number, string>)
          : {},
      vocabBank: Array.isArray(parsed.vocabBank) ? parsed.vocabBank : [],
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export function useCourseState() {
  const [state, setState] = useState<CourseState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate on mount (client only) to avoid SSR mismatch.
  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  // Persist on every change after hydration.
  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const toggleTask = useCallback((taskId: string) => {
    setState((prev) => {
      const done = prev.completedTasks.includes(taskId);
      return {
        ...prev,
        completedTasks: done
          ? prev.completedTasks.filter((t) => t !== taskId)
          : [...prev.completedTasks, taskId],
        xp: Math.max(0, prev.xp + (done ? -XP_PER_TASK : XP_PER_TASK)),
      };
    });
  }, []);

  const setAssignmentDraft = useCallback((weekId: number, text: string) => {
    setState((prev) => ({
      ...prev,
      assignments: { ...prev.assignments, [weekId]: text },
    }));
  }, []);

  // Returns true if this is the first submission (so caller can fire confetti).
  const submitScenario = useCallback((weekId: number, text: string) => {
    const submitId = `w${weekId}-scenario`;
    let firstTime = false;
    setState((prev) => {
      const already = prev.completedTasks.includes(submitId);
      firstTime = !already;
      const nextUnlocked = prev.unlockedWeeks.includes(weekId + 1)
        ? prev.unlockedWeeks
        : weekId + 1 <= WEEKS.length
          ? [...prev.unlockedWeeks, weekId + 1]
          : prev.unlockedWeeks;
      return {
        ...prev,
        assignments: { ...prev.assignments, [weekId]: text },
        completedTasks: already
          ? prev.completedTasks
          : [...prev.completedTasks, submitId],
        unlockedWeeks: nextUnlocked,
        xp: already ? prev.xp : prev.xp + XP_PER_SCENARIO,
      };
    });
    return firstTime;
  }, []);

  const addVocab = useCallback((entry: Omit<VocabEntry, "id">) => {
    setState((prev) => {
      const id = `${entry.english}::${entry.arabic}`;
      if (prev.vocabBank.some((v) => v.id === id)) return prev;
      return { ...prev, vocabBank: [{ ...entry, id }, ...prev.vocabBank] };
    });
  }, []);

  const removeVocab = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      vocabBank: prev.vocabBank.filter((v) => v.id !== id),
    }));
  }, []);

  const isTaskDone = useCallback(
    (taskId: string) => state.completedTasks.includes(taskId),
    [state.completedTasks],
  );

  const hasVocab = useCallback(
    (english: string, arabic: string) =>
      state.vocabBank.some((v) => v.id === `${english}::${arabic}`),
    [state.vocabBank],
  );

  const level = levelForXp(state.xp);

  return {
    state,
    hydrated,
    level,
    toggleTask,
    isTaskDone,
    setAssignmentDraft,
    submitScenario,
    addVocab,
    removeVocab,
    hasVocab,
  };
}

export type CourseStore = ReturnType<typeof useCourseState>;
