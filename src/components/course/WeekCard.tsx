import { CheckCircle2, ChevronRight, Lock } from "lucide-react";
import type { Week } from "@/data/course";
import { WEEKS, XP_PER_SCENARIO, XP_PER_TASK } from "@/data/course";
import type { CourseStore } from "@/hooks/useCourseState";
import { cn } from "@/lib/utils";

function weekTaskIds(week: Week) {
  const ids: string[] = [];
  week.resources.forEach((_, i) => ids.push(`w${week.id}-res-${i}`));
  week.checkpoints.forEach((_, i) => ids.push(`w${week.id}-check-${i}`));
  ids.push(`w${week.id}-scenario`);
  return ids;
}

export function WeekCard({
  week,
  store,
  onOpen,
}: {
  week: Week;
  store: CourseStore;
  onOpen: () => void;
}) {
  const unlocked = store.state.unlockedWeeks.includes(week.id);
  const ids = weekTaskIds(week);
  const done = ids.filter((id) => store.isTaskDone(id)).length;
  const pct = Math.round((done / ids.length) * 100);
  const completed = done === ids.length;
  const availableXp =
    week.resources.length * XP_PER_TASK +
    week.checkpoints.length * XP_PER_TASK +
    XP_PER_SCENARIO;

  return (
    <button
      type="button"
      disabled={!unlocked}
      onClick={onOpen}
      className={cn(
        "group flex w-full items-center gap-4 rounded-2xl border p-4 text-left shadow-sm transition-all",
        unlocked
          ? "border-border bg-card hover:shadow-md active:scale-[0.99]"
          : "cursor-not-allowed border-dashed border-border bg-muted/40",
      )}
    >
      <div
        className={cn(
          "relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-bold",
          completed
            ? "bg-teal/20 text-teal"
            : unlocked
              ? "bg-primary/10 text-primary"
              : "bg-muted text-muted-foreground",
        )}
      >
        {!unlocked ? (
          <Lock className="h-5 w-5" />
        ) : completed ? (
          <CheckCircle2 className="h-6 w-6" />
        ) : (
          <span className="text-base">{week.id}</span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
            Week {week.id}
          </span>
          {unlocked && (
            <span className="text-[11px] font-semibold text-primary">
              +{availableXp} XP
            </span>
          )}
        </div>
        <h3 className="truncate text-sm font-bold text-foreground">
          {week.title}
        </h3>
        {unlocked ? (
          <div className="mt-2 flex items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-teal transition-[width] duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-[11px] font-semibold text-muted-foreground">
              {pct}%
            </span>
          </div>
        ) : (
          <p className="mt-1 truncate text-xs text-muted-foreground">
            Finish Week {week.id - 1} to unlock
          </p>
        )}
      </div>

      {unlocked && (
        <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      )}
    </button>
  );
}

export { weekTaskIds, WEEKS };
