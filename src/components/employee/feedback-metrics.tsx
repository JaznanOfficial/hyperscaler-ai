import { ArrowUpRight, MessageCircle, Sparkles } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const metricCards = [
  {
    label: "Average sentiment",
    value: "+18.4%",
    trendLabel: "vs last sprint",
    icon: Sparkles,
    accent: "from-primary/20 via-primary/10 to-transparent",
    subtitle: "Team confidence is trending upward.",
  },
  {
    label: "Actionable threads",
    value: "42",
    trendLabel: "8 escalated",
    icon: MessageCircle,
    accent: "from-amber-200/70 via-amber-100 to-transparent",
    subtitle: "Need follow-ups within 48h window.",
  },
  {
    label: "Resolved loops",
    value: "76%",
    trendLabel: "+6.1% this week",
    icon: ArrowUpRight,
    accent: "from-emerald-200 via-emerald-100 to-transparent",
    subtitle: "Most blockers close within 3 days.",
  },
]

export function FeedbackMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {metricCards.map((metric) => (
        <Card key={metric.label} className="relative overflow-hidden bg-white/95 shadow-sm">
          <CardHeader className="relative flex flex-row items-start justify-between">
            <div>
              <CardDescription className="text-xs uppercase tracking-wide text-slate-400">
                {metric.label}
              </CardDescription>
              <CardTitle className="mt-2 text-3xl font-semibold text-slate-900">
                {metric.value}
              </CardTitle>
              <p className="text-xs text-slate-500">{metric.trendLabel}</p>
            </div>
            <div className="bg-muted/50 text-muted-foreground flex size-10 items-center justify-center rounded-full">
              <metric.icon className="size-5" />
            </div>
            <div
              aria-hidden
              className={`pointer-events-none absolute inset-0 rounded-xl opacity-70 mix-blend-multiply ${metric.accent}`}
            />
          </CardHeader>
          <CardContent className="relative">
            <p className="text-sm text-slate-600">{metric.subtitle}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
