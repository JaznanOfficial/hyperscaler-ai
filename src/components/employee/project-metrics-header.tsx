type ProjectMetricsHeaderProps = {
  label?: string;
  title: string;
  description?: string;
};

export function ProjectMetricsHeader({
  label = "Projects",
  title,
  description,
}: ProjectMetricsHeaderProps) {
  return (
    <header className="rounded-2xl border border-slate-200 bg-white px-6 py-4">
      <p className="text-slate-400 text-xs uppercase tracking-[0.3em]">
        {label}
      </p>
      <h1 className="font-semibold text-2xl text-slate-900">{title}</h1>
      {description ? (
        <p className="mt-1 text-slate-500 text-sm">{description}</p>
      ) : null}
    </header>
  );
}
