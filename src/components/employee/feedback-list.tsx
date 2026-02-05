import { FeedbackListItem } from "@/components/employee/feedback-list-item";

export type FeedbackItem = {
  id: string;
  title: string;
  owner: string;
  updated: string;
  summary: string;
  details: string;
};

const feedbackItems: FeedbackItem[] = [
  {
    id: "FB-8724",
    title: "Vendor sandbox still offline",
    owner: "Platform",
    updated: "18m ago",
    summary:
      "Engineers are blocked from validating the onboarding playbook due to missing sandbox access.",
    details:
      "The Bangalore onboarding sprint cannot complete the QA checklist until the vendor sandbox credentials are provisioned. Ops escalated yesterday but has not received an ETA. Suggested next step: draft exec note and copy vendor success manager.",
  },
  {
    id: "FB-8719",
    title: "Async huddles cut stand-up time",
    owner: "Design Systems",
    updated: "1h ago",
    summary:
      "Team reports faster handoffs after switching to async Loom huddles over the weekend.",
    details:
      "Design leaders noted that the async Loom format kept context tight and prevented repeat blockers from resurfacing. They want to package the ritual as a playbook for other pods. Hyperscaler AI already has draft prompts ready to summarize highlights.",
  },
  {
    id: "FB-8715",
    title: "Need sharper brief for AI adoption kit",
    owner: "Automation",
    updated: "3h ago",
    summary:
      "Enablement team is confused about success metrics for the pilot kit and is requesting clarification.",
    details:
      'Marcus indicated that the adoption kit talks about "activation" but never defines what qualifies as a successful pilot. Recommendation: add a "definition of done" block plus three measurable outcomes (SLA reduction, headcount saved, manual touch drop).',
  },
];

export function FeedbackList() {
  return (
    <div>
      <ul className="list-none divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white p-0">
        {feedbackItems.map((item) => (
          <FeedbackListItem item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
