import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import type { ToolMessagePart } from "./types";

interface ServiceEntry {
  id: string;
  name: string;
  sectionsCount: number;
  sectionsPreview: string[];
  createdAt?: string;
}

interface ServicesToolOutput {
  success?: boolean;
  total?: number;
  totalSections?: number;
  averageSections?: number;
  data?: ServiceEntry[];
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

const renderSummary = (output: ServicesToolOutput) => {
  const badges: ReactNode[] = [];

  badges.push(<span key="total">Total: {output?.total ?? 0}</span>);

  if (output?.totalSections !== undefined) {
    badges.push(<span key="sections">Sections: {output.totalSections}</span>);
  }

  if (output?.averageSections !== undefined) {
    badges.push(<span key="avg">Avg sections: {output.averageSections}</span>);
  }

  return badges;
};

const renderServiceCard = (service: ServiceEntry) => {
  const created = formatDate(service.createdAt);

  return (
    <div
      className="rounded-lg border border-slate-200 bg-white/90 p-3 text-slate-900 text-sm shadow-sm"
      key={service.id}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-semibold">{service.name}</p>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 font-semibold text-[11px] text-slate-600">
          {service.sectionsCount} sections
        </span>
      </div>
      {service.sectionsPreview.length > 0 && (
        <p className="text-slate-500 text-xs">
          Highlights: {service.sectionsPreview.join(", ")}
        </p>
      )}
      {created && (
        <p className="text-[11px] text-slate-400">Created {created}</p>
      )}
    </div>
  );
};

export const renderSuperAdminServicesToolPart = (
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
          Fetching services for you...
        </div>
      );
    case "output-error":
      return (
        <div
          className={cn(bubbleClassName, "bg-red-50 text-red-900")}
          key={callId}
        >
          Error: {toolPart.errorText ?? "Failed to load services"}
        </div>
      );
    case "output-available": {
      const output = toolPart.output as ServicesToolOutput;

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
                {output.data.map((service) => renderServiceCard(service))}
              </div>
            ) : (
              <div className="text-slate-500 text-xs">No services found.</div>
            )}
          </div>
        </div>
      );
    }
    default:
      return null;
  }
};
