import { createFileRoute, Link, useNavigate, Navigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { TRACKS, COURSE_TITLE } from "@/data/course";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { WeekView } from "@/components/course/WeekView";
import { AppHeader } from "@/components/course/AppHeader";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";

export const Route = createFileRoute("/$trackId/week/$weekId")({
  component: WeekRoute,
});

function WeekRoute() {
  const { trackId, weekId } = Route.useParams();
  const navigate = useNavigate();

  const track = useMemo(() => TRACKS.find((t) => t.id === trackId) ?? null, [trackId]);
  const activeWeek = useMemo(
    () => track?.weeks.find((w) => w.id === weekId) ?? null,
    [track, weekId],
  );

  const {
    progress,
    hydrated,
    toggleCheckpoint,
    setCheckpointScore,
    setAssignment,
    setNote,
    addVocab,
    calculateOverallProgress,
    calculateWeekProgress,
  } = useCourseProgress();

  const { globalPct } = calculateOverallProgress(trackId);

  if (!hydrated) return null;

  if (!activeWeek) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
        <h1 className="text-2xl font-bold">Week not found</h1>
        <Button className="mt-4" onClick={() => navigate({ to: "/" })}>
          Return Home
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <AppHeader title={COURSE_TITLE} progressPct={globalPct} />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 pt-4 sm:px-6">
          <Link
            to={`/${trackId}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Syllabus
          </Link>
        </div>
        <WeekView
          week={activeWeek}
          completedCheckpoints={progress.completedCheckpoints}
          checkpointScores={progress.checkpointScores}
          assignment={progress.assignments[activeWeek.id] ?? { answers: "", submitted: false }}
          note={progress.notes[activeWeek.id] ?? ""}
          weekProgress={calculateWeekProgress(trackId, activeWeek.id)}
          onToggleCheckpoint={toggleCheckpoint}
          onSetCheckpointScore={setCheckpointScore}
          onSetAssignment={(patch) => setAssignment(activeWeek.id, patch)}
          onSetNote={(v) => setNote(activeWeek.id, v)}
          onAddVocab={addVocab}
        />
      </main>
    </div>
  );
}
