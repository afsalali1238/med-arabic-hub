import { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onPass: (score: number) => void;
  vocabRows: string[][]; // [English, Arabic, Transliteration]
  numQuestions?: number;
  passThreshold?: number;
  isReviewMode?: boolean;
}

interface Question {
  english: string;
  correctArabic: string;
  correctTransliteration: string;
  options: { arabic: string; transliteration: string }[];
}

export function QuizModal({
  isOpen,
  onClose,
  onPass,
  vocabRows,
  numQuestions = 3,
  passThreshold = 0.8,
  isReviewMode = false,
}: Props) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Generate quiz
      const validRows = vocabRows.filter((r) => r.length >= 3);
      if (validRows.length === 0) {
        setIsFinished(true);
        return;
      }

      const shuffled = [...validRows].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, Math.min(numQuestions, shuffled.length));

      const generatedQuestions = selected.map((row) => {
        const correct = { arabic: row[1], transliteration: row[2] };

        // Pick 3 distractors
        const distractors = validRows
          .filter((r) => r[0] !== row[0])
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map((r) => ({ arabic: r[1], transliteration: r[2] }));

        const options = [correct, ...distractors].sort(() => 0.5 - Math.random());

        return {
          english: row[0],
          correctArabic: row[1],
          correctTransliteration: row[2],
          options,
        };
      });

      setQuestions(generatedQuestions);
      setCurrentIndex(0);
      setSelectedAnswer(null);
      setIsChecking(false);
      setScore(0);
      setIsFinished(false);
    }
  }, [isOpen, vocabRows, numQuestions]);

  const handleSelect = (index: number) => {
    if (isChecking) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setIsChecking(true);
    const q = questions[currentIndex];
    const chosen = q.options[selectedAnswer];
    if (chosen.arabic === q.correctArabic) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((c) => c + 1);
      setSelectedAnswer(null);
      setIsChecking(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleFinish = () => {
    const finalScore = score / questions.length;
    if (finalScore >= passThreshold) {
      onPass(finalScore);
    }
    onClose();
  };

  if (!isOpen) return null;

  if (isFinished || questions.length === 0) {
    const finalScore = questions.length > 0 ? score / questions.length : 0;
    const passed = finalScore >= passThreshold;
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Quiz Results</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8">
            <div
              className={`text-5xl font-black mb-4 ${passed ? "text-emerald-500" : "text-rose-500"}`}
            >
              {Math.round(finalScore * 100)}%
            </div>
            <p className="text-muted-foreground text-center">
              {passed
                ? isReviewMode
                  ? "Great job! You've completed the review."
                  : "Great job! You've passed the quiz."
                : `You need at least ${Math.round(passThreshold * 100)}% to pass. Try reviewing the vocabulary and retake the quiz.`}
            </p>
          </div>
          <DialogFooter>
            <Button className="w-full" onClick={handleFinish}>
              {passed ? "Continue" : "Close"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  const q = questions[currentIndex];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Vocabulary Quiz</DialogTitle>
          <DialogDescription>
            Question {currentIndex + 1} of {questions.length}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-medium text-muted-foreground mb-1">Translate this term</h3>
            <p className="text-2xl font-bold">{q.english}</p>
          </div>

          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = isChecking && opt.arabic === q.correctArabic;
              const isWrong = isChecking && isSelected && opt.arabic !== q.correctArabic;

              let btnClass = "border-border hover:border-primary/50 bg-card text-foreground";
              if (isSelected && !isChecking)
                btnClass = "border-primary ring-1 ring-primary bg-primary/10";
              if (isCorrect)
                btnClass =
                  "border-emerald-500 bg-emerald-500/20 text-emerald-700 dark:text-emerald-400";
              if (isWrong)
                btnClass = "border-rose-500 bg-rose-500/20 text-rose-700 dark:text-rose-400";

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`w-full flex flex-col items-center p-4 rounded-xl border-2 transition-all ${btnClass}`}
                  disabled={isChecking}
                >
                  <span className="font-arabic text-xl mb-1">
                    {opt.arabic || opt.transliteration}
                  </span>
                  {opt.arabic && <span className="text-sm opacity-80">{opt.transliteration}</span>}
                </button>
              );
            })}
          </div>
        </div>

        <DialogFooter>
          {!isChecking ? (
            <Button className="w-full" disabled={selectedAnswer === null} onClick={handleCheck}>
              Check Answer
            </Button>
          ) : (
            <Button className="w-full" onClick={handleNext}>
              {currentIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
