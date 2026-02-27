"use client";

import { useEffect, useMemo, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EmployeeProjectsPage() {
  const [projects, setProjects] = useState<EmployeeProjectItem[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch("/api/client-services");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();

        const servicePayload = Array.isArray(data.client_services)
          ? data.client_services
          : [];

        const formattedProjects: EmployeeProjectItem[] = servicePayload.map(
          (project: {
            id: string;
            clientId: string;
            clientName?: string;
            updatedAt: string;
            status: string;
            services?: Array<{
              serviceId?: string;
              serviceName?: string;
              serviceSlug?: string;
            }>;
          }) => {
            const services = Array.isArray(project.services)
              ? project.services.map((service) => ({
                  id: service.serviceId || service.serviceSlug || project.id,
                  name: service.serviceName || service.serviceSlug || "Service",
                }))
              : [];

            const serviceNames = services
              .map((service) => service.name)
              .filter(Boolean)
              .join(", ");

            let displayStatus: EmployeeProjectItem["status"] = "On-going";
            if (project.status === "CANCELLED") {
              displayStatus = "Cancelled";
            } else if (project.status === "COMPLETED") {
              displayStatus = "Completed";
            }

            return {
              id: project.id,
              clientId: project.clientId,
              name: serviceNames || `Project ${project.id.slice(0, 8)}`,
              owner: project.clientId.slice(0, 8).toUpperCase(),
              status: displayStatus,
              clientName: project.clientName || "Client",
            };
          }
        );

        setProjects(formattedProjects);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  const clientOptions = useMemo(() => {
    const groups = projects.reduce<Record<string, string>>((acc, project) => {
      if (!acc[project.clientId]) {
        acc[project.clientId] = project.clientName;
      }
      return acc;
    }, {});
    return Object.entries(groups).map(([id, name]) => ({ id, name }));
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedClientId === "all") {
      return projects;
    }
    return projects.filter((project) => project.clientId === selectedClientId);
  }, [projects, selectedClientId]);

  if (loading) {
    return (
      <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-hidden">
        <div className="flex flex-1 items-center justify-center">
          <p className="text-slate-500">Loading services...</p>
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

  if (filteredProjects.length === 0) {
    return (
      <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-hidden">
        <div className="flex flex-1 items-center justify-center">
          <p className="text-slate-500">No projects match this filter</p>
        </div>
      </section>
    );
  }

  const totalPages: number = 1;
  const currentPage: number = 1;

  return (
    <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-hidden">
      <div className="flex items-center justify-between border-slate-200 border-b bg-white px-4 py-3">
        <div>
          <p className="text-slate-400 text-xs uppercase tracking-[0.3em]">
            Filters
          </p>
          <p className="font-semibold text-slate-900">Client services</p>
        </div>
        <Select onValueChange={setSelectedClientId} value={selectedClientId}>
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Filter by client" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All clients</SelectItem>
            {clientOptions.map((client) => (
              <SelectItem key={client.id} value={client.id}>
                {client.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ul className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {filteredProjects.map((folder) => (
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
