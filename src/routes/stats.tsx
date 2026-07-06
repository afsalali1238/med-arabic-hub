import { createFileRoute } from "@tanstack/react-router";
import { StatsView } from "@/components/course/StatsView";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { WEEKS } from "@/data/course";
import { useMemo } from "react";

export const Route = createFileRoute("/stats")({
  component: StatsRoute,
});

function StatsRoute() {
  const {
    progress,
    exportProgress,
    exportAnkiCSV,
    importProgress,
    calculateWeekProgress,
    calculateOverallProgress,
    xp,
    level,
  } = useCourseProgress();

  const { totalCheckpoints, globalPct } = calculateOverallProgress();

  const perWeekPct = useMemo(() => {
    const map: Record<string, number> = {};
    WEEKS.forEach((w) => {
      map[w.id] = calculateWeekProgress(w.id).pct;
    });
    return map;
  }, [progress.completedCheckpoints, progress.assignments, calculateWeekProgress]);

  return (
    <StatsView
      weeks={WEEKS}
      completedCheckpoints={progress.completedCheckpoints}
      assignments={progress.assignments}
      perWeekPct={perWeekPct}
      totalCheckpoints={totalCheckpoints - WEEKS.length}
      vocabCount={progress.vocabBank.length}
      globalPct={globalPct}
      xp={xp}
      level={level}
      onExport={exportProgress}
      onExportAnkiCSV={exportAnkiCSV}
      onImport={importProgress}
    />
  );
}
