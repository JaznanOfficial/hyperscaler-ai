import Link from "next/link"
import { FolderOpen } from "lucide-react"

const folders = [
  { id: "1", name: "Automation Playbooks", owner: "Ops", updated: "2h ago" },
  { id: "2", name: "AI Hiring Pilot", owner: "People", updated: "Yesterday" },
  { id: "3", name: "Vendor Integrations", owner: "Platform", updated: "Jan 18" },
  { id: "4", name: "Security Controls", owner: "Risk", updated: "This week" },
]

export default function EmployeeProjectsPage() {
  return (
    <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <ul className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {folders.map((folder) => (
            <li key={folder.id} className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">{folder.owner}</p>
                <p className="text-lg font-semibold text-slate-900">{folder.name}</p>
                <p className="text-xs text-slate-500">Updated {folder.updated}</p>
              </div>
              <Link
                href={`/employee/projects/${folder.id}`}
                className="mt-2 inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-1 text-sm font-medium text-slate-700 transition hover:border-slate-400 sm:mt-0"
              >
                <FolderOpen className="size-4" />
                Open
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
