import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import type { ToolMessagePart } from "./types";

interface MetricFilter {
  type?: string;
  label?: string;
  start?: string;
  end?: string;
  lastDays?: number;
}

interface ServiceMetricRecord {
  id: string;
  entryDate: string;
  history: unknown;
}

interface ServiceScopeOutput {
  success?: boolean;
  scope: "SERVICE";
  serviceId: string;
  serviceName: string;
  filters?: MetricFilter;
  totalRecords?: number;
  data?: ServiceMetricRecord[];
  error?: string;
}

interface AggregatedServiceMetrics {
  serviceId: string;
  serviceName: string;
  records: ServiceMetricRecord[];
  totalRecords: number;
}

interface AllServicesScopeOutput {
  success?: boolean;
  scope: "ALL_SERVICES";
  filters?: MetricFilter;
  totalServicesEvaluated?: number;
  totalServicesWithMetrics?: number;
  totalRecords?: number;
  data?: AggregatedServiceMetrics[];
  error?: string;
}

export type ClientServiceMetricsToolOutput =
  | ServiceScopeOutput
  | AllServicesScopeOutput
  | { success?: boolean; error?: string };

const formatDateOnly = (value?: string) => {
  if (!value) {
    return "";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleDateString();
};

const formatFilterSummary = (filters?: MetricFilter) => {
  if (!filters) {
    return "";
  }

  if (filters.type === "lastDays" && filters.lastDays) {
    return `Last ${filters.lastDays} days`;
  }

  if (filters.type === "singleDate" && filters.start) {
    return formatDateOnly(filters.start);
  }

  if (filters.start && filters.end) {
    return `${formatDateOnly(filters.start)} → ${formatDateOnly(filters.end)}`;
  }

  return filters.label ?? "Custom range";
};

const renderHistoryDetails = (history: unknown) => {
  if (history === null || history === undefined) {
    return <p className="text-slate-500 text-xs">No data recorded.</p>;
  }

  if (typeof history === "string" || typeof history === "number") {
    return (
      <p className="font-medium text-slate-700 text-xs">{String(history)}</p>
    );
  }

  return (
    <pre className="overflow-x-auto rounded bg-slate-900/90 p-2 text-slate-100 text-xs">
      {JSON.stringify(history, null, 2)}
    </pre>
  );
};

const renderServiceRecord = (record: ServiceMetricRecord) => (
  <div
    className="rounded-lg border border-slate-200 bg-white/95 p-3 text-slate-900 text-sm shadow-sm"
    key={record.id}
  >
    <div className="flex items-center justify-between gap-2 text-slate-500 text-xs">
      <span>Entry</span>
      <span className="font-semibold text-slate-700">
        {formatDateOnly(record.entryDate)}
      </span>
    </div>
    <div className="mt-2">{renderHistoryDetails(record.history)}</div>
  </div>
);

const renderServiceScope = (
  output: ServiceScopeOutput,
  bubbleClassName: string
) => {
  const filterSummary = formatFilterSummary(output.filters);
  const hasRecords = output.data && output.data.length > 0;

  return (
    <div className={cn(bubbleClassName, "bg-slate-50 text-slate-900")}>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 font-semibold text-slate-600 text-xs">
          <span className="rounded-full bg-slate-200/80 px-2 py-0.5">
            {output.serviceName} ({output.totalRecords ?? 0})
          </span>
          {filterSummary && (
            <span className="rounded-full bg-slate-200/60 px-2 py-0.5">
              {filterSummary}
            </span>
          )}
        </div>

        {hasRecords ? (
          <div className="max-h-105 space-y-2 overflow-y-auto pr-1">
            {output.data!.map((record) => renderServiceRecord(record))}
          </div>
        ) : (
          <p className="text-slate-500 text-sm">No metrics recorded.</p>
        )}
      </div>
    </div>
  );
};

const renderServiceCard = (service: AggregatedServiceMetrics) => (
  <div
    className="rounded-xl border border-slate-200 bg-white/95 p-3 text-slate-900 text-sm shadow-sm"
    key={service.serviceId}
  >
    <div className="flex flex-wrap items-center justify-between gap-2 font-semibold text-slate-600 text-xs">
      <span>{service.serviceName}</span>
      <span className="rounded-full bg-slate-200/80 px-2 py-0.5">
        {service.totalRecords} records
      </span>
    </div>
    {service.records.length > 0 ? (
      <div className="mt-3 space-y-2">
        {service.records.slice(0, 3).map((record) => (
          <div
            className="rounded-lg bg-slate-50 px-2 py-1 text-xs"
            key={record.id}
          >
            <p className="font-semibold text-slate-700">
              {formatDateOnly(record.entryDate)}
            </p>
            <div className="text-slate-500">
              {renderHistoryDetails(record.history)}
            </div>
          </div>
        ))}
        {service.records.length > 3 && (
          <p className="text-[11px] text-slate-400">
            +{service.records.length - 3} more entries
          </p>
        )}
      </div>
    ) : (
      <p className="text-slate-500 text-xs">
        No metrics recorded for this range.
      </p>
    )}
  </div>
);

const renderAllServicesScope = (
  output: AllServicesScopeOutput,
  bubbleClassName: string
) => {
  const filterSummary = formatFilterSummary(output.filters);
  const hasServices = output.data && output.data.length > 0;

  return (
    <div className={cn(bubbleClassName, "bg-slate-50 text-slate-900")}>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 font-semibold text-slate-600 text-xs">
          <span className="rounded-full bg-slate-200/80 px-2 py-0.5">
            Evaluated: {output.totalServicesEvaluated ?? 0}
          </span>
          <span className="rounded-full bg-emerald-100/90 px-2 py-0.5 text-emerald-700">
            With data: {output.totalServicesWithMetrics ?? 0}
          </span>
          {typeof output.totalRecords === "number" && (
            <span className="rounded-full bg-slate-200/60 px-2 py-0.5">
              Records: {output.totalRecords}
            </span>
          )}
          {filterSummary && (
            <span className="rounded-full bg-slate-200/60 px-2 py-0.5">
              {filterSummary}
            </span>
          )}
        </div>

        {hasServices ? (
          <div className="space-y-3">
            {output.data!.map((service) => renderServiceCard(service))}
          </div>
        ) : (
          <p className="text-slate-500 text-sm">
            No approved services produced metrics for this timeframe.
          </p>
        )}
      </div>
    </div>
  );
};

export const renderClientServiceMetricsToolPart = (
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
          Gathering service metrics...
        </div>
      );
    case "output-error":
      return (
        <div
          className={cn(bubbleClassName, "bg-red-50 text-red-900")}
          key={callId}
        >
          Error: {toolPart.errorText ?? "Failed to load service metrics."}
        </div>
      );
    case "output-available": {
      const output = toolPart.output as ClientServiceMetricsToolOutput;

      if (!output?.success) {
        return (
          <div
            className={cn(bubbleClassName, "bg-red-50 text-red-900")}
            key={callId}
          >
            Error: {output?.error ?? "Unable to retrieve service metrics."}
          </div>
        );
      }

      if (output.scope === "SERVICE") {
        return renderServiceScope(output, bubbleClassName);
      }

      if (output.scope === "ALL_SERVICES") {
        return renderAllServicesScope(output, bubbleClassName);
      }

      return (
        <div
          className={cn(bubbleClassName, "bg-red-50 text-red-900")}
          key={callId}
        >
          Error: Unsupported response format.
        </div>
      );
    }
    default:
      return null;
  }
};
