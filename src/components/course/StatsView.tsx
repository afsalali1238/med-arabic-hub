import { BookOpen, Target, Trophy, Award, Download, Upload, RefreshCw, Zap } from "lucide-react";
import type { Week } from "@/data/course";
import { LEVELS } from "@/data/course";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRef, useState, useMemo } from "react";
import { QuizModal } from "./QuizModal";

interface Props {
  weeks: Week[];
  completedCheckpoints: string[];
  assignments: Record<string, { submitted: boolean }>;
  perWeekPct: Record<string, number>;
  totalCheckpoints: number;
  vocabCount: number;
  globalPct?: number;
  xp?: number;
  level?: {
    level: number;
    title: string;
    min: number;
    next: { level: number; title: string; min: number } | null;
  };
  onExport?: () => void;
  onExportAnkiCSV?: () => void;
  onImport?: (file: File) => void;
}

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof Target;
  label: string;
  value: string | number;
  accent?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div
        className={cn(
          "mb-2 flex h-9 w-9 items-center justify-center rounded-full",
          accent ?? "bg-primary/10 text-primary",
        )}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="text-2xl font-bold tabular-nums">{value}</div>
      <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

export function StatsView({
  weeks,
  completedCheckpoints,
  assignments,
  perWeekPct,
  totalCheckpoints,
  vocabCount,
  globalPct,
  xp = 0,
  level = { ...LEVELS[0], next: LEVELS[1] },
  onExport,
  onExportAnkiCSV,
  onImport,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const checkpointsDone = completedCheckpoints.length;
  const weeksComplete = Object.values(perWeekPct).filter((p) => p === 100).length;
  const scenariosSubmitted = Object.values(assignments).filter((a) => a.submitted).length;
  const overallPct =
    globalPct ?? (totalCheckpoints ? Math.round((checkpointsDone / totalCheckpoints) * 100) : 0);

  const completedWeeks = useMemo(() => {
    return weeks.filter((w) => (perWeekPct[w.id] ?? 0) > 0);
  }, [weeks, perWeekPct]);

  const reviewVocabRows = useMemo(() => {
    return completedWeeks.flatMap((w) => w.vocabTables.flatMap((t) => t.rows));
  }, [completedWeeks]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImport) {
      onImport(file);
    }
    // reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
      <h2 className="text-xl font-bold sm:text-2xl">Your Progress</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        A simple view of what you've covered so far.
      </p>

      {/* Overall progress */}
      <div className="mt-5 rounded-2xl border border-border bg-card p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Course completion
          </span>
          <span className="text-sm font-semibold tabular-nums">{overallPct}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              overallPct === 100 ? "bg-emerald-500" : "bg-primary",
            )}
            style={{ width: `${overallPct}%` }}
          />
        </div>
      </div>

      {completedWeeks.length > 1 && reviewVocabRows.length > 0 && (
        <div className="mt-4 rounded-2xl border border-border bg-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold">Cross-Week Review</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Test your knowledge across all the weeks you've started.
            </p>
          </div>
          <Button onClick={() => setIsReviewOpen(true)} className="gap-2 w-full sm:w-auto">
            <RefreshCw className="h-4 w-4" />
            Start Review Quiz
          </Button>
        </div>
      )}

      {/* Grid stats */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          icon={Zap}
          label="Total XP"
          value={xp}
          accent="bg-teal-500/10 text-teal-600 dark:text-teal-400"
        />
        <StatCard
          icon={Trophy}
          label="Weeks Complete"
          value={`${weeksComplete}/${weeks.length}`}
          accent="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        />
        <StatCard
          icon={Target}
          label="Checkpoints"
          value={`${checkpointsDone}/${totalCheckpoints}`}
        />
        <StatCard
          icon={Award}
          label="Scenarios"
          value={`${scenariosSubmitted}/${weeks.length}`}
          accent="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        />
        <StatCard
          icon={BookOpen}
          label="Vocab Saved"
          value={vocabCount}
          accent="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        />
      </div>

      {/* Level Ladder */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold">Level Ladder</h3>
        <div className="space-y-3">
          {LEVELS.map((l) => {
            const reached = xp >= l.min;
            const isCurrent = l.level === level?.level;
            return (
              <div key={l.level} className="flex items-center gap-3 text-sm">
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors",
                    isCurrent
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : reached
                        ? "bg-teal-500/20 text-teal-600 dark:text-teal-400"
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  {l.level}
                </div>
                <span
                  className={cn(
                    "flex-1 font-medium",
                    reached ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {l.title}
                </span>
                <span className="text-xs font-semibold tabular-nums text-muted-foreground">
                  {l.min} XP
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Per-week breakdown */}
      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold">Week-by-week</h3>
        <ul className="space-y-2">
          {weeks.map((w) => {
            const pct = perWeekPct[w.id] ?? 0;
            return (
              <li key={w.id} className="rounded-xl border border-border bg-card p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Week {w.number}
                    </div>
                    <div className="truncate text-sm font-medium">{w.title}</div>
                  </div>
                  <div className="shrink-0 text-[11px] font-medium tabular-nums text-muted-foreground">
                    {pct}%
                  </div>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      pct === 100 ? "bg-emerald-500" : "bg-primary",
                    )}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Data Management */}
      <div className="mt-8 rounded-2xl border border-border bg-card p-5">
        <h3 className="mb-1 text-sm font-semibold">Backup & Export</h3>
        <p className="mb-4 text-xs text-muted-foreground">
          Your progress is stored on this device. Export it to save a backup, or export vocabulary
          to Anki.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={onExport} className="gap-2 flex-1">
            <Download className="h-4 w-4" />
            Backup JSON
          </Button>
          <Button
            variant="outline"
            onClick={onExportAnkiCSV}
            className="gap-2 flex-1 border-primary/20 text-primary hover:bg-primary/5"
          >
            <Download className="h-4 w-4" />
            Export to Anki
          </Button>
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="gap-2 flex-1"
          >
            <Upload className="h-4 w-4" />
            Import JSON
          </Button>
          <input
            type="file"
            accept=".json"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <QuizModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        onPass={() => {}}
        vocabRows={reviewVocabRows}
        numQuestions={10}
        passThreshold={0}
        isReviewMode={true}
      />
    </div>
  );
}
