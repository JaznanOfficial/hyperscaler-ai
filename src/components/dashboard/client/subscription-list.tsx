import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type ClientSubscription = {
  id: string
  title: string
  description: string
  amount: string
  status: "Active" | "Cancelled"
  renewal: string
}

const clientSubscriptions: ClientSubscription[] = [
  {
    id: "SUB-1981",
    title: "Northwind Ops",
    description: "Automation Intelligence Suite",
    amount: "$42,000/mo",
    status: "Active",
    renewal: "Mar 01",
  },
  {
    id: "SUB-1972",
    title: "Mercury Logistics",
    description: "Telemetry & Risk Mesh",
    amount: "$18,500/mo",
    status: "Cancelled",
    renewal: "Feb 10",
  },
  {
    id: "SUB-1966",
    title: "Helios Retail",
    description: "Revenue Autopilot",
    amount: "$9,200/mo",
    status: "Cancelled",
    renewal: "Mar 15",
  },
]

const statusStyles: Record<ClientSubscription["status"], string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-rose-100 text-rose-700",
}

export function ClientSubscriptionList() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white">
      <ul className="divide-y divide-slate-200">
        {clientSubscriptions.map((subscription) => (
          <li key={subscription.id} className="px-4 py-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-base font-semibold text-slate-900">{subscription.title}</p>
                  <Badge className={`rounded-full px-3 py-1 text-[11px] font-semibold ${statusStyles[subscription.status]}`}>
                    {subscription.status}
                  </Badge>
                </div>
                <p className="text-sm text-slate-500">{subscription.description}</p>
                <div className="flex flex-col gap-1 text-sm text-slate-600 md:flex-row md:items-center md:gap-10">
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg font-semibold text-slate-900" style={{ fontFamily: "var(--font-outfit)" }}>
                      {subscription.amount.replace("/mo", "")}
                    </span>
                    <span className="text-sm text-slate-500">/mo</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500">
                    <span>{subscription.status === "Active" ? "Next billing:" : "Cancelled date:"}</span>
                    <span className="font-semibold text-slate-900">{subscription.renewal}</span>
                  </div>
                </div>
              </div>
              <Button
                variant={subscription.status === "Cancelled" ? "default" : "outline"}
                className={` px-5 py-2 text-sm font-semibold md:self-center ${
                  subscription.status === "Cancelled"
                    ? "border-0 bg-linear-to-r from-violet-800  to-fuchsia-500 text-white hover:brightness-110"
                    : "text-slate-900"
                }`}
              >
                {subscription.status === "Cancelled" ? "Reactivate" : "View Details"}
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
