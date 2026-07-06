import { ExternalLink, FileText, Headphones, Video } from "lucide-react";
import type { Resource } from "@/data/course";

const ICONS = {
  video: { icon: Video, emoji: "📺", label: "Video", tint: "text-rose-600 bg-rose-50" },
  audio: { icon: Headphones, emoji: "🎧", label: "Audio", tint: "text-violet-600 bg-violet-50" },
  article: { icon: FileText, emoji: "📝", label: "Article", tint: "text-teal-700 bg-teal-50" },
  docs: { icon: FileText, emoji: "📄", label: "Document", tint: "text-slate-600 bg-slate-50" },
} as const;

export function ResourceGrid({ resources }: { resources: Resource[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {resources.map((r) => {
        const meta = ICONS[r.type];
        const Icon = meta.icon;
        return (
          <a
            key={r.url}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm"
          >
            <div className="mb-3 flex items-center justify-between">
              <span
                className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ${meta.tint}`}
              >
                <Icon className="h-3.5 w-3.5" />
                {meta.label}
              </span>
              <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
            </div>
            <h4 className="mb-1.5 text-sm font-semibold leading-snug text-foreground">{r.title}</h4>
            <p className="text-xs leading-relaxed text-muted-foreground">{r.description}</p>
          </a>
        );
      })}
    </div>
  );
}
