import { Zap } from "lucide-react";
import { COURSE_TITLE } from "@/data/course";
import type { CourseStore } from "@/hooks/useCourseState";

export function AppBar({ store }: { store: CourseStore }) {
  const { state, level } = store;
  const next = level.next;
  const span = next ? next.min - level.min : 1;
  const into = state.xp - level.min;
  const pct = next ? Math.min(100, Math.round((into / span) * 100)) : 100;

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-border bg-card/90 backdrop-blur">
      <div className="mx-auto flex max-w-xl flex-col gap-1.5 px-4 py-3">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="min-w-0">
            <h1 className="truncate text-sm font-extrabold tracking-tight text-foreground">
              {COURSE_TITLE}
            </h1>
            <p className="truncate text-xs font-medium text-muted-foreground">
              Level {level.level} · {level.title}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5">
            <Zap
              key={state.xp}
              className="h-4 w-4 animate-pop fill-teal text-teal"
            />
            <span className="text-sm font-bold text-primary">{state.xp}</span>
            <span className="text-[10px] font-semibold uppercase text-muted-foreground">
              XP
            </span>
          </div>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-teal transition-[width] duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </header>
  );
}
