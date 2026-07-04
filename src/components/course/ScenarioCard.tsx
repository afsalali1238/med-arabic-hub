import { useState } from "react";
import { ChevronDown, KeyRound } from "lucide-react";
import type { Week } from "@/data/course";
import { XP_PER_SCENARIO } from "@/data/course";
import type { CourseStore } from "@/hooks/useCourseState";
import { cn } from "@/lib/utils";

export function ScenarioCard({
  week,
  store,
  onSolved,
}: {
  week: Week;
  store: CourseStore;
  onSolved: () => void;
}) {
  const submitId = `w${week.id}-scenario`;
  const submitted = store.isTaskDone(submitId);
  const [draft, setDraft] = useState(store.state.assignments[week.id] ?? "");
  const [open, setOpen] = useState(submitted);
  const a = week.assignment;

  const handleSubmit = () => {
    const first = store.submitScenario(week.id, draft);
    setOpen(true);
    if (first) onSolved();
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-b from-primary/5 to-card shadow-sm">
      <div className="border-b border-primary/15 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-primary">
            Clinical Scenario
          </span>
          <span className="text-[11px] font-semibold text-teal">
            +{XP_PER_SCENARIO} XP
          </span>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div className="rounded-xl bg-secondary/60 p-3">
          <p className="mb-1 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
            Patient Scenario
          </p>
          <p className="text-sm leading-relaxed text-foreground">{a.scenario}</p>
        </div>

        <div>
          <p className="mb-1 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
            Your Task
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {a.instructions}
          </p>
        </div>

        <textarea
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            store.setAssignmentDraft(week.id, e.target.value);
          }}
          dir="auto"
          rows={5}
          placeholder="Write your consultation in Arabic or transliteration…"
          className="w-full resize-y rounded-xl border border-input bg-background p-3 text-base leading-relaxed text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        />

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full rounded-xl bg-gradient-to-r from-primary to-teal py-3.5 text-sm font-bold text-primary-foreground shadow-sm transition-transform active:scale-[0.98]"
        >
          {submitted ? "Resubmit Consultation" : "Submit Consultation"}
        </button>

        {submitted && (
          <div className="overflow-hidden rounded-xl border border-teal/30 bg-teal/5">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="flex w-full items-center justify-between px-4 py-3 text-left"
            >
              <span className="flex items-center gap-2 text-sm font-bold text-foreground">
                <KeyRound className="h-4 w-4 text-teal" />
                Answer Key & Rationale
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform",
                  open && "rotate-180",
                )}
              />
            </button>
            {open && (
              <div className="animate-slide-up space-y-3 px-4 pb-4">
                <div className="rounded-xl bg-card p-3 shadow-sm">
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                    Arabic Script
                  </p>
                  <p
                    dir="rtl"
                    lang="ar"
                    className="font-arabic text-xl leading-loose text-foreground"
                  >
                    {a.answerArabic}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                    Transliteration
                  </p>
                  <p className="text-sm italic leading-relaxed text-foreground">
                    {a.answerTranslit}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                    Rationale
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {a.rationale}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
