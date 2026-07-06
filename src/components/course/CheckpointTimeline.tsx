import { useState } from "react";
import { Check } from "lucide-react";
import type { Checkpoint } from "@/data/course";
import { cn } from "@/lib/utils";
import { QuizModal } from "./QuizModal";

interface Props {
  checkpoints: Checkpoint[];
  completed: string[];
  checkpointScores: Record<string, { score: number; timestamp: number }>;
  onToggle: (id: string) => void;
  onSaveScore: (id: string, score: number) => void;
  vocabRows: string[][];
}

export function CheckpointTimeline({
  checkpoints,
  completed,
  checkpointScores,
  onToggle,
  onSaveScore,
  vocabRows,
}: Props) {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);

  const handleCheckpointClick = (id: string) => {
    const isDone = completed.includes(id);
    if (isDone) {
      onToggle(id); // Allow un-checking without a quiz
    } else {
      setActiveQuiz(id);
    }
  };

  const handleQuizPass = (score: number) => {
    if (activeQuiz) {
      onToggle(activeQuiz);
      onSaveScore(activeQuiz, score);
      setActiveQuiz(null);
    }
  };
  return (
    <ol className="relative space-y-3 border-l-2 border-border pl-6">
      {checkpoints.map((c) => {
        const isDone = completed.includes(c.id);
        return (
          <li key={c.id} className="relative">
            <span
              className={cn(
                "absolute -left-[33px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors",
                isDone
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : "border-border bg-background",
              )}
            >
              {isDone && <Check className="h-3 w-3" strokeWidth={3} />}
            </span>
            <button
              onClick={() => handleCheckpointClick(c.id)}
              role="checkbox"
              aria-checked={isDone}
              aria-label={`Mark complete: ${c.label}`}
              className={cn(
                "flex w-full items-start gap-3 rounded-lg border border-border bg-card p-4 text-left transition-all hover:border-primary/40",
                isDone && "border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-900/20",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors",
                  isDone ? "border-emerald-500 bg-emerald-500" : "border-input bg-background",
                )}
              >
                {isDone && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
              </span>
              <div className="flex flex-col text-left">
                <span
                  className={cn(
                    "text-sm leading-relaxed transition-colors",
                    isDone ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {c.label}
                </span>
                {isDone && checkpointScores[c.id] && (
                  <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 mt-1">
                    Passed with {Math.round(checkpointScores[c.id].score * 100)}% on{" "}
                    {new Date(checkpointScores[c.id].timestamp).toLocaleDateString()}
                  </span>
                )}
              </div>
            </button>
          </li>
        );
      })}

      {activeQuiz && (
        <QuizModal
          isOpen={!!activeQuiz}
          onClose={() => setActiveQuiz(null)}
          onPass={handleQuizPass}
          vocabRows={vocabRows}
        />
      )}
    </ol>
  );
}
