import { ArrowRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type FeedbackRequest = {
  id: string
  person: string
  role: string
  team: string
  due: string
  urgency: "high" | "medium" | "low"
}

const feedbackRequests: FeedbackRequest[] = [
  {
    id: "FR-1081",
    person: "Priya Raman",
    role: "Engineering Lead",
    team: "Platform",
    due: "Today, 14:00",
    urgency: "high",
  },
  {
    id: "FR-1080",
    person: "Diego Alvarez",
    role: "Delivery Manager",
    team: "Enterprise",
    due: "Tonight",
    urgency: "medium",
  },
  {
    id: "FR-1079",
    person: "Jules Tran",
    role: "People Ops",
    team: "People",
    due: "Tomorrow",
    urgency: "low",
  },
]

const urgencyStyles: Record<FeedbackRequest["urgency"], string> = {
  high: "border-rose-200 text-rose-700 bg-rose-50",
  medium: "border-amber-200 text-amber-700 bg-amber-50",
  low: "border-emerald-200 text-emerald-700 bg-emerald-50",
}

export function FeedbackRequests() {
  return (
    <Card className="h-full border-slate-200/70">
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <div>
          <CardTitle className="text-lg font-semibold text-slate-900">Awaiting loops</CardTitle>
          <CardDescription>Feedback that still needs your response.</CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="gap-2 text-slate-600">
          View all
          <ArrowRight className="size-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {feedbackRequests.map((request) => (
          <div
            key={request.id}
            className="rounded-2xl border border-slate-200/80 p-4 shadow-[0_1px_0_rgba(15,23,42,0.04)]"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-slate-900">{request.person}</p>
                <p className="text-xs text-slate-500">{request.role}</p>
              </div>
              <Badge variant="secondary" className={`border ${urgencyStyles[request.urgency]}`}>
                {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}
              </Badge>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium text-slate-900">{request.team}</span>
              <span>{request.due}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
