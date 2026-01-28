type ProjectMetricsHeaderProps = {
  label?: string
  title: string
  description?: string
}

export function ProjectMetricsHeader({ label = "Projects", title, description }: ProjectMetricsHeaderProps) {
  return (
    <header className="rounded-2xl border border-slate-200 bg-white px-6 py-4">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{label}</p>
      <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
      {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
    </header>
  )
}
