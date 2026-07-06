interface Props {
  focusAreas: { title: string; description: string }[];
}

export function CoreConceptsCards({ focusAreas }: Props) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {focusAreas.map((f, i) => (
        <div
          key={i}
          className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
        >
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
            {i + 1}
          </div>
          <h3 className="mb-1.5 text-base font-semibold text-foreground">{f.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{f.description}</p>
        </div>
      ))}
    </div>
  );
}
