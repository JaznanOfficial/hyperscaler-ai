type Stat = {
  label: string;
  value: string;
  change: {
    value: string;
    trend: "up" | "down";
  };
  helper: string;
};

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
];

export function StatsGrid() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <article
          className="relative overflow-hidden rounded-2xl border border-border/40 bg-card p-4 text-card-foreground shadow-sm"
          key={stat.label}
        >
          <div className="flex items-center justify-between text-muted-foreground text-sm">
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
          <p className="mt-3 font-semibold text-3xl tracking-tight">
            {stat.value}
          </p>
          <p className="mt-2 text-muted-foreground text-xs uppercase tracking-wide">
            {stat.helper}
          </p>
          <div className="absolute inset-x-4 bottom-3 h-1 rounded-full bg-linear-to-r from-primary/5 to-transparent" />
        </article>
      ))}
    </section>
  );
}
