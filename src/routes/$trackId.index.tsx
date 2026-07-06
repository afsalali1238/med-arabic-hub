import { createFileRoute, useParams } from "@tanstack/react-router";
import { SyllabusView } from "@/components/course/SyllabusView";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { TRACKS } from "@/data/course";
import { useMemo } from "react";
import { Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/$trackId/")({
  component: TrackIndex,
});

function TrackIndex() {
  const { trackId } = Route.useParams();
  const track = TRACKS.find((t) => t.id === trackId);

  const { progress, calculateWeekProgress } = useCourseProgress();

  const perWeekPct = useMemo(() => {
    if (!track) return {};
    const map: Record<string, number> = {};
    track.weeks.forEach((w) => {
      map[w.id] = calculateWeekProgress(track.id, w.id).pct;
    });
    return map;
  }, [progress.completedCheckpoints, progress.assignments, calculateWeekProgress, track]);

  if (!track) {
    return <Navigate to="/" />;
  }

  return <SyllabusView weeks={track.weeks} perWeekPct={perWeekPct} />;
}
