import { Button } from "@/components/ui/button"

export type EmployeeItem = {
  id: string
  name: string
  email: string
  role: string
  experience: string
}

const employeeItems: EmployeeItem[] = [
  {
    id: "EMP-2093",
    name: "Lana Zimmerman",
    email: "lana@hyperscaler.io",
    role: "Product Lead",
    experience: "9 yrs experience",
  },
  {
    id: "EMP-1988",
    name: "Arjun Patel",
    email: "arjun@hyperscaler.io",
    role: "Automation Architect",
    experience: "7 yrs experience",
  },
  {
    id: "EMP-1842",
    name: "Maya Collins",
    email: "maya@hyperscaler.io",
    role: "Solutions Engineer",
    experience: "5 yrs experience",
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
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-900">{item.role}</p>
              <p className="text-xs text-slate-500">{item.experience}</p>
            </div>
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" size="sm" className="cursor-pointer">
                  Detail view
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
