import { SubscriptionListItem } from "@/components/admin/subscription-list-item"

export type SubscriptionItem = {
  id: string
  subscriber: string
  service: string
  amount: string
  status: "Active" | "Paused" | "Trial"
  renewal: string
  notes: string
}

const subscriptionItems: SubscriptionItem[] = [
  {
    id: "SUB-1981",
    subscriber: "Northwind Ops",
    service: "Automation Intelligence Suite",
    amount: "$42,000/mo",
    status: "Active",
    renewal: "Renews Mar 01",
    notes: "Annual uplift approved. Monitoring seat expansion across EU pods.",
  },
  {
    id: "SUB-1972",
    subscriber: "Mercury Logistics",
    service: "Telemetry & Risk Mesh",
    amount: "$18,500/mo",
    status: "Paused",
    renewal: "Paused Feb 10",
    notes: "Finance requested pause while consolidating vendor stack. Resume expected next sprint.",
  },
  {
    id: "SUB-1966",
    subscriber: "Helios Retail",
    service: "Revenue Autopilot",
    amount: "$9,200/mo",
    status: "Trial",
    renewal: "Trial ends Mar 15",
    notes: "Running 45-day pilot on tier-two stores. Needs success plan before conversion.",
  },
]

export function SubscriptionList() {
  return (
    <div>
      <ul className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
        {subscriptionItems.map((item) => (
          <SubscriptionListItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  )
}
