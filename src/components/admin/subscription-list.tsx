import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"

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

const statusStyles: Record<SubscriptionItem["status"], string> = {
  Active: "bg-emerald-50 text-emerald-700",
  Paused: "bg-amber-50 text-amber-700",
  Trial: "bg-slate-100 text-slate-600",
}

export function SubscriptionList() {
  return (
    <div>
      <ul className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
        {subscriptionItems.map((item) => (
          <li key={item.id} className="relative">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  type="button"
                  className="flex w-full cursor-pointer flex-col gap-1 px-4 py-4 text-left transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-lg font-semibold text-slate-900">{item.subscriber}</p>
                    <p className="text-sm text-slate-500">{item.service}</p>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-3 sm:mt-0">
                    <Badge
                      variant="secondary"
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold ${statusStyles[item.status]}`}
                    >
                      {item.status}
                    </Badge>
                    <span className="text-xs font-semibold text-slate-900">{item.amount}</span>
                    <span className="text-xs text-slate-500">{item.renewal}</span>
                  </div>
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent size="default">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-left text-lg font-semibold text-slate-900">
                    {item.subscriber}
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <div className="space-y-2 text-sm text-slate-600">
                  <p className="font-medium text-slate-900">{item.service}</p>
                  <p>
                    Subscription ID {item.id} · {item.amount}
                  </p>
                  <p>Status: {item.status}</p>
                  <p>{item.notes}</p>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel className="cursor-pointer">Close</AlertDialogCancel>
                  <AlertDialogAction className="cursor-pointer">Mark as reviewed</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </li>
        ))}
      </ul>
    </div>
  )
}
