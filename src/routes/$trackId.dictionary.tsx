import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { WEEKS } from "@/data/course";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { SpeakButton } from "@/components/course/SpeakButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Bookmark, BookmarkCheck, BookOpen } from "lucide-react";

export const Route = createFileRoute("/dictionary")({
  component: DictionaryRoute,
});

interface DictionaryEntry {
  english: string;
  arabic: string;
  transliteration: string;
  context?: string;
  weekNumber: number;
  weekTitle: string;
}

function DictionaryRoute() {
  const { progress, addVocab, removeVocab } = useCourseProgress();
  const [search, setSearch] = useState("");
  const [selectedWeek, setSelectedWeek] = useState<number | "all">("all");

  // Aggregate all words across all weeks
  const dictionaryEntries = useMemo(() => {
    const entries: DictionaryEntry[] = [];
    WEEKS.forEach((w) => {
      w.vocabTables.forEach((table) => {
        table.rows.forEach((row) => {
          // Avoid duplicate English/Arabic pairs within the dictionary
          const isDup = entries.some((e) => e.english === row[0] && e.arabic === row[1]);
          if (!isDup && row[0] && row[1]) {
            entries.push({
              english: row[0],
              arabic: row[1],
              transliteration: row[2] || "",
              context: row[3] || undefined,
              weekNumber: w.number,
              weekTitle: w.title,
            });
          }
        });
      });
    });
    return entries;
  }, []);

  // Filter based on search query and selected week
  const filteredEntries = useMemo(() => {
    let result = dictionaryEntries;

    if (selectedWeek !== "all") {
      result = result.filter((e) => e.weekNumber === selectedWeek);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.english.toLowerCase().includes(q) ||
          e.arabic.includes(q) ||
          e.transliteration.toLowerCase().includes(q) ||
          (e.context && e.context.toLowerCase().includes(q)),
      );
    }

    return result;
  }, [dictionaryEntries, search, selectedWeek]);

  // Check if a dictionary entry is saved in Vocab Bank
  const getSavedEntry = (entry: DictionaryEntry) => {
    return progress.vocabBank.find(
      (v) => v.arabic === entry.arabic && v.transliteration === entry.transliteration,
    );
  };

  const handleToggleVocab = (entry: DictionaryEntry) => {
    const saved = getSavedEntry(entry);
    if (saved) {
      removeVocab(saved.id);
    } else {
      addVocab({
        arabic: entry.arabic,
        transliteration: entry.transliteration,
        note: entry.context,
        english: entry.english,
      });
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold sm:text-2xl flex items-center gap-2">
          Clinical Dictionary
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Quickly search and bookmark terminology from all 12 weeks of the curriculum.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9 h-11 text-base bg-card border-border/80 focus-visible:ring-primary/20"
            placeholder="Search English, Arabic, or transliteration..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Week filter pills */}
        <div className="flex flex-wrap gap-1.5 pb-2 overflow-x-auto scrollbar-none max-w-full">
          <Button
            variant={selectedWeek === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedWeek("all")}
            className="h-8 text-xs rounded-full"
          >
            All Weeks
          </Button>
          {WEEKS.map((w) => (
            <Button
              key={w.id}
              variant={selectedWeek === w.number ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedWeek(w.number)}
              className="h-8 text-xs rounded-full whitespace-nowrap"
            >
              W{w.number}: {w.title.split(",")[0].split("&")[0].trim()}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-xs text-muted-foreground mb-4">
        Showing {filteredEntries.length} of {dictionaryEntries.length} terms
      </div>

      {/* Dictionary List */}
      {filteredEntries.length > 0 ? (
        <ul className="grid gap-3 sm:grid-cols-2">
          {filteredEntries.map((e, index) => {
            const saved = getSavedEntry(e);
            return (
              <li
                key={`${e.english}-${index}`}
                className="group relative flex flex-col justify-between rounded-xl border border-border/60 bg-card p-4 transition-all hover:border-primary/40 hover:shadow-sm"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground mb-1.5">
                        Week {e.weekNumber}
                      </span>
                      <p
                        className="text-base font-semibold text-foreground leading-tight truncate"
                        title={e.english}
                      >
                        {e.english}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 -mr-2 -mt-2 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleVocab(e)}
                        className="h-8 w-8 text-muted-foreground hover:text-primary rounded-full"
                        title={saved ? "Remove from Vocab Bank" : "Add to Vocab Bank"}
                      >
                        {saved ? (
                          <BookmarkCheck className="h-4 w-4 text-primary fill-primary" />
                        ) : (
                          <Bookmark className="h-4 w-4" />
                        )}
                      </Button>
                      <SpeakButton
                        text={e.arabic}
                        fallbackText={e.transliteration}
                        className="h-8 w-8 rounded-full"
                      />
                    </div>
                  </div>

                  <p
                    dir="rtl"
                    className="mt-3 font-arabic text-xl sm:text-2xl text-primary font-bold"
                  >
                    {e.arabic}
                  </p>
                  <p className="mt-1 font-mono text-sm text-foreground/80">{e.transliteration}</p>

                  {e.context && (
                    <p className="mt-2 text-xs text-muted-foreground border-t border-border/45 pt-2 leading-relaxed">
                      {e.context}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="text-center py-12 bg-card rounded-2xl border border-border">
          <BookOpen className="h-10 w-10 text-muted-foreground/60 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-foreground">No matches found</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">
            Try checking spelling or changing the week filter pill.
          </p>
        </div>
      )}
    </div>
  );
}
