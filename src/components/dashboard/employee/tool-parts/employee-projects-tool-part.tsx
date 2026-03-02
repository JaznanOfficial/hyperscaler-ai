import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import type { ToolMessagePart } from "./types";

export const renderEmployeeProjectsToolPart = (
  toolPart: ToolMessagePart,
  bubbleClassName: string
): ReactNode => {
  const callId = toolPart.toolCallId ?? "unknown";

  switch (toolPart.state) {
    case "input-streaming":
      return (
        <div
          className={cn(bubbleClassName, "bg-blue-50 text-blue-900")}
          key={callId}
        >
          Loading services...
        </div>
      );
    case "input-available":
      return (
        <div
          className={cn(bubbleClassName, "bg-blue-50 text-blue-900")}
          key={callId}
        >
          Gathering your project list...
        </div>
      );
    case "output-available": {
      const output = toolPart.output as {
        success?: boolean;
        total?: number;
        activeProjects?: number;
        statusCounts?: Record<string, number>;
        data?: Array<{
          id: string;
          clientId: string;
          status: string;
          assignedEmployeesCount?: number;
          servicesCount?: number;
          updatedAt?: string;
        }>;
      };

      const statusBadges = output?.statusCounts
        ? Object.entries(output.statusCounts)
        : [];

      return (
        <div
          className={cn(bubbleClassName, "bg-amber-50 text-amber-900")}
          key={callId}
        >
          <div className="space-y-3">
            <div className="flex flex-wrap gap-3 font-semibold text-xs">
              <span>Total: {output?.total ?? 0}</span>
              <span>Active: {output?.activeProjects ?? 0}</span>
              {statusBadges.map(([status, count]) => (
                <span key={status}>
                  {status}: {count}
                </span>
              ))}
            </div>

            {output?.data && output.data.length > 0 ? (
              <div className="space-y-2">
                {output.data.map((project) => (
                  <div
                    className="rounded border border-amber-200 bg-white p-3 text-slate-900 text-sm"
                    key={project.id}
                  >
                    <p className="font-semibold">
                      Project {project.id.slice(0, 8)}
                    </p>
                    <p className="text-slate-600 text-xs">
                      Client: {project.clientId.slice(0, 8)}
                    </p>
                    <p className="text-slate-500 text-xs">
                      Status: {project.status}
                    </p>
                    <p className="text-slate-500 text-xs">
                      Team members: {project.assignedEmployeesCount ?? 0} •
                      Services: {project.servicesCount ?? 0}
                    </p>
                    {project.updatedAt && (
                      <p className="text-[11px] text-slate-400">
                        Updated{" "}
                        {new Date(project.updatedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>No projects found.</p>
            )}
          </div>
        </div>
      );
    }
    case "output-error":
      return (
        <div
          className={cn(bubbleClassName, "bg-red-50 text-red-900")}
          key={callId}
        >
          Error: {toolPart.errorText ?? "Failed to fetch projects"}
        </div>
      );
    default:
      return null;
  }
};
