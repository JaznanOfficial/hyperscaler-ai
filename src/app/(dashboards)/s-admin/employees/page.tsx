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
      <div className="flex-1 overflow-y-auto">
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
