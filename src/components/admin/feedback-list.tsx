import { AdminFeedbackListItem } from "@/components/admin/feedback-list-item";

export interface AdminFeedbackItem {
  id: string;
  title: string;
  summary: string;
  details: string;
  recipients: string[];
}

const adminFeedbackItems: AdminFeedbackItem[] = [
  {
    id: "SA-FB-2301",
    title: "Compliance report export failing",
    summary:
      "Bulk export job times out for European tenant cluster during nightly run.",
    details:
      "Nightly compliance export targeting eu-central-1 clusters has regressed after the latest IAM patch. Security needs visibility before the board review. Suggested next step: roll back IAM change on reporting worker nodes while cloud team re-validates policies.",
    recipients: ["Lana Zimmerman", "Arjun Patel"],
  },
  {
    id: "SA-FB-2294",
    title: "Seat allocations drifting",
    summary:
      "Regional pods are over-allocating AI copilots vs. approved budget tiers.",
    details:
      "Finance Ops observed that LATAM and APAC pods added 18 more AI copilots than their forecast. Recommendation: enforce the new automation SKU guardrail in provisioning workflow and send summary to GTM leadership.",
    recipients: ["Maya Collins", "Noah Whitfield", "Priya Ramesh"],
  },
  {
    id: "SA-FB-2280",
    title: "Need clearer SOC-2 narrative",
    summary:
      "Draft renewal pack lacks executive-ready storyline for controls automation.",
    details:
      "Customer Trust wants the SOC-2 renewal memo to highlight how Hyperscaler AI reduced manual touch points by 63%. They shared an outline but need Super Admin enablement to finalize. Suggested next step: attach automation heatmap and short Loom walkthrough.",
    recipients: ["Devon Ellis", "Priya Ramesh"],
  },
];

export function AdminFeedbackList() {
  return (
    <div>
      <ul className="list-none divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white p-0">
        {adminFeedbackItems.map((item) => (
          <AdminFeedbackListItem item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
