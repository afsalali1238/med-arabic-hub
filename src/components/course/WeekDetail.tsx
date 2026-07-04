import {
  ArrowLeft,
  Check,
  FileText,
  Headphones,
  Plus,
  Video,
} from "lucide-react";
import type { Resource, ResourceType, Week } from "@/data/course";
import type { CourseStore } from "@/hooks/useCourseState";
import { cn } from "@/lib/utils";
import { ScenarioCard } from "./ScenarioCard";

const RESOURCE_ICON: Record<ResourceType, typeof Video> = {
  video: Video,
  audio: Headphones,
  docs: FileText,
};

function playTick() {
  if (typeof window === "undefined") return;
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 660;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.14);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch {
    /* audio not available */
  }
}

function TaskRow({
  taskId,
  store,
  label,
  meta,
  href,
  Icon,
}: {
  taskId: string;
  store: CourseStore;
  label: string;
  meta?: string;
  href?: string;
  Icon?: typeof Video;
}) {
  const done = store.isTaskDone(taskId);

  const toggle = () => {
    if (!done) playTick();
    store.toggleTask(taskId);
  };

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
      <button
        type="button"
        onClick={toggle}
        aria-label={done ? "Mark incomplete" : "Mark complete"}
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
          done
            ? "animate-pop border-teal bg-teal text-teal-foreground"
            : "border-muted-foreground/40 text-transparent hover:border-primary",
        )}
      >
        <Check className="h-4 w-4" strokeWidth={3} />
      </button>

      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "text-sm font-medium leading-snug text-foreground",
            done && "text-muted-foreground line-through",
          )}
        >
          {label}
        </p>
        {meta && (
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            {meta}
          </p>
        )}
      </div>

      {href && Icon && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors hover:bg-primary/20"
        >
          <Icon className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}

export function WeekDetail({
  week,
  store,
  onBack,
  onSolved,
}: {
  week: Week;
  store: CourseStore;
  onBack: () => void;
  onSolved: () => void;
}) {
  return (
    <div className="animate-slide-up space-y-6">
      <div>
        <button
          type="button"
          onClick={onBack}
          className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Syllabus
        </button>
        <span className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
          Week {week.id}
        </span>
        <h2 className="text-xl font-extrabold leading-tight text-foreground">
          {week.title}
        </h2>
        <p className="mt-0.5 text-sm font-medium text-teal">{week.subtitle}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {week.overview}
        </p>
        <p className="mt-2 rounded-lg bg-secondary/60 px-3 py-2 text-xs font-medium text-muted-foreground">
          ⏱ {week.timeAllocation}
        </p>
      </div>

      {/* Vocabulary */}
      <section>
        <h3 className="mb-2 text-sm font-bold text-foreground">
          Core Vocabulary
        </h3>
        <div className="space-y-2">
          {week.vocab.map((v) => {
            const saved = store.hasVocab(v.english, v.arabic);
            return (
              <div
                key={`${v.english}-${v.arabic}`}
                className="rounded-xl border border-border bg-card p-3"
              >
                <div className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wide text-teal">
                      {v.category}
                    </span>
                    <p className="text-sm font-semibold text-foreground">
                      {v.english}
                    </p>
                    <p
                      dir="rtl"
                      lang="ar"
                      className="font-arabic text-lg leading-relaxed text-foreground"
                    >
                      {v.arabic}
                    </p>
                    <p className="text-xs italic text-muted-foreground">
                      {v.translit}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {v.context}
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={saved}
                    onClick={() =>
                      store.addVocab({
                        english: v.english,
                        arabic: v.arabic,
                        translit: v.translit,
                      })
                    }
                    aria-label="Save to vocab bank"
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                      saved
                        ? "bg-teal/20 text-teal"
                        : "bg-primary/10 text-primary hover:bg-primary/20",
                    )}
                  >
                    {saved ? (
                      <Check className="h-4 w-4" strokeWidth={3} />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Resources */}
      <section>
        <h3 className="mb-2 text-sm font-bold text-foreground">
          Learning Resources
        </h3>
        <div className="space-y-2">
          {week.resources.map((r: Resource, i) => (
            <TaskRow
              key={r.url + i}
              taskId={`w${week.id}-res-${i}`}
              store={store}
              label={r.label}
              meta={r.type}
              href={r.url}
              Icon={RESOURCE_ICON[r.type]}
            />
          ))}
        </div>
      </section>

      {/* Checkpoints */}
      <section>
        <h3 className="mb-2 text-sm font-bold text-foreground">
          Progress Checkpoints
        </h3>
        <div className="space-y-2">
          {week.checkpoints.map((c, i) => (
            <TaskRow
              key={i}
              taskId={`w${week.id}-check-${i}`}
              store={store}
              label={c}
            />
          ))}
        </div>
      </section>

      <ScenarioCard week={week} store={store} onSolved={onSolved} />
    </div>
  );
}
