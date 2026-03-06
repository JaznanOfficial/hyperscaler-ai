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

interface ClientServiceMetricsToolV2Filters {
  lastDays?: number;
  date?: string;
  startDate?: string;
  endDate?: string;
}

interface ClientServiceMetricsToolV2Record {
  id?: string;
  serviceId?: string;
  entryDate?: string;
  createdAt?: string;
  updatedAt?: string;
  history?: unknown;
}

interface ClientServiceMetricsToolV2Service {
  serviceId?: string;
  serviceName?: string;
  metrics?: Record<string, unknown>;
  history?: ClientServiceMetricsToolV2Record[];
}

interface ClientServiceMetricsToolV2Output {
  success?: boolean;
  total?: number;
  servicesCount?: number;
  data?: ClientServiceMetricsToolV2Service[];
  filtersApplied?: ClientServiceMetricsToolV2Filters;
  error?: string;
}

type ScopedClientServiceMetricsToolOutput =
  | ServiceScopeOutput
  | AllServicesScopeOutput;

export type ClientServiceMetricsToolOutput =
  | ScopedClientServiceMetricsToolOutput
  | { success?: boolean; error?: string };

const hasScopeField = (
  output: unknown
): output is ScopedClientServiceMetricsToolOutput =>
  Boolean(
    output &&
      typeof output === "object" &&
      "scope" in output &&
      typeof (output as { scope?: unknown }).scope === "string"
  );

const isV2Output = (
  output: unknown
): output is ClientServiceMetricsToolV2Output =>
  Boolean(
    output &&
      typeof output === "object" &&
      Array.isArray((output as ClientServiceMetricsToolV2Output).data)
  );

const toMetricFilterFromV2 = (
  filters?: ClientServiceMetricsToolV2Filters
): MetricFilter | undefined => {
  if (!filters) {
    return undefined;
  }

  if (filters.lastDays && filters.lastDays > 0) {
    return { type: "lastDays", lastDays: filters.lastDays };
  }

  if (filters.date) {
    return { type: "singleDate", start: filters.date, end: filters.date };
  }

  if (filters.startDate || filters.endDate) {
    return {
      start: filters.startDate,
      end: filters.endDate,
    };
  }

  return undefined;
};

const normalizeV2Record = (
  record: ClientServiceMetricsToolV2Record,
  fallbackId: string
): ServiceMetricRecord => ({
  id: record.id ?? fallbackId,
  entryDate:
    record.entryDate ??
    record.createdAt ??
    record.updatedAt ??
    new Date().toISOString(),
  history: record.history,
});

const normalizeV2Service = (
  service: ClientServiceMetricsToolV2Service,
  index: number
): AggregatedServiceMetrics => {
  const safeServiceId = service.serviceId ?? `SERVICE_${index + 1}`;
  const safeServiceName = service.serviceName ?? safeServiceId;
  const records = (service.history ?? []).map((record, recordIndex) =>
    normalizeV2Record(record, `${safeServiceId}-${recordIndex + 1}`)
  );

  return {
    serviceId: safeServiceId,
    serviceName: safeServiceName,
    records,
    totalRecords: records.length,
  };
};

const convertV2ToAllServicesOutput = (
  payload: ClientServiceMetricsToolV2Output
): AllServicesScopeOutput => {
  const services = (payload.data ?? []).map((service, index) =>
    normalizeV2Service(service, index)
  );

  return {
    success: payload.success ?? true,
    scope: "ALL_SERVICES",
    filters: toMetricFilterFromV2(payload.filtersApplied),
    totalServicesEvaluated: payload.servicesCount ?? services.length,
    totalServicesWithMetrics: services.filter(
      (service) => service.totalRecords > 0
    ).length,
    totalRecords:
      payload.total ??
      services.reduce((sum, service) => sum + service.totalRecords, 0),
    data: services,
  };
};

