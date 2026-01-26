import Link from "next/link"

const folders = [
  { id: "1", name: "Automation Playbooks", owner: "Ops", updated: "2h ago" },
  { id: "2", name: "AI Hiring Pilot", owner: "People", updated: "Yesterday" },
  { id: "3", name: "Vendor Integrations", owner: "Platform", updated: "Jan 18" },
  { id: "4", name: "Security Controls", owner: "Risk", updated: "This week" },
]

export default function EmployeeProjectsPage() {
  return (
    <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-hidden">
      <div className="grid flex-1 gap-4 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3">
        {folders.map((folder) => (
          <Link
            key={folder.id}
            href={`/employee/projects/${folder.id}`}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-slate-300"
          >
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{folder.owner}</span>
              <span>{folder.updated}</span>
            </div>
            <h2 className="mt-3 text-xl font-semibold text-slate-900">{folder.name}</h2>
            <p className="mt-2 text-sm text-slate-500">Open folder</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
