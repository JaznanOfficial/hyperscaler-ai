"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  type EmployeeProjectItem,
  ProjectListItem,
} from "@/components/employee/project-list-item";

type ClientInfo = {
  id: string;
  name: string;
  email: string;
  displayId: string;
};

export default function ClientProjectsPage() {
  const params = useParams();
  const [client, setClient] = useState<ClientInfo | null>(null);
  const [projects, setProjects] = useState<EmployeeProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchClientProjects() {
      try {
        const response = await fetch(`/api/employee/clients/${params.clientId}/projects`);
        if (!response.ok) {
          throw new Error("Failed to fetch client projects");
        }
        const data = await response.json();
        
        setClient(data.client);

        const formattedProjects: EmployeeProjectItem[] = data.projects.map(
          (project: any) => {
            const serviceNames = (project.services || [])
              .map((s: any) => s.serviceName)
              .filter(Boolean)
              .join(", ");
            
            return {
              id: project.id,
              name: serviceNames || `Project ${project.id.slice(0, 8)}`,
              owner: data.client.displayId,
              updated: new Date(project.updatedAt).toLocaleDateString(),
              status:
                project.status === "APPROVED"
                  ? "On-going"
                  : project.status === "CANCELLED"
                    ? "Cancelled"
                    : "On-going",
              clientId: data.client.id,
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

    if (params.clientId) {
      fetchClientProjects();
    }
  }, [params.clientId]);

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

  if (!client) {
    return (
      <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-hidden">
        <div className="flex flex-1 items-center justify-center">
          <p className="text-slate-500">Client not found</p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-hidden">
      <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-slate-400 text-xs uppercase tracking-wide">
          {client.displayId}
        </p>
        <h1 className="font-semibold text-2xl text-slate-900">{client.name}</h1>
        <p className="text-slate-500 text-sm">{client.email}</p>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-2xl border border-slate-200 bg-white">
          <p className="text-slate-500">No projects assigned yet</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <ul className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {projects.map((project) => (
              <ProjectListItem folder={project} key={project.id} />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
