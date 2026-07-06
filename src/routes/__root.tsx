import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Medical Arabic for Physiotherapists" },
      {
        name: "description",
        content:
          "Learn conversational Medical Arabic for the physiotherapy clinic with an 8-week gamified course covering greetings, assessment, movement commands and discharge.",
      },
      { name: "author", content: "Movement & Healing" },
      { name: "theme-color", media: "(prefers-color-scheme: light)", content: "#f8fafc" },
      { name: "theme-color", media: "(prefers-color-scheme: dark)", content: "#020817" },
      {
        property: "og:title",
        content: "Medical Arabic for Physiotherapists",
      },
      {
        property: "og:description",
        content:
          "An 8-week conversational Medical Arabic course for physiotherapists — track progress, save clinical phrases, and master patient dialogue.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Tajawal:wght@400;500;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import { CourseProgressProvider, useCourseProgress } from "@/hooks/useCourseProgress";
import { WEEKS, COURSE_TITLE } from "@/data/course";
import { AppHeader } from "@/components/course/AppHeader";
import { BottomNav } from "@/components/course/BottomNav";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useRef, useMemo, useState } from "react";
import { useLocation } from "@tanstack/react-router";

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CourseProgressProvider>
        <CourseLayout />
      </CourseProgressProvider>
    </QueryClientProvider>
  );
}

function CourseLayout() {
  const { progress, hydrated, calculateWeekProgress, xp, level } = useCourseProgress();

  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const location = useLocation();
  const isWeekRoute = location.pathname.startsWith("/week/");

  const perWeekPct = useMemo(() => {
    const map: Record<string, number> = {};
    WEEKS.forEach((w) => {
      map[w.id] = calculateWeekProgress(w.id).pct;
    });
    return map;
  }, [progress.completedCheckpoints, progress.assignments, calculateWeekProgress]);

  const prevWeekPct = useRef<Record<string, number>>({});
  const prevLevel = useRef<number | null>(null);

  const fireConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  useEffect(() => {
    if (!hydrated) {
      prevWeekPct.current = perWeekPct;
      prevLevel.current = level.level;
      return;
    }

    if (prevLevel.current !== null && level.level > prevLevel.current) {
      toast.success(`Level Up!`, { description: `You reached ${level.title}` });
      fireConfetti();
    }
    prevLevel.current = level.level;

    Object.entries(perWeekPct).forEach(([wid, pct]) => {
      if (
        pct === 100 &&
        prevWeekPct.current[wid] !== 100 &&
        prevWeekPct.current[wid] !== undefined
      ) {
        const w = WEEKS.find((x) => x.id === wid);
        if (w) {
          toast.success(`Week ${w.number} complete`, { description: w.title });
          fireConfetti();
        }
      }
    });
    prevWeekPct.current = perWeekPct;
  }, [perWeekPct, level.level, hydrated]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Toaster />
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={220}
          recycle={false}
          gravity={0.25}
          colors={["#2563eb", "#14b8a6", "#38bdf8", "#0ea5e9", "#5eead4"]}
          style={{ zIndex: 100 }}
        />
      )}

      {!isWeekRoute && (
        <AppHeader
          title={COURSE_TITLE}
          progressPct={
            level.next
              ? Math.min(100, Math.round(((xp - level.min) / (level.next.min - level.min)) * 100))
              : 100
          }
          levelTitle={level.title}
          levelLevel={level.level}
          xp={xp}
        />
      )}

      <main className={isWeekRoute ? "flex-1" : "flex-1 pb-20"}>
        {!hydrated ? (
          <div className="mx-auto max-w-3xl p-6 space-y-4">
            <Skeleton className="h-[200px] w-full rounded-2xl" />
            <Skeleton className="h-12 w-full rounded-2xl" />
            <Skeleton className="h-24 w-full rounded-2xl" />
            <Skeleton className="h-24 w-full rounded-2xl" />
          </div>
        ) : (
          <Outlet />
        )}
      </main>

      {!isWeekRoute && <BottomNav vocabCount={progress.vocabBank.length} />}
    </div>
  );
}
