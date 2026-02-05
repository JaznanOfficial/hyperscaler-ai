import { EditEmployeeDialog } from "@/components/admin/edit-employee-dialog";
import type { EmployeeItem } from "@/components/admin/employee-list";
import { Button } from "@/components/ui/button";

export function EmployeeListItem({ item }: { item: EmployeeItem }) {
  return (
    <li className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-semibold text-lg text-slate-900">{item.name}</p>
        <p className="text-slate-500 text-sm">{item.email}</p>
        <p className="mt-1 font-semibold text-slate-900 text-xs uppercase tracking-wide">
          {item.title}
        </p>
        <p className="text-slate-500 text-xs">
          {item.yearsExperience} yrs experience
        </p>
      </div>
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-2">
          <EditEmployeeDialog employee={item} />
          <Button className="cursor-pointer" size="sm" variant="destructive">
            Delete
          </Button>
        </div>
      </div>
    </li>
  );
}
