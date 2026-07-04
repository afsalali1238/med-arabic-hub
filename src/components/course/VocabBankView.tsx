import { useState } from "react";
import { Bookmark, Plus, Trash2 } from "lucide-react";
import type { CourseStore } from "@/hooks/useCourseState";

export function VocabBankView({ store }: { store: CourseStore }) {
  const [english, setEnglish] = useState("");
  const [arabic, setArabic] = useState("");
  const [translit, setTranslit] = useState("");
  const items = store.state.vocabBank;

  const add = () => {
    if (!english.trim() && !arabic.trim()) return;
    store.addVocab({
      english: english.trim(),
      arabic: arabic.trim(),
      translit: translit.trim(),
    });
    setEnglish("");
    setArabic("");
    setTranslit("");
  };

  return (
    <div className="animate-slide-up space-y-4">
      <div>
        <h2 className="text-xl font-extrabold text-foreground">Vocab Bank</h2>
        <p className="text-sm text-muted-foreground">
          Save clinical phrases to review anytime.
        </p>
      </div>

      <div className="space-y-2 rounded-2xl border border-border bg-card p-4 shadow-sm">
        <input
          value={english}
          onChange={(e) => setEnglish(e.target.value)}
          placeholder="English phrase"
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <input
          value={arabic}
          onChange={(e) => setArabic(e.target.value)}
          dir="rtl"
          lang="ar"
          placeholder="النص العربي"
          className="font-arabic w-full rounded-lg border border-input bg-background px-3 py-2 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <input
          value={translit}
          onChange={(e) => setTranslit(e.target.value)}
          placeholder="Transliteration"
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm italic outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <button
          type="button"
          onClick={add}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary py-2.5 text-sm font-bold text-primary-foreground transition-transform active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" /> Add phrase
        </button>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border bg-muted/30 py-12 text-center">
          <Bookmark className="h-8 w-8 text-muted-foreground/50" />
          <p className="text-sm font-medium text-muted-foreground">
            No saved phrases yet
          </p>
          <p className="text-xs text-muted-foreground">
            Tap ＋ on any vocabulary card in a week to save it here.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((v) => (
            <div
              key={v.id}
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-3"
            >
              <div className="min-w-0 flex-1">
                {v.english && (
                  <p className="text-sm font-semibold text-foreground">
                    {v.english}
                  </p>
                )}
                {v.arabic && (
                  <p
                    dir="rtl"
                    lang="ar"
                    className="font-arabic text-lg leading-relaxed text-foreground"
                  >
                    {v.arabic}
                  </p>
                )}
                {v.translit && (
                  <p className="text-xs italic text-muted-foreground">
                    {v.translit}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => store.removeVocab(v.id)}
                aria-label="Delete phrase"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
