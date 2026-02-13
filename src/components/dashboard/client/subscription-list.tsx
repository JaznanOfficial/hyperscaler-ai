"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  status: string;
  services: any[];
  createdAt: string;
}

interface ClientSubscriptionListProps {
  projects: Project[];
}

const statusStyles: Record<string, string> = {
  APPROVED: "bg-emerald-100 text-emerald-700",
  PENDING: "bg-amber-100 text-amber-700",
  CANCELLED: "bg-rose-100 text-rose-700",
};

const statusLabels: Record<string, string> = {
  APPROVED: "Active",
  PENDING: "Pending",
  CANCELLED: "Cancelled",
};

export function ClientSubscriptionList({
  projects,
}: ClientSubscriptionListProps) {
  if (projects.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
        <p className="text-slate-600">No subscriptions yet</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white">
      <ul className="divide-y divide-slate-200">
        {projects.map((project) => {
          const serviceName =
            project.services[0]?.serviceName || "Service Package";
          const serviceCount = project.services.length;

          return (
            <li className="px-4 py-4" key={project.id}>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-semibold text-base text-slate-900">
                      {serviceName}
                    </p>
                    <Badge
                      className={`rounded-full px-3 py-1 font-semibold text-[11px] ${statusStyles[project.status]}`}
                    >
                      {statusLabels[project.status]}
                    </Badge>
                  </div>
                  <p className="text-slate-500 text-sm">
                    {serviceCount} service{serviceCount > 1 ? "s" : ""} included
                  </p>
                  <div className="flex flex-col gap-1 text-slate-600 text-sm md:flex-row md:items-center md:gap-10">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="font-semibold text-lg text-slate-900"
                        style={{ fontFamily: "var(--font-outfit)" }}
                      >
                        $TBD
                      </span>
                      <span className="text-slate-500 text-sm">/mo</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <span>
                        {project.status === "APPROVED"
                          ? "Started:"
                          : "Requested:"}
                      </span>
                      <span className="font-semibold text-slate-900">
                        {new Date(project.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  className={`px-5 py-2 font-semibold text-sm md:self-center ${
                    project.status === "CANCELLED"
                      ? "border-0 bg-linear-to-r from-violet-800 to-fuchsia-500 text-white hover:brightness-110"
                      : "text-slate-900"
                  }`}
                  variant={
                    project.status === "CANCELLED" ? "default" : "outline"
                  }
                >
                  {project.status === "CANCELLED"
                    ? "Reactivate"
                    : "View Details"}
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
