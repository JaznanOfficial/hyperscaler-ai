import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import type { ToolMessagePart } from "./types";

interface ProjectEntry {
  id: string;
  clientId: string;
  status: string;
  assignedEmployees?: string[];
  assignedEmployeesCount?: number;
  services?: unknown[];
  servicesCount?: number;
  createdAt?: string;
  updatedAt?: string;
  isActive?: boolean;
}

interface ProjectsToolOutput {
  success?: boolean;
  total?: number;
  activeProjects?: number;
  statusCounts?: Record<string, number>;
  data?: ProjectEntry[];
  error?: string;
}

const STATUS_COLORS: Record<string, string> = {
  APPROVED: "bg-emerald-100 text-emerald-700",
  PENDING: "bg-amber-100 text-amber-700",
  CANCELLED: "bg-rose-100 text-rose-700",
};

const formatDateTime = (value?: string) => {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed.toLocaleString();
};

const renderSummaryBadges = (output: ProjectsToolOutput) => {
  const summaryBadges: ReactNode[] = [];

  summaryBadges.push(<span key="total">Total: {output?.total ?? 0}</span>);

  summaryBadges.push(
    <span key="active">Active: {output?.activeProjects ?? 0}</span>
  );

  if (output?.statusCounts) {
    for (const [status, count] of Object.entries(output.statusCounts)) {
      summaryBadges.push(
        <span className="uppercase" key={status}>
          {status}: {count}
        </span>
      );
    }
  }

  return summaryBadges;
};

const renderProjectCard = (project: ProjectEntry) => {
  const statusColorClass =
    STATUS_COLORS[project.status] ?? "bg-slate-200 text-slate-700";
  const updatedAt = formatDateTime(project.updatedAt);

  return (
    <div
      className="rounded-lg border border-slate-200 bg-white/90 p-3 text-slate-900 text-sm shadow-sm"
      key={project.id}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-semibold">
          Project {project.id?.slice(0, 8) ?? "Unknown"}
        </p>
        <span
          className={cn(
            "font-semibold",
            "px-2",
            "py-0.5",
            "rounded-full",
            "text-[11px]",
            statusColorClass
          )}
        >
          {project.status ?? "UNKNOWN"}
        </span>
      </div>
      <p className="text-slate-600 text-xs">
        Client: {project.clientId?.slice(0, 8) ?? "N/A"}
      </p>
      <p className="text-slate-500 text-xs">
        Team members: {project.assignedEmployeesCount ?? 0} • Services:{" "}
        {project.servicesCount ?? 0}
      </p>
      {updatedAt && (
        <p className="text-[11px] text-slate-400">Updated {updatedAt}</p>
      )}
    </div>
  );
};

export const renderSuperAdminProjectsToolPart = (
  toolPart: ToolMessagePart,
  bubbleClassName: string
): ReactNode => {
  const callId = toolPart.toolCallId ?? "unknown";

  switch (toolPart.state) {
    case "input-streaming":
    case "input-available":
      return (
        <div
          className={cn(bubbleClassName, "bg-blue-50 text-blue-900")}
          key={callId}
        >
          Fetching all projects for you...
        </div>
      );
    case "output-error":
      return (
        <div
          className={cn(bubbleClassName, "bg-red-50 text-red-900")}
          key={callId}
        >
          Error: {toolPart.errorText ?? "Failed to load projects"}
        </div>
      );
    case "output-available": {
      const output = toolPart.output as ProjectsToolOutput;

      if (!output?.success) {
        return (
          <div
            className={cn(bubbleClassName, "bg-red-50 text-red-900")}
            key={callId}
          >
            Error: {output?.error ?? "Unknown error"}
          </div>
        );
      }

      return (
        <div
          className={cn(bubbleClassName, "bg-slate-50 text-slate-900")}
          key={callId}
        >
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 font-semibold text-slate-600 text-xs">
              {renderSummaryBadges(output)}
            </div>

            {output?.data && output.data.length > 0 ? (
              <div className="max-h-105 space-y-2 overflow-y-auto pr-1">
                {output.data.map((project) => renderProjectCard(project))}
              </div>
            ) : (
              <div className="text-slate-500 text-xs">No projects found.</div>
            )}
          </div>
        </div>
      );
    }
    default:
      return null;
  }
};
