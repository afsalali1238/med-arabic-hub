import { createFileRoute } from "@tanstack/react-router";
import { SyllabusView } from "@/components/course/SyllabusView";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { WEEKS } from "@/data/course";
import { useMemo } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { progress, calculateWeekProgress } = useCourseProgress();

  const perWeekPct = useMemo(() => {
    const map: Record<string, number> = {};
    WEEKS.forEach((w) => {
      map[w.id] = calculateWeekProgress(w.id).pct;
    });
    return map;
  }, [progress.completedCheckpoints, progress.assignments, calculateWeekProgress]);

  return <SyllabusView weeks={WEEKS} perWeekPct={perWeekPct} />;
}
