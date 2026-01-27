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
          <li key={item.id} className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold text-slate-900">{item.name}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" className="cursor-pointer" asChild>
                <Link href={`/s-admin/services/${item.id}`}>
                  View
                </Link>
              </Button>
              <Button variant="destructive" size="sm" className="cursor-pointer">
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
