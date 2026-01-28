import { CreateEmployeeDialog } from "@/components/admin/create-employee-dialog"
import { EmployeeList } from "@/components/admin/employee-list"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function SuperAdminEmployeesPage() {
  const totalPages: number = 5
  const currentPage: number = 1

  return (
    <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-hidden">
      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">Employees</h1>
          <p className="text-sm text-slate-500">Manage profiles and grant platform access.</p>
        </div>
        <CreateEmployeeDialog />
      </div>
      <div className="mt-4 flex-1 overflow-y-auto">
        <EmployeeList />
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
