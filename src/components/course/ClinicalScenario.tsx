import { useState } from "react";
import { CheckCircle2, ChevronDown, Save, Send } from "lucide-react";
import { toast } from "sonner";
import type { Scenario } from "@/data/course";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { SpeakButton } from "./SpeakButton";
import { fuzzyMatchArabic } from "@/lib/arabic-utils";

interface Props {
  scenario: Scenario;
  answers: string;
  submitted: boolean;
  selfScore?: string;
  onChangeAnswers: (v: string) => void;
  onSaveDraft: () => void;
  onSubmit: () => void;
  onSelfScoreChange?: (score: string) => void;
}

export function ClinicalScenario({
  scenario,
  answers,
  submitted,
  selfScore = "",
  onChangeAnswers,
  onSaveDraft,
  onSubmit,
  onSelfScoreChange,
}: Props) {
  const [drawerOpen, setDrawerOpen] = useState(submitted);

  const handleSave = () => {
    onSaveDraft();
    toast.success("Draft saved to your device.");
  };

  const handleSubmit = () => {
    if (!answers.trim()) {
      toast.error("Write your consultation before submitting.");
      return;
    }
    
    // Auto-grade using fuzzy matching
    if (fuzzyMatchArabic(answers, scenario.answerKey.arabic)) {
      if (onSelfScoreChange) onSelfScoreChange("nailed-it");
      toast.success("Perfect match! Excellent work.");
    } else {
      toast.success("Consultation submitted — review the answer key below.");
    }
    
    onSubmit();
    setDrawerOpen(true);
  };

  const wordCount = answers.trim() ? answers.trim().split(/\s+/).length : 0;

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Patient Scenario
          </span>
          {submitted && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Completed
            </span>
          )}
        </div>
        <p className="mb-4 text-[15px] leading-relaxed text-foreground">{scenario.patient}</p>
        <div className="rounded-lg border border-border bg-muted/40 p-4">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Instructions
          </div>
          <p className="text-sm leading-relaxed text-foreground">{scenario.instructions}</p>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <label className="block text-sm font-medium text-foreground">Your Consultation</label>
          <span className="text-xs text-muted-foreground">{wordCount} words</span>
        </div>
        <Textarea
          value={answers}
          onChange={(e) => onChangeAnswers(e.target.value)}
          placeholder="Type your Arabic response and transliteration here..."
          className="min-h-[180px] resize-y font-sans text-[15px] leading-relaxed"
          dir="auto"
          disabled={submitted}
        />
        {!submitted && (
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="outline" onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Save Draft
            </Button>
            <Button onClick={handleSubmit} className="gap-2">
              <Send className="h-4 w-4" />
              Submit Consultation
            </Button>
          </div>
        )}
        {submitted && (
          <div className="mt-4 flex justify-end">
            <Button variant="ghost" onClick={() => setDrawerOpen((o) => !o)} className="gap-2">
              <ChevronDown
                className={cn("h-4 w-4 transition-transform", drawerOpen && "rotate-180")}
              />
              {drawerOpen ? "Hide" : "Show"} answer key
            </Button>
          </div>
        )}
      </div>

      {/* Hidden Review Drawer */}
      <div
        className={cn(
          "grid overflow-hidden transition-all duration-500 ease-out",
          submitted && drawerOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0">
          <div className="border-t border-border bg-gradient-to-br from-primary/5 to-transparent p-6">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-1 w-8 rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Side-by-Side Review
              </span>
            </div>

            <div className="mb-8 grid gap-6 md:grid-cols-2">
              {/* Left Column: User's Answer */}
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Your Submission
                </div>
                <div
                  className="rounded-lg border border-border bg-background p-4 text-[15px] leading-relaxed text-foreground min-h-[120px] whitespace-pre-wrap"
                  dir="auto"
                >
                  {answers}
                </div>
              </div>

              {/* Right Column: Model Answer */}
              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Model Arabic Answer
                    </span>
                    {scenario.answerKey.arabic && (
                      <SpeakButton
                        text={scenario.answerKey.arabic}
                        fallbackText={scenario.answerKey.transliteration}
                      />
                    )}
                  </div>
                  <p
                    dir="rtl"
                    className="rounded-lg border border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/50 dark:bg-emerald-900/10 p-4 text-right font-arabic text-xl leading-loose text-foreground"
                  >
                    {scenario.answerKey.arabic}
                  </p>
                </div>

                <div>
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Transliteration
                  </div>
                  <p className="rounded-lg border border-border bg-background p-4 font-mono text-sm italic leading-relaxed text-foreground">
                    {scenario.answerKey.transliteration}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Clinical Rationale
              </div>
              <p className="rounded-lg border border-border bg-background p-4 text-sm leading-relaxed text-foreground">
                {scenario.answerKey.rationale}
              </p>
            </div>

            {/* Self-Assessment */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-foreground">Self-Assessment</h4>
                <p className="text-xs text-muted-foreground">
                  How close was your response to the model answer?
                </p>
              </div>
              <RadioGroup
                value={selfScore}
                onValueChange={onSelfScoreChange}
                className="flex flex-col gap-3 sm:flex-row sm:gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="needs-work" id="r1" />
                  <Label htmlFor="r1" className="cursor-pointer">
                    Needs Work
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="close" id="r2" />
                  <Label htmlFor="r2" className="cursor-pointer">
                    Close enough
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nailed-it" id="r3" />
                  <Label
                    htmlFor="r3"
                    className="cursor-pointer font-medium text-emerald-600 dark:text-emerald-400"
                  >
                    Nailed it
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
