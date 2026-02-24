import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import type { ToolMessagePart } from "./types";

interface ClientEntry {
  id: string;
  name: string;
  email: string;
  companyName?: string;
  subscriptionPlan?: string;
  subscriptionStatus?: string;
  createdAt?: string;
}

interface ClientsToolOutput {
  success?: boolean;
  total?: number;
  statusCounts?: Record<string, number>;
  data?: ClientEntry[];
  error?: string;
}

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: "bg-emerald-100 text-emerald-700",
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

const renderSummary = (output: ClientsToolOutput) => {
  const summaryBadges: ReactNode[] = [];

  summaryBadges.push(<span key="total">Total: {output?.total ?? 0}</span>);

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

const renderClientCard = (client: ClientEntry) => {
  const badgeClass =
    STATUS_COLORS[client.subscriptionStatus ?? "UNKNOWN"] ??
    STATUS_COLORS.UNKNOWN;
  const joined = formatDate(client.createdAt);

  return (
    <div
      className="rounded-lg border border-slate-200 bg-white/90 p-3 text-slate-900 text-sm shadow-sm"
      key={client.id}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-semibold">{client.name}</p>
          <p className="text-slate-500 text-xs">{client.email}</p>
        </div>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 font-semibold text-[11px]",
            badgeClass
          )}
        >
          {client.subscriptionStatus ?? "UNKNOWN"}
        </span>
      </div>
      {client.companyName && (
        <p className="text-slate-600 text-xs">Company: {client.companyName}</p>
      )}
      {client.subscriptionPlan && (
        <p className="text-slate-500 text-xs">
          Plan: {client.subscriptionPlan}
        </p>
      )}
      {joined && <p className="text-[11px] text-slate-400">Joined {joined}</p>}
    </div>
  );
};

export const renderSuperAdminClientsToolPart = (
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
          Fetching clients for you...
        </div>
      );
    case "output-error":
      return (
        <div
          className={cn(bubbleClassName, "bg-red-50 text-red-900")}
          key={callId}
        >
          Error: {toolPart.errorText ?? "Failed to load clients"}
        </div>
      );
    case "output-available": {
      const output = toolPart.output as ClientsToolOutput;

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
                {output.data.map((client) => renderClientCard(client))}
              </div>
            ) : (
              <div className="text-slate-500 text-xs">No clients found.</div>
            )}
          </div>
        </div>
      );
    }
    default:
      return null;
  }
};
