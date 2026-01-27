import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"

export type FeedbackItem = {
  id: string
  title: string
  owner: string
  updated: string
  sentiment: "Blocker" | "Insight" | "Kudos"
  summary: string
  details: string
}

const feedbackItems: FeedbackItem[] = [
  {
    id: "FB-8724",
    title: "Vendor sandbox still offline",
    owner: "Platform",
    updated: "18m ago",
    sentiment: "Blocker",
    summary: "Engineers are blocked from validating the onboarding playbook due to missing sandbox access.",
    details:
      "The Bangalore onboarding sprint cannot complete the QA checklist until the vendor sandbox credentials are provisioned. Ops escalated yesterday but has not received an ETA. Suggested next step: draft exec note and copy vendor success manager.",
  },
  {
    id: "FB-8719",
    title: "Async huddles cut stand-up time",
    owner: "Design Systems",
    updated: "1h ago",
    sentiment: "Kudos",
    summary: "Team reports faster handoffs after switching to async Loom huddles over the weekend.",
    details:
      "Design leaders noted that the async Loom format kept context tight and prevented repeat blockers from resurfacing. They want to package the ritual as a playbook for other pods. Hyperscaler AI already has draft prompts ready to summarize highlights.",
  },
  {
    id: "FB-8715",
    title: "Need sharper brief for AI adoption kit",
    owner: "Automation",
    updated: "3h ago",
    sentiment: "Insight",
    summary: "Enablement team is confused about success metrics for the pilot kit and is requesting clarification.",
    details:
      "Marcus indicated that the adoption kit talks about \"activation\" but never defines what qualifies as a successful pilot. Recommendation: add a \"definition of done\" block plus three measurable outcomes (SLA reduction, headcount saved, manual touch drop).",
  },
]

const sentimentStyles: Record<FeedbackItem["sentiment"], string> = {
  Blocker: "bg-rose-50 text-rose-700",
  Insight: "bg-amber-50 text-amber-700",
  Kudos: "bg-emerald-50 text-emerald-700",
}

export function FeedbackList() {
  return (
    <div>
      <ul className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
        {feedbackItems.map((item) => (
          <li key={item.id} className="relative">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  type="button"
                  className="flex w-full flex-col gap-1 px-4 py-4 text-left transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-slate-400">
                      {item.owner}
                    </p>
                    <p className="text-lg font-semibold text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-500">{item.summary}</p>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-3 sm:mt-0">
                    <Badge
                      variant="secondary"
                      className={`rounded-full border border-slate-200 px-3 py-1 text-[11px] font-semibold ${sentimentStyles[item.sentiment]}`}
                    >
                      {item.sentiment}
                    </Badge>
                    <span className="text-xs text-slate-500">Updated {item.updated}</span>
                  </div>
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent size="default">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-left text-lg font-semibold text-slate-900">
                    {item.title}
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-left text-sm text-slate-500">
                    {item.owner} · {item.id}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="space-y-3 text-sm text-slate-600">
                  <p>{item.details}</p>
                  <p className="text-xs uppercase tracking-wide text-slate-400">Updated {item.updated}</p>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Close</AlertDialogCancel>
                  <AlertDialogAction>Mark reviewed</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </li>
        ))}
      </ul>
    </div>
  )
}
