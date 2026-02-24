import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import type { ToolMessagePart } from "./types";

interface ClientProjectEntry {
  id: string;
  status: string;
  servicesCount: number;
  assignedTeamCount: number;
  createdAt?: string;
  updatedAt?: string;
  isActive?: boolean;
}

interface ClientProjectsToolOutput {
  success?: boolean;
  total?: number;
  activeProjects?: number;
  statusCounts?: Record<string, number>;
  data?: ClientProjectEntry[];
  error?: string;
}

const STATUS_COLORS: Record<string, string> = {
  APPROVED: "bg-emerald-100 text-emerald-700",
  PENDING: "bg-amber-100 text-amber-700",
  CANCELLED: "bg-rose-100 text-rose-700",
  UNKNOWN: "bg-slate-200 text-slate-700",
};

const formatDate = (value?: string) => {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed.toLocaleDateString();
};

const renderSummaryBadges = (output: ClientProjectsToolOutput) => {
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

const renderProjectCard = (project: ClientProjectEntry) => {
  const badgeClass = STATUS_COLORS[project.status] ?? STATUS_COLORS.UNKNOWN;
  const created = formatDate(project.createdAt);
  const updated = formatDate(project.updatedAt);

  return (
    <div
      className="rounded-lg border border-slate-200 bg-white/90 p-3 text-slate-900 text-sm shadow-sm"
      key={project.id}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-semibold">Project {project.id.slice(0, 8)}</p>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 font-semibold text-[11px]",
            badgeClass
          )}
        >
          {project.status ?? "UNKNOWN"}
        </span>
      </div>
      <p className="text-slate-500 text-xs">
        Services: {project.servicesCount ?? 0} • Team:{" "}
        {project.assignedTeamCount ?? 0}
      </p>
      {created && (
        <p className="text-[11px] text-slate-400">Created {created}</p>
      )}
      {updated && (
        <p className="text-[11px] text-slate-400">Updated {updated}</p>
      )}
    </div>
  );
};

export const renderClientProjectsToolPart = (
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
          Gathering your projects...
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
      const output = toolPart.output as ClientProjectsToolOutput;

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
