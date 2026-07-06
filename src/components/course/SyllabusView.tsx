import { ChevronRight, Lock, Check, Eye, Award, ExternalLink } from "lucide-react";
import type { Week } from "@/data/course";
import { CAPSTONE } from "@/data/course";
import { cn } from "@/lib/utils";
import { Link, useParams } from "@tanstack/react-router";

interface Props {
  weeks: Week[];
  perWeekPct: Record<string, number>;
}

export function SyllabusView({ weeks, perWeekPct }: Props) {
  const { trackId } = useParams({ strict: false });
  // A week is unlocked for full progress tracking if it's the first, or if the previous week is 100% complete
  const isUnlocked = (index: number): boolean => {
    if (index === 0) return true;
    const prev = weeks[index - 1];
    return (perWeekPct[prev.id] ?? 0) === 100;
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-5">
        <h2 className="text-xl font-bold sm:text-2xl">8-Week Syllabus</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Complete each week's scenario to unlock full tracking, or preview upcoming weeks.
        </p>
      </div>

      <ol className="space-y-2.5">
        {weeks.map((week, index) => {
          const unlocked = isUnlocked(index);
          const pct = perWeekPct[week.id] ?? 0;
          const done = pct === 100;

          return (
            <li key={week.id}>
              <Link
                to={`/${trackId}/week/$weekId`}
                params={{ weekId: week.id, trackId: trackId as string }}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-all sm:gap-4 sm:p-4",
                  unlocked
                    ? "border-border bg-card hover:border-primary/40 hover:shadow-sm active:scale-[0.99]"
                    : "border-dashed border-border/60 bg-muted/30 hover:bg-muted/50 active:scale-[0.99]",
                )}
                aria-label={`Week ${week.number}: ${week.title}${unlocked ? "" : " (preview)"}`}
              >
                {/* Number / lock / check circle */}
                <div
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold sm:h-12 sm:w-12",
                    done
                      ? "bg-emerald-500 text-white"
                      : unlocked
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  {done ? (
                    <Check className="h-5 w-5" strokeWidth={3} />
                  ) : unlocked ? (
                    week.number
                  ) : (
                    <Lock className="h-4 w-4" />
                  )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Week {week.number}
                    </span>
                    {done && (
                      <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                        Complete
                      </span>
                    )}
                    {!unlocked && (
                      <span className="inline-flex items-center gap-1 rounded bg-muted-foreground/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase text-muted-foreground">
                        <Eye className="h-3 w-3" /> Preview
                      </span>
                    )}
                  </div>
                  <h3 className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug sm:text-[15px]">
                    {week.title}
                  </h3>
                  {unlocked ? (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-teal-500 transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="shrink-0 text-[11px] font-medium tabular-nums text-muted-foreground">
                        {pct}%
                      </span>
                    </div>
                  ) : (
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      Finish Week {week.number - 1} to unlock tracking
                    </p>
                  )}
                </div>

                <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          );
        })}
      </ol>

      {CAPSTONE && (
        <div className="mt-6">
          <div className="group flex w-full flex-col gap-3 rounded-2xl border border-amber-500/30 bg-amber-50/50 p-4 text-left dark:bg-amber-500/10 sm:gap-4 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 sm:h-12 sm:w-12">
                <Award className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-600/80 dark:text-amber-400/80">
                  Final Challenge
                </span>
                <h3 className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug text-amber-900 dark:text-amber-100 sm:text-[15px]">
                  {CAPSTONE.title}
                </h3>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-amber-800/80 dark:text-amber-200/80">
              {CAPSTONE.description}
            </p>
          </div>
        </div>
      )}
      <div className="mt-12 pt-8 border-t border-border/50">
        <h2 className="text-xl font-bold sm:text-2xl mb-1">The Provia Ecosystem</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Explore more tools designed to help you succeed in UAE healthcare.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <a
            href="https://med-arabic-hub.lovable.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-2 rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                Medical Arabic (PT)
              </h3>
              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <p className="text-xs text-muted-foreground">
              Conversational Medical Arabic tailored specifically for Physiotherapists.
            </p>
          </a>

          <a
            href="https://proviacv.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-2 rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                Provia CV
              </h3>
              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <p className="text-xs text-muted-foreground">
              Free AI-powered CV audit, rewriter, and JD match for UAE healthcare.
            </p>
          </a>

          <a
            href="https://proviaap.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-2 rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                ProviaPrep
              </h3>
              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <p className="text-xs text-muted-foreground">
              Gamified 45-day exam prep to master DHA, MOH, and DOH licensing.
            </p>
          </a>

          <a
            href="https://proviapath.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-2 rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                Credential Navigator
              </h3>
              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <p className="text-xs text-muted-foreground">
              Know exactly what documents, fees, and steps you need to get licensed.
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
