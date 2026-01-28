import Link from "next/link"

import { Button } from "@/components/ui/button"

export type ServiceItem = {
  id: string
  name: string
}

const serviceItems: ServiceItem[] = [
  {
    id: "SRV-401",
    name: "Automation Intelligence Suite",
  },
  {
    id: "SRV-389",
    name: "Telemetry & Risk Mesh",
  },
  {
    id: "SRV-376",
    name: "Revenue Autopilot",
  },
]

export function ServiceList() {
  return (
    <div>
      <ul className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
        {serviceItems.map((item) => (
          <li key={item.id} className="px-4 py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href={`/s-admin/services/${item.id}`}
                className="flex-1 cursor-pointer rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                <p className="text-xs uppercase tracking-wide text-slate-400">{item.id}</p>
                <p className="text-lg font-semibold text-slate-900">{item.name}</p>
              </Link>
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" size="sm" className="cursor-pointer" asChild>
                  <Link href={`/s-admin/services/${item.id}`}>View</Link>
                </Button>
                <Button variant="destructive" size="sm" className="cursor-pointer">
                  Delete
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
