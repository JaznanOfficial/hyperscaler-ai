import Link from "next/link"

import { Button } from "@/components/ui/button"
import type { ServiceItem } from "@/components/admin/service-list"

export function ServiceListItem({ item }: { item: ServiceItem }) {
  return (
    <li className="px-4 py-4">
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
  )
}
