import { BookOpen, Layers, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export type Tab = "syllabus" | "vocab" | "stats";

const TABS: { id: Tab; label: string; icon: typeof BookOpen }[] = [
  { id: "syllabus", label: "Syllabus", icon: BookOpen },
  { id: "vocab", label: "Vocab Bank", icon: Layers },
  { id: "stats", label: "Stats", icon: TrendingUp },
];

export function BottomNav({
  active,
  onChange,
}: {
  active: Tab;
  onChange: (t: Tab) => void;
}) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-xl items-stretch justify-around px-2 py-1.5">
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={cn(
                "flex flex-1 flex-col items-center gap-0.5 rounded-xl py-2 text-xs font-semibold transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon
                className={cn("h-5 w-5", isActive && "fill-primary/15")}
                strokeWidth={isActive ? 2.4 : 2}
              />
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
