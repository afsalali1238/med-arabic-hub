import { useMemo, useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Search,
  Download,
  Layers,
  List,
  RotateCcw,
  Frown,
  Meh,
  Smile,
  Laugh,
} from "lucide-react";
import type { VocabEntry } from "@/data/course";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SpeakButton } from "./SpeakButton";
import { cn } from "@/lib/utils";

interface Props {
  entries: VocabEntry[];
  onAdd: (entry: Omit<VocabEntry, "id">) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, patch: Partial<VocabEntry>) => void;
  onReview: (id: string, rating: 0 | 1 | 2 | 3) => void;
}

export function VocabBankView({ entries, onAdd, onRemove, onUpdate, onReview }: Props) {
  const [arabic, setArabic] = useState("");
  const [translit, setTranslit] = useState("");
  const [english, setEnglish] = useState("");
  const [note, setNote] = useState("");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "flashcards">("list");

  // Flashcard state
  const [sessionCards, setSessionCards] = useState<VocabEntry[]>([]);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const dueCardsCount = useMemo(() => {
    return entries.filter((e) => !e.nextReviewDate || e.nextReviewDate <= Date.now()).length;
  }, [entries]);

  useEffect(() => {
    if (viewMode === "flashcards") {
      const due = entries.filter((e) => !e.nextReviewDate || e.nextReviewDate <= Date.now());
      setSessionCards(due.sort(() => 0.5 - Math.random()));
      setFlashcardIndex(0);
      setIsFlipped(false);
    }
  }, [viewMode, entries]);

  const submit = () => {
    if (!arabic.trim() && !translit.trim()) return;
    onAdd({
      arabic: arabic.trim(),
      transliteration: translit.trim(),
      english: english.trim(),
      note: note.trim() || undefined,
    });
    setArabic("");
    setTranslit("");
    setEnglish("");
    setNote("");
  };

  const filteredEntries = useMemo(() => {
    if (!search.trim()) return entries;
    const s = search.toLowerCase();
    return entries.filter(
      (e) =>
        (e.arabic && e.arabic.includes(s)) ||
        (e.transliteration && e.transliteration.toLowerCase().includes(s)) ||
        (e.note && e.note.toLowerCase().includes(s)),
    );
  }, [entries, search]);

  const exportCSV = () => {
    if (entries.length === 0) return;
    const header = "Arabic,Transliteration,Note\n";
    const csv = entries
      .map((e) => `"${e.arabic || ""}","${e.transliteration || ""}","${e.note || ""}"`)
      .join("\n");
    const blob = new Blob([header + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "medical_arabic_vocab.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReview = (rating: 0 | 1 | 2 | 3) => {
    const currentCard = sessionCards[flashcardIndex];
    if (!currentCard) return;

    onReview(currentCard.id, rating);
    setIsFlipped(false);

    // Move to next card in session
    if (flashcardIndex < sessionCards.length - 1) {
      setFlashcardIndex((i) => i + 1);
    } else {
      // Session finished, useEffect will re-compute due cards and refresh
      setSessionCards([]);
    }
  };

  const getNextIntervalLabel = (card: VocabEntry, rating: 0 | 1 | 2 | 3) => {
    const repetition = card.repetition || 0;
    const interval = card.interval || 0;
    const efactor = card.efactor || 2.5;

    if (rating === 0 || rating === 1) {
      return "1d";
    }
    if (rating === 2) {
      if (repetition === 0) return "1d";
      if (repetition === 1) return "6d";
      return `${Math.round(interval * efactor)}d`;
    }
    if (rating === 3) {
      if (repetition === 0) return "3d";
      if (repetition === 1) return "8d";
      return `${Math.round(interval * efactor * 1.5)}d`;
    }
    return "1d";
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-4">
        <div>
          <h2 className="text-xl font-bold sm:text-2xl flex items-center gap-2">Vocabulary Bank</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Save Arabic terms to memorize. Stored on this device.
          </p>
        </div>
        {entries.length > 0 && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode((v) => (v === "list" ? "flashcards" : "list"))}
              className="gap-2 relative"
            >
              {viewMode === "list" ? <Layers className="h-4 w-4" /> : <List className="h-4 w-4" />}
              {viewMode === "list" ? "Flashcards" : "List View"}
              {viewMode === "list" && dueCardsCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
                  {dueCardsCount}
                </span>
              )}
            </Button>
            <Button variant="outline" size="sm" onClick={exportCSV} className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        )}
      </div>

      {viewMode === "list" && (
        <div className="mt-5 grid gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Arabic</label>
            <Input
              dir="auto"
              placeholder="e.g. ألم"
              value={arabic}
              onChange={(e) => setArabic(e.target.value)}
              className="font-arabic"
            />
          </div>
          <div className="sm:col-span-1">
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Transliteration
            </label>
            <Input
              placeholder="e.g. alam (pain)"
              value={translit}
              onChange={(e) => setTranslit(e.target.value)}
            />
          </div>
          <div className="sm:col-span-1">
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              English Meaning
            </label>
            <Input
              placeholder="e.g. pain"
              value={english}
              onChange={(e) => setEnglish(e.target.value)}
            />
          </div>
          <div className="sm:col-span-1">
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Note (optional)
            </label>
            <Input
              placeholder="Context or grammar hint"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") submit();
              }}
            />
          </div>
          <div className="mt-2 sm:col-span-2">
            <Button onClick={submit} className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Add Word
            </Button>
          </div>
        </div>
      )}

      {entries.length > 0 && (
        <div className="mt-8">
          {viewMode === "list" ? (
            <>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-9"
                  placeholder="Search vocabulary..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <ul className="grid gap-3 sm:grid-cols-2">
                {filteredEntries.map((e) => (
                  <li
                    key={e.id}
                    className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-sm"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <p dir="auto" className="font-arabic text-xl sm:text-2xl text-foreground">
                          {e.arabic || e.transliteration}
                        </p>
                        <p className="ml-3 font-semibold text-foreground">{e.english}</p>
                        {(e.arabic || e.transliteration) && (
                          <SpeakButton
                            text={e.arabic || e.transliteration}
                            fallbackText={e.transliteration}
                            className="shrink-0 -mr-2 -mt-2"
                          />
                        )}
                      </div>
                      <p className="mt-2 font-mono text-sm text-foreground">{e.transliteration}</p>
                      {e.note && <p className="mt-1.5 text-xs text-muted-foreground">{e.note}</p>}
                    </div>
                    <button
                      onClick={() => onRemove(e.id)}
                      className="absolute bottom-2 right-2 rounded p-1.5 text-muted-foreground opacity-0 transition-opacity hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                      aria-label="Delete word"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            /* Flashcard View */
            <div className="flex flex-col items-center max-w-md mx-auto mt-12">
              {sessionCards.length > 0 ? (
                <>
                  <div
                    className="w-full aspect-[4/3] perspective-1000 cursor-pointer"
                    onClick={() => setIsFlipped(!isFlipped)}
                  >
                    <div
                      className={cn(
                        "relative w-full h-full transition-transform duration-500 transform-style-3d shadow-sm rounded-2xl border border-border bg-card",
                        isFlipped ? "rotate-y-180" : "",
                      )}
                    >
                      {/* Front (Arabic) */}
                      <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-6 text-center">
                        <p
                          dir="auto"
                          className="font-arabic text-3xl sm:text-4xl text-foreground mb-4"
                        >
                          {sessionCards[flashcardIndex].arabic ||
                            sessionCards[flashcardIndex].transliteration}
                        </p>
                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-4">
                          <RotateCcw className="h-3 w-3" /> Click to flip
                        </div>
                      </div>

                      {/* Back (Transliteration/Note) */}
                      <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center p-6 text-center bg-muted/20">
                        <p className="font-mono text-xl sm:text-2xl text-foreground mb-3">
                          {sessionCards[flashcardIndex].transliteration}
                        </p>
                        {sessionCards[flashcardIndex].note && (
                          <p className="text-sm text-muted-foreground border-t border-border/50 pt-3 mt-2 w-full">
                            {sessionCards[flashcardIndex].note}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-4 mt-8 w-full">
                    {isFlipped ? (
                      <div className="flex gap-2 w-full">
                        <Button
                          variant="outline"
                          className="flex-1 flex-col h-auto py-2 border-rose-200 hover:bg-rose-50"
                          onClick={() => handleReview(0)}
                        >
                          <Frown className="h-5 w-5 mb-1 text-rose-500" />
                          <span className="text-xs font-medium text-rose-600">Again</span>
                          <span className="text-[10px] text-muted-foreground">
                            {getNextIntervalLabel(sessionCards[flashcardIndex], 0)}
                          </span>
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 flex-col h-auto py-2 border-amber-200 hover:bg-amber-50"
                          onClick={() => handleReview(1)}
                        >
                          <Meh className="h-5 w-5 mb-1 text-amber-500" />
                          <span className="text-xs font-medium text-amber-600">Hard</span>
                          <span className="text-[10px] text-muted-foreground">
                            {getNextIntervalLabel(sessionCards[flashcardIndex], 1)}
                          </span>
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 flex-col h-auto py-2 border-blue-200 hover:bg-blue-50"
                          onClick={() => handleReview(2)}
                        >
                          <Smile className="h-5 w-5 mb-1 text-blue-500" />
                          <span className="text-xs font-medium text-blue-600">Good</span>
                          <span className="text-[10px] text-muted-foreground">
                            {getNextIntervalLabel(sessionCards[flashcardIndex], 2)}
                          </span>
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 flex-col h-auto py-2 border-emerald-200 hover:bg-emerald-50"
                          onClick={() => handleReview(3)}
                        >
                          <Laugh className="h-5 w-5 mb-1 text-emerald-500" />
                          <span className="text-xs font-medium text-emerald-600">Easy</span>
                          <span className="text-[10px] text-muted-foreground">
                            {getNextIntervalLabel(sessionCards[flashcardIndex], 3)}
                          </span>
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-medium text-muted-foreground">
                          {flashcardIndex + 1} / {sessionCards.length}
                        </span>
                        {(sessionCards[flashcardIndex].arabic ||
                          sessionCards[flashcardIndex].transliteration) && (
                          <SpeakButton
                            text={
                              sessionCards[flashcardIndex].arabic ||
                              sessionCards[flashcardIndex].transliteration
                            }
                            fallbackText={sessionCards[flashcardIndex].transliteration}
                            className="mt-2"
                          />
                        )}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center p-8 bg-card rounded-2xl border border-border w-full">
                  <Smile className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-lg font-bold">All caught up!</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    You have no vocabulary words due for review right now.
                  </p>
                  <Button variant="outline" className="mt-6" onClick={() => setViewMode("list")}>
                    Back to List
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
