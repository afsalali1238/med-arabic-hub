import { BookOpen, LayoutList, TrendingUp, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";

interface Props {
  vocabCount: number;
}

export function BottomNav({ vocabCount }: Props) {
  const location = useLocation();
  const currentPath = location.pathname;

  const items = [
    { to: "/", label: "Syllabus", Icon: LayoutList },
    { to: "/dictionary", label: "Dictionary", Icon: Search },
    { to: "/vocab", label: "Vocab Bank", Icon: BookOpen, badge: vocabCount },
    { to: "/stats", label: "Stats", Icon: TrendingUp },
  ];

  return (
    <nav
      className="sticky bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur pb-[env(safe-area-inset-bottom)]"
      aria-label="Primary"
    >
      <ul className="mx-auto flex max-w-3xl items-stretch">
        {items.map(({ to, label, Icon, badge }) => {
          const isActive = currentPath === to;
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                className={cn(
                  "relative flex w-full flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <div className="relative">
                  <Icon className={cn("h-5 w-5", isActive && "stroke-[2.5]")} />
                  {badge !== undefined && badge > 0 && (
                    <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground">
                      {badge}
                    </span>
                  )}
                </div>
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
