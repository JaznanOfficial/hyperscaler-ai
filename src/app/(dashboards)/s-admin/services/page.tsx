import Link from "next/link";

import { ServiceList } from "@/components/admin/service-list";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function SuperAdminServicesPage() {
  const totalPages: number = 5;
  const currentPage: number = 1;

  return (
    <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-hidden">
      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
        <div>
          <h1 className="font-semibold text-lg text-slate-900">Services</h1>
          <p className="text-slate-500 text-sm">
            Manage, configure, and launch automation offerings.
          </p>
        </div>
        <Button asChild className="cursor-pointer">
          <Link href="/s-admin/services/create">Create service</Link>
        </Button>
      </div>
      <div className="mt-4 flex-1 overflow-y-auto">
        <ServiceList />
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
