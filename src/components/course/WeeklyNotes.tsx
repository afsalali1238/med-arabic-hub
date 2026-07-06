import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export function WeeklyNotes({ value, onChange }: Props) {
  const [local, setLocal] = useState(value);
  const [saved, setSaved] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLocal(value);
  }, [value]);

  useEffect(() => {
    if (local === value) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      onChange(local);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    }, 400);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [local, value, onChange]);

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Jot down dialect differences, tricky phrases, or reflections. Auto-saved to this device.
        </p>
        {saved && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
            <Check className="h-3.5 w-3.5" />
            Saved
          </span>
        )}
      </div>
      <Textarea
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder="e.g., Remember: 'Qabl al-Akl' means before meals, 'Ba'd al-Akl' means after meals..."
        className="min-h-[120px] resize-y"
      />
    </div>
  );
}
