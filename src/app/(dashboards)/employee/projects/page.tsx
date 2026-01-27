import Link from "next/link"
import { FolderOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const folders = [
  { id: "1", name: "Automation Playbooks", owner: "Ops", updated: "2h ago", status: "On-going" },
  { id: "2", name: "AI Hiring Pilot", owner: "People", updated: "Yesterday", status: "Completed" },
  { id: "3", name: "Vendor Integrations", owner: "Platform", updated: "Jan 18", status: "Cancelled" },
  { id: "4", name: "Security Controls", owner: "Risk", updated: "This week", status: "On-going" },
]

export default function EmployeeProjectsPage() {
  const totalPages: number = 5
  const currentPage: number = 1
  return (
    <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <ul className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {folders.map((folder) => (
            <li key={folder.id} className="px-4 py-4">
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
                  <Badge
                    variant="secondary"
                    className={
                      "rounded-full px-3 py-1 text-[11px] font-semibold " +
                      (folder.status === "Completed"
                        ? "bg-emerald-100 text-emerald-700"
                        : folder.status === "Cancelled"
                          ? "bg-rose-100 text-rose-700"
                          : "bg-amber-100 text-amber-700")
                    }
                  >
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
          ))}
        </ul>
      </div>
      <Pagination className="mt-4 py-3">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" aria-disabled={currentPage === 1} />
          </PaginationItem>
          {[1, 2, 3].map((page) => (
            <PaginationItem key={page}>
              <PaginationLink href="#" isActive={currentPage === page}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">{totalPages}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" aria-disabled={currentPage === totalPages} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  )
}
