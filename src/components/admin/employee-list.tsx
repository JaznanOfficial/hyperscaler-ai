import { Button } from "@/components/ui/button"
import { EditEmployeeDialog } from "@/components/admin/edit-employee-dialog"

export type EmployeeItem = {
  id: string
  name: string
  email: string
  title: string
  expertise: string
  yearsExperience: number
  roleLevel: "manager" | "employee"
}

const employeeItems: EmployeeItem[] = [
  {
    id: "EMP-2093",
    name: "Lana Zimmerman",
    email: "lana@hyperscaler.io",
    title: "Product Lead",
    expertise: "Revenue playbooks, demand gen, GTM automation",
    yearsExperience: 9,
    roleLevel: "manager",
  },
  {
    id: "EMP-1988",
    name: "Arjun Patel",
    email: "arjun@hyperscaler.io",
    title: "Automation Architect",
    expertise: "Workflow orchestration, AI integrations, RevOps infra",
    yearsExperience: 7,
    roleLevel: "employee",
  },
  {
    id: "EMP-1842",
    name: "Maya Collins",
    email: "maya@hyperscaler.io",
    title: "Solutions Engineer",
    expertise: "Client onboarding, telemetry, experimentation",
    yearsExperience: 5,
    roleLevel: "employee",
  },
]

export function EmployeeList() {
  return (
    <div>
      <ul className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
        {employeeItems.map((item) => (
          <li key={item.id} className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold text-slate-900">{item.name}</p>
              <p className="text-sm text-slate-500">{item.email}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-900">{item.title}</p>
              <p className="text-xs text-slate-500">{item.yearsExperience} yrs experience</p>
            </div>
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <div className="flex flex-wrap items-center gap-2">
                <EditEmployeeDialog employee={item} />
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
