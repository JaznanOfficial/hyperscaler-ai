type Stat = {
  label: string
  value: string
  change: {
    value: string
    trend: "up" | "down"
  }
  helper: string
}

const stats: Stat[] = [
  {
    label: "Active Workspaces",
    value: "128",
    change: {
      value: "+12%",
      trend: "up",
    },
    helper: "vs. last month",
  },
  {
    label: "Provisioning Queue",
    value: "06",
    change: {
      value: "-2",
      trend: "down",
    },
    helper: "requests waiting",
  },
  {
    label: "Spend Guardrails",
    value: "$482k",
    change: {
      value: "+4.3%",
      trend: "up",
    },
    helper: "on-track",
  },
  {
    label: "Incidents",
    value: "02",
    change: {
      value: "0",
      trend: "up",
    },
    helper: "past 24h",
  },
]

export function StatsGrid() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <article
          key={stat.label}
          className="border-border/40 bg-card text-card-foreground relative overflow-hidden rounded-2xl border p-4 shadow-sm"
        >
          <div className="text-sm text-muted-foreground flex items-center justify-between">
            <span>{stat.label}</span>
            <span
              className={
                stat.change.trend === "up"
                  ? "text-emerald-500"
                  : "text-rose-500"
              }
            >
              {stat.change.value}
            </span>
          </div>
          <p className="mt-3 text-3xl font-semibold tracking-tight">
            {stat.value}
          </p>
          <p className="text-muted-foreground mt-2 text-xs uppercase tracking-wide">
            {stat.helper}
          </p>
          <div className="bg-linear-to-r from-primary/5 to-transparent absolute inset-x-4 bottom-3 h-1 rounded-full" />
        </article>
      ))}
    </section>
  )
}