const formatDateOnly = (value?: string) => {
  if (!value) {
    return "";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  const month = parsed.getUTCMonth() + 1;
  const day = parsed.getUTCDate();
  const year = parsed.getUTCFullYear();

  return `${month}/${day}/${year}`;
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

const formatLabel = (label: string) =>
  label
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();

const renderInlineValue = (value: ReactNode) => (
  <span className="font-medium text-slate-900 text-sm">{value}</span>
);

const tryParseJsonString = (value: string) => {
  const trimmed = value.trim();

  if (!(trimmed && (trimmed.startsWith("{") || trimmed.startsWith("[")))) {
    return undefined;
  }

  try {
    return JSON.parse(trimmed);
  } catch {
    return undefined;
  }
};

const renderValue = (value: unknown): ReactNode => {
  if (value === null || value === undefined) {
    return <span className="text-slate-500">—</span>;
  }

  if (typeof value === "string") {
    const parsed = tryParseJsonString(value);
    return parsed !== undefined ? (
      renderValue(parsed)
    ) : (
      <span className="text-slate-900">{value}</span>
    );
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return <span className="text-slate-900">{String(value)}</span>;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return <span className="text-slate-500">No entries</span>;
    }

    const objectEntries = value.every(
      (entry) => entry && typeof entry === "object"
    );

    if (objectEntries) {
      return (
        <div className="space-y-3">
          {value.map((entry) => {
            const key = JSON.stringify(entry);
            return (
              <div className="rounded-xl bg-white/80 p-3 shadow-sm" key={key}>
                {renderCompactRecord(entry as Record<string, unknown>)}
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <ul className="list-disc pl-4 text-slate-700 text-sm">
        {value.map((entry) => {
          const key = typeof entry === "string" ? entry : JSON.stringify(entry);
          return <li key={key}>{renderValue(entry)}</li>;
        })}
      </ul>
    );
  }

  if (typeof value === "object") {
    return renderKeyValueList(value as Record<string, unknown>);
  }

  return <span className="text-slate-900">{String(value)}</span>;
};

const renderCompactRecord = (record: Record<string, unknown>) => (
  <dl className="space-y-2">
    {Object.entries(record).map(([key, value]) => (
      <div className="space-y-0.5" key={key}>
        <dt className="font-semibold text-[11px] text-slate-500 uppercase tracking-wide">
          {formatLabel(key)}
        </dt>
        <dd>{renderInlineValue(renderValue(value))}</dd>
      </div>
    ))}
  </dl>
);

const renderKeyValueList = (record: Record<string, unknown>) => (
  <div className="grid gap-3 sm:grid-cols-2">
    {Object.entries(record).map(([key, value]) => (
      <div className="rounded-xl bg-white/80 p-3 shadow-inner" key={key}>
        <p className="font-semibold text-[11px] text-slate-500 uppercase tracking-wide">
          {formatLabel(key)}
        </p>
        <div className="mt-1">{renderValue(value)}</div>
      </div>
    ))}
  </div>
);

const renderHistoryDetails = (history: unknown) => {
  const normalizedValue =
    typeof history === "string"
      ? (tryParseJsonString(history) ?? history)
      : history;

  if (normalizedValue === null || normalizedValue === undefined) {
    return <p className="text-slate-500 text-xs">No data recorded.</p>;
  }

  return <div className="text-sm">{renderValue(normalizedValue)}</div>;
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
  const service: AggregatedServiceMetrics = {
    serviceId: output.serviceId,
    serviceName: output.serviceName,
    records: output.data ?? [],
    totalRecords: output.totalRecords ?? output.data?.length ?? 0,
  };

  const hasRecords = service.totalRecords > 0;

  return (
    <div className={cn(bubbleClassName, "bg-slate-50 text-slate-900")}>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 font-semibold text-slate-600 text-xs">
          <span className="rounded-full bg-slate-200/80 px-2 py-0.5">
            {service.serviceName}
          </span>
          <span className="rounded-full bg-slate-200/60 px-2 py-0.5">
            Records: {service.totalRecords}
          </span>
          {filterSummary && (
            <span className="rounded-full bg-slate-200/60 px-2 py-0.5">
              {filterSummary}
            </span>
          )}
        </div>

        {hasRecords ? (
          renderServiceCard(service)
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
      const rawOutput = toolPart.output as
        | ClientServiceMetricsToolOutput
        | ClientServiceMetricsToolV2Output
        | undefined;
      const output = hasScopeField(rawOutput)
        ? rawOutput
        : isV2Output(rawOutput)
          ? convertV2ToAllServicesOutput(rawOutput)
          : (rawOutput as ClientServiceMetricsToolOutput | undefined);

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

      if (!hasScopeField(output)) {
        return (
          <div
            className={cn(bubbleClassName, "bg-red-50 text-red-900")}
            key={callId}
          >
            Error: Unsupported response format.
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
