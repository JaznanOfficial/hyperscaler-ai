import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import type { ToolMessagePart } from "./types";

interface EmployeeEntry {
  id: string;
  name: string;
  email: string;
  role: string;
  title?: string;
  expertise?: string;
  yearsExperience?: number;
  createdAt?: string;
}

interface EmployeesToolOutput {
  success?: boolean;
  total?: number;
  roleCounts?: Record<string, number>;
  averageExperience?: number;
  data?: EmployeeEntry[];
  error?: string;
}

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

const renderSummary = (output: EmployeesToolOutput) => {
  const summaryBadges: ReactNode[] = [];

  summaryBadges.push(<span key="total">Total: {output?.total ?? 0}</span>);

  if (output?.averageExperience !== undefined) {
    summaryBadges.push(
      <span key="avg">Avg exp: {output.averageExperience} yrs</span>
    );
  }

  if (output?.roleCounts) {
    for (const [role, count] of Object.entries(output.roleCounts)) {
      summaryBadges.push(
        <span className="uppercase" key={role}>
          {role}: {count}
        </span>
      );
    }
  }

  return summaryBadges;
};

const renderEmployeeCard = (employee: EmployeeEntry) => {
  const joined = formatDate(employee.createdAt);

  return (
    <div
      className="rounded-lg border border-slate-200 bg-white/90 p-3 text-slate-900 text-sm shadow-sm"
      key={employee.id}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-semibold">{employee.name}</p>
          <p className="text-slate-500 text-xs">{employee.email}</p>
        </div>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 font-semibold text-[11px] text-slate-600">
          {employee.role}
        </span>
      </div>
      {employee.title && (
        <p className="text-slate-600 text-xs">Title: {employee.title}</p>
      )}
      {employee.expertise && (
        <p className="text-slate-500 text-xs">
          Expertise: {employee.expertise}
        </p>
      )}
      {employee.yearsExperience !== undefined && (
        <p className="text-slate-500 text-xs">
          Experience: {employee.yearsExperience} yrs
        </p>
      )}
      {joined && <p className="text-[11px] text-slate-400">Joined {joined}</p>}
    </div>
  );
};

export const renderSuperAdminEmployeesToolPart = (
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
          Fetching employees for you...
        </div>
      );
    case "output-error":
      return (
        <div
          className={cn(bubbleClassName, "bg-red-50 text-red-900")}
          key={callId}
        >
          Error: {toolPart.errorText ?? "Failed to load employees"}
        </div>
      );
    case "output-available": {
      const output = toolPart.output as EmployeesToolOutput;

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
              {renderSummary(output)}
            </div>

            {output?.data && output.data.length > 0 ? (
              <div className="max-h-105 space-y-2 overflow-y-auto pr-1">
                {output.data.map((employee) => renderEmployeeCard(employee))}
              </div>
            ) : (
              <div className="text-slate-500 text-xs">No employees found.</div>
            )}
          </div>
        </div>
      );
    }
    default:
      return null;
  }
};
