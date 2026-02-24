import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import type { ToolMessagePart } from "./types";

interface ClientPackageEntry {
  id: string;
  subscriptionId: string | null;
  packageName: string;
  status: string;
  amountFormatted: string;
  amountCents: number;
  createdAt?: string;
}

interface ClientPackagesToolOutput {
  success?: boolean;
  total?: number;
  activePackages?: number;
  totalMonthlySpend?: string;
  statusCounts?: Record<string, number>;
  data?: ClientPackageEntry[];
  error?: string;
}

const STATUS_COLORS: Record<string, string> = {
  PAID: "bg-emerald-100 text-emerald-700",
  UNPAID: "bg-amber-100 text-amber-700",
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

const renderSummaryBadges = (output: ClientPackagesToolOutput) => {
  const summaryBadges: ReactNode[] = [];

  summaryBadges.push(<span key="total">Total: {output?.total ?? 0}</span>);

  summaryBadges.push(
    <span key="active">Active: {output?.activePackages ?? 0}</span>
  );

  if (output?.totalMonthlySpend) {
    summaryBadges.push(
      <span key="spend">Monthly spend: {output.totalMonthlySpend}</span>
    );
  }

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

const renderPackageCard = (pkg: ClientPackageEntry) => {
  const badgeClass = STATUS_COLORS[pkg.status] ?? STATUS_COLORS.UNKNOWN;
  const created = formatDate(pkg.createdAt);

  return (
    <div
      className="rounded-lg border border-slate-200 bg-white/90 p-3 text-slate-900 text-sm shadow-sm"
      key={pkg.id}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-semibold">{pkg.packageName}</p>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 font-semibold text-[11px]",
            badgeClass
          )}
        >
          {pkg.status ?? "UNKNOWN"}
        </span>
      </div>
      <p className="text-slate-500 text-xs">
        Subscription ID: {pkg.subscriptionId ?? "N/A"}
      </p>
      <p className="font-semibold text-base text-slate-800">
        {pkg.amountFormatted}
      </p>
      {created && (
        <p className="text-[11px] text-slate-400">Purchased {created}</p>
      )}
    </div>
  );
};

export const renderClientPackagesToolPart = (
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
          Fetching your packages...
        </div>
      );
    case "output-error":
      return (
        <div
          className={cn(bubbleClassName, "bg-red-50 text-red-900")}
          key={callId}
        >
          Error: {toolPart.errorText ?? "Failed to load packages"}
        </div>
      );
    case "output-available": {
      const output = toolPart.output as ClientPackagesToolOutput;

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
                {output.data.map((pkg) => renderPackageCard(pkg))}
              </div>
            ) : (
              <div className="text-slate-500 text-xs">
                No packages purchased yet.
              </div>
            )}
          </div>
        </div>
      );
    }
    default:
      return null;
  }
};
