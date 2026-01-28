import Link from "next/link"
import { FolderOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export type EmployeeProjectItem = {
  id: string
  name: string
  owner: string
  updated: string
  status: "Completed" | "Cancelled" | "On-going"
}

const statusStyles: Record<EmployeeProjectItem["status"], string> = {
  Completed: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-rose-100 text-rose-700",
  "On-going": "bg-amber-100 text-amber-700",
}

export function ProjectListItem({ folder }: { folder: EmployeeProjectItem }) {
  return (
    <li className="px-4 py-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={`/employee/projects/${folder.id}`}
          className="flex-1 cursor-pointer rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
        >
          <p className="text-xs uppercase tracking-wide text-slate-400">{folder.owner}</p>
          <p className="text-lg font-semibold text-slate-900">{folder.name}</p>
          <p className="text-xs text-slate-500">Updated {folder.updated}</p>
        </Link>
        <div className="mt-3 flex items-center gap-3 sm:mt-0">
          <Badge variant="secondary" className={`rounded-full px-3 py-1 text-[11px] font-semibold ${statusStyles[folder.status]}`}>
            {folder.status}
          </Badge>
          <Button asChild variant="outline" className="rounded-full px-4 py-1 text-sm">
            <Link href={`/employee/projects/${folder.id}`} className="inline-flex items-center gap-2">
              <FolderOpen className="size-4" />
              Open
            </Link>
          </Button>
        </div>
      </div>
    </li>
  )
}
