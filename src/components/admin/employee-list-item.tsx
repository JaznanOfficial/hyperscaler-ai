import { EditEmployeeDialog } from "@/components/admin/edit-employee-dialog"
import { Button } from "@/components/ui/button"
import type { EmployeeItem } from "@/components/admin/employee-list"

export function EmployeeListItem({ item }: { item: EmployeeItem }) {
  return (
    <li className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
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
  )
}
