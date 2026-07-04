import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { WEEKS } from "@/data/course";
import { useCourseState } from "@/hooks/useCourseState";
import { AppBar } from "@/components/course/AppBar";
import { BottomNav, type Tab } from "@/components/course/BottomNav";
import { WeekCard } from "@/components/course/WeekCard";
import { WeekDetail } from "@/components/course/WeekDetail";
import { VocabBankView } from "@/components/course/VocabBankView";
import { StatsView } from "@/components/course/StatsView";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const store = useCourseState();
  const [tab, setTab] = useState<Tab>("syllabus");
  const [openWeek, setOpenWeek] = useState<number | null>(null);
  const [confetti, setConfetti] = useState(false);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const update = () =>
      setSize({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const fireConfetti = () => {
    setConfetti(true);
    window.setTimeout(() => setConfetti(false), 3500);
  };

  const activeWeek =
    openWeek != null ? (WEEKS.find((w) => w.id === openWeek) ?? null) : null;

  if (!store.hydrated) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      {confetti && (
        <Confetti
          width={size.w}
          height={size.h}
          numberOfPieces={220}
          recycle={false}
          gravity={0.25}
          colors={["#2563eb", "#14b8a6", "#38bdf8", "#0ea5e9", "#5eead4"]}
        />
      )}

      <AppBar store={store} />

      <main className="mx-auto max-w-xl px-4 pb-24 pt-24">
        {tab === "syllabus" &&
          (activeWeek ? (
            <WeekDetail
              key={activeWeek.id}
              week={activeWeek}
              store={store}
              onBack={() => setOpenWeek(null)}
              onSolved={fireConfetti}
            />
          ) : (
            <div className="space-y-3">
              <div className="mb-1">
                <h2 className="text-xl font-extrabold text-foreground">
                  8-Week Syllabus
                </h2>
                <p className="text-sm text-muted-foreground">
                  Complete each week's scenario to unlock the next.
                </p>
              </div>
              {WEEKS.map((w) => (
                <WeekCard
                  key={w.id}
                  week={w}
                  store={store}
                  onOpen={() => setOpenWeek(w.id)}
                />
              ))}
            </div>
          ))}

        {tab === "vocab" && <VocabBankView store={store} />}
        {tab === "stats" && <StatsView store={store} />}
      </main>

      <BottomNav
        active={tab}
        onChange={(t) => {
          setTab(t);
          setOpenWeek(null);
        }}
      />
    </div>
  );
}
