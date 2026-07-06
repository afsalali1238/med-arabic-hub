import { Bookmark } from "lucide-react";
import type { VocabTable, VocabEntry } from "@/data/course";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SpeakButton } from "./SpeakButton";

interface Props {
  tables: VocabTable[];
  onSaveToVocab: (entry: Omit<VocabEntry, "id">) => void;
}

function looksArabic(text: string) {
  return /[\u0600-\u06FF]/.test(text);
}

export function VocabTables({ tables, onSaveToVocab }: Props) {
  return (
    <div className="space-y-5">
      {tables.map((t, i) => (
        <div key={i} className="overflow-hidden rounded-xl border border-border bg-card">
          {t.caption && (
            <div className="border-b border-border bg-muted/40 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t.caption}
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  {t.headers.map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      {h}
                    </th>
                  ))}
                  <th className="w-10" />
                </tr>
              </thead>
              <tbody>
                {t.rows.map((row, ri) => {
                  const arabicCell = row.find(looksArabic);
                  const transCell = row.slice(1).find((c) => !looksArabic(c) && c !== row[0]);
                  return (
                    <tr
                      key={ri}
                      className="border-b border-border last:border-b-0 hover:bg-muted/20"
                    >
                      {row.map((cell, ci) => {
                        const isArabic = looksArabic(cell);
                        return (
                          <td
                            key={ci}
                            dir={isArabic ? "rtl" : "ltr"}
                            className={
                              isArabic
                                ? "px-4 py-3 text-right font-arabic text-base leading-relaxed text-foreground"
                                : ci === 0
                                  ? "px-4 py-3 font-medium text-foreground"
                                  : "px-4 py-3 text-muted-foreground"
                            }
                          >
                            {isArabic ? (
                              <div className="flex items-center gap-2 justify-end">
                                <span>{cell}</span>
                                <SpeakButton
                                  text={cell}
                                  fallbackText={transCell}
                                  className="opacity-0 transition-opacity [tr:hover_&]:opacity-100 focus:opacity-100"
                                />
                              </div>
                            ) : (
                              cell
                            )}
                          </td>
                        );
                      })}
                      <td className="px-2 py-3 text-right">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 opacity-0 transition-opacity hover:opacity-100 focus:opacity-100 [tr:hover_&]:opacity-100"
                          title="Save to vocab bank"
                          onClick={() => {
                            const arabic = arabicCell ?? "";
                            const transliteration = transCell ?? row[row.length - 1];
                            onSaveToVocab({
                              arabic,
                              transliteration,
                              note: row[0],
                            });
                            toast.success("Added to Vocabulary Bank");
                          }}
                        >
                          <Bookmark className="h-3.5 w-3.5" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
