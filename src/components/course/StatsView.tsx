import { Award, BookMarked, CheckCircle2, Trophy, Zap } from "lucide-react";
import { LEVELS, WEEKS } from "@/data/course";
import type { CourseStore } from "@/hooks/useCourseState";
import { weekTaskIds } from "./WeekCard";

export function StatsView({ store }: { store: CourseStore }) {
  const { state, level } = store;

  const weeksCompleted = WEEKS.filter((w) =>
    weekTaskIds(w).every((id) => state.completedTasks.includes(id)),
  ).length;
  const scenariosDone = WEEKS.filter((w) =>
    state.completedTasks.includes(`w${w.id}-scenario`),
  ).length;

  const next = level.next;
  const span = next ? next.min - level.min : 1;
  const into = state.xp - level.min;
  const pct = next ? Math.min(100, Math.round((into / span) * 100)) : 100;

  const stats = [
    { icon: Zap, label: "Total XP", value: state.xp },
    { icon: CheckCircle2, label: "Tasks Done", value: state.completedTasks.length },
    { icon: Trophy, label: "Weeks Completed", value: `${weeksCompleted}/8` },
    { icon: Award, label: "Scenarios Solved", value: `${scenariosDone}/8` },
    { icon: BookMarked, label: "Saved Phrases", value: state.vocabBank.length },
  ];

  return (
    <div className="animate-slide-up space-y-5">
      <div>
        <h2 className="text-xl font-extrabold text-foreground">Your Progress</h2>
        <p className="text-sm text-muted-foreground">
          Track your journey through the course.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-teal/10 p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-lg font-extrabold text-primary">
            {level.level}
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
              Current Level
            </p>
            <p className="truncate text-lg font-extrabold text-foreground">
              {level.title}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs font-semibold text-muted-foreground">
            <span>{state.xp} XP</span>
            <span>{next ? `${next.min} XP → ${next.title}` : "Max level"}</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-teal transition-[width] duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-border bg-card p-4 shadow-sm"
          >
            <s.icon className="h-5 w-5 text-teal" />
            <p className="mt-2 text-2xl font-extrabold text-foreground">
              {s.value}
            </p>
            <p className="text-xs font-medium text-muted-foreground">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <h3 className="mb-3 text-sm font-bold text-foreground">Level Ladder</h3>
        <div className="space-y-2">
          {LEVELS.map((l) => {
            const reached = state.xp >= l.min;
            const isCurrent = l.level === level.level;
            return (
              <div
                key={l.level}
                className="flex items-center gap-3 text-sm"
              >
                <div
                  className={
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold " +
                    (isCurrent
                      ? "bg-primary text-primary-foreground"
                      : reached
                        ? "bg-teal/20 text-teal"
                        : "bg-muted text-muted-foreground")
                  }
                >
                  {l.level}
                </div>
                <span
                  className={
                    "flex-1 font-medium " +
                    (reached ? "text-foreground" : "text-muted-foreground")
                  }
                >
                  {l.title}
                </span>
                <span className="text-xs font-semibold text-muted-foreground">
                  {l.min} XP
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
