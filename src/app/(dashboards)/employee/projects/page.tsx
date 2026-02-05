import {
  type EmployeeProjectItem,
  ProjectListItem,
} from "@/components/employee/project-list-item";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const folders: EmployeeProjectItem[] = [
  {
    id: "1",
    name: "Automation Playbooks",
    owner: "Ops",
    updated: "2h ago",
    status: "On-going",
  },
  {
    id: "2",
    name: "AI Hiring Pilot",
    owner: "People",
    updated: "Yesterday",
    status: "Completed",
  },
  {
    id: "3",
    name: "Vendor Integrations",
    owner: "Platform",
    updated: "Jan 18",
    status: "Cancelled",
  },
  {
    id: "4",
    name: "Security Controls",
    owner: "Risk",
    updated: "This week",
    status: "On-going",
  },
];

export default function EmployeeProjectsPage() {
  const totalPages: number = 5;
  const currentPage: number = 1;
  return (
    <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <ul className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {folders.map((folder) => (
            <ProjectListItem folder={folder} key={folder.id} />
          ))}
        </ul>
      </div>
      <Pagination className="mt-4 py-3">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious aria-disabled={currentPage === 1} href="#" />
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
            <PaginationNext
              aria-disabled={currentPage === totalPages}
              href="#"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
}
