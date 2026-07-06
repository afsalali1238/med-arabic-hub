import { createFileRoute, Link } from "@tanstack/react-router";
import { TRACKS } from "@/data/course";
import { Activity, Stethoscope, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Med-Arabic-Hub
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Select your profession to begin your clinical Arabic training.
        </p>
      </div>

      <div className="grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
        {TRACKS.map((track) => {
          const isPhysio = track.id === "physio";
          const Icon = isPhysio ? Activity : Stethoscope;

          return (
            <Link key={track.id} to={`/${track.id}`} className="group block focus:outline-none">
              <Card className="h-full border-2 border-border bg-card transition-all hover:border-primary hover:shadow-lg dark:hover:shadow-primary/20">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">
                      {isPhysio ? "Physiotherapy" : "Pharmacy"}
                    </CardTitle>
                    <CardDescription className="text-base">{track.subtitle}</CardDescription>
                  </div>
                  <div className="rounded-full bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    {isPhysio
                      ? "Master movement commands, pain assessment, and clinical instructions for the physical therapy clinic."
                      : "Master medication types, dosages, instructions, and general clinical vocabulary for pharmacy."}
                  </p>
                  <div className="flex items-center text-sm font-semibold text-primary">
                    Start Course <ChevronRight className="ml-1 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
