import { Moon, Sun, Zap } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  progressPct: number;
  levelTitle?: string;
  levelLevel?: number;
  xp?: number;
}

export function AppHeader({ title, progressPct, levelTitle, levelLevel, xp = 0 }: Props) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-2.5">
          <img src="/provia-logo.png" alt="" aria-hidden="true" className="h-7 w-7 shrink-0" />
          <div className="min-w-0">
            <span className="block text-base font-black italic tracking-tighter bg-gradient-to-r from-blue-500 to-emerald-400 bg-clip-text text-transparent sm:text-lg">
              PROVIA
            </span>
            <p className="truncate text-[11px] text-muted-foreground sm:text-xs">
              {levelLevel ? `Level ${levelLevel} · ${levelTitle}` : title}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 sm:px-3 sm:py-1.5">
            <Zap className="h-3.5 w-3.5 animate-pop fill-teal-500 text-teal-500 sm:h-4 sm:w-4" />
            <span className="text-xs font-bold text-primary sm:text-sm">{xp}</span>
            <span className="text-[9px] font-semibold uppercase text-muted-foreground sm:text-[10px]">
              XP
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-8 w-8 shrink-0 text-muted-foreground"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <div className="h-1.5 w-full bg-secondary">
        <div
          className="h-full rounded-r-full bg-gradient-to-r from-primary to-teal-500 transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>
    </header>
  );
}
