import { Lightbulb, ThumbsUp, TriangleAlert } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const timelineEntries = [
  {
    id: "FB-8721",
    title: "Escalate access to vendor sandbox",
    author: "Lana Zimmerman",
    channel: "People Ops",
    time: "34m ago",
    category: "Blocker",
    icon: TriangleAlert,
    accent: "text-rose-600 bg-rose-50 border border-rose-100",
  },
  {
    id: "FB-8718",
    title: "Loved async huddles format",
    author: "Ivy Mensah",
    channel: "Design Systems",
    time: "1h ago",
    category: "Kudos",
    icon: ThumbsUp,
    accent: "text-emerald-600 bg-emerald-50 border border-emerald-100",
  },
  {
    id: "FB-8710",
    title: "Need clearer brief for AI adoption playbook",
    author: "Marcus Chen",
    channel: "Automation",
    time: "3h ago",
    category: "Insight",
    icon: Lightbulb,
    accent: "text-amber-600 bg-amber-50 border border-amber-100",
  },
]

export function FeedbackTimeline() {
  return (
    <Card className="h-full border-slate-200/70">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">Latest feedback loops</CardTitle>
        <CardDescription>Signals synced from the last 24 hours.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {timelineEntries.map((entry) => (
          <div key={entry.id} className="flex items-start gap-3">
            <div className={`rounded-full p-2 ${entry.accent}`}>
              <entry.icon className="size-4" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold text-slate-900">{entry.title}</p>
                <Badge variant="outline" className="rounded-full border-slate-200 px-2 py-0 text-[10px] uppercase tracking-wide">
                  {entry.category}
                </Badge>
              </div>
              <p className="text-xs text-slate-500">
                {entry.author} · {entry.channel}
              </p>
              <p className="mt-2 text-xs font-medium text-slate-400">{entry.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
