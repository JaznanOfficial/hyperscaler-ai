"use client";

import { useEffect, useState } from "react";
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

export default function EmployeeProjectsPage() {
  const [projects, setProjects] = useState<EmployeeProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/projects");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();

        const formattedProjects: EmployeeProjectItem[] = data.projects.map(
          (project: any) => ({
            id: project.id,
            name: `Project ${project.id.slice(0, 8)}`,
            owner: project.clientId.slice(0, 8),
            updated: new Date(project.updatedAt).toLocaleDateString(),
            status:
              project.status === "APPROVED"
                ? "On-going"
                : project.status === "CANCELLED"
                  ? "Cancelled"
                  : "On-going",
          })
        );

        setProjects(formattedProjects);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-hidden">
        <div className="flex flex-1 items-center justify-center">
          <p className="text-slate-500">Loading projects...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-hidden">
        <div className="flex flex-1 items-center justify-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-hidden">
        <div className="flex flex-1 items-center justify-center">
          <p className="text-slate-500">No projects assigned yet</p>
        </div>
      </section>
    );
  }

  const totalPages: number = 1;
  const currentPage: number = 1;

  return (
    <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <ul className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {projects.map((folder) => (
            <ProjectListItem folder={folder} key={folder.id} />
          ))}
        </ul>
      </div>
      {totalPages > 1 && (
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
      )}
    </section>
  );
}
