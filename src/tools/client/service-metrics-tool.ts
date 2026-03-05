import { tool } from "ai";
import { headers } from "next/headers";
import z from "zod";

import { AuthGuard } from "@/backend/utils/auth-guard";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const DEFAULT_LAST_DAYS = 7;

const MetricsInputSchema = z
  .object({
    serviceId: z.string().trim().min(1, "serviceId cannot be empty").optional(),
    serviceName: z
      .string()
      .trim()
      .min(1, "serviceName cannot be empty")
      .optional(),
    date: z
      .string()
      .regex(DATE_PATTERN, "Use YYYY-MM-DD format for date")
      .optional(),
    startDate: z
      .string()
      .regex(DATE_PATTERN, "Use YYYY-MM-DD format for startDate")
      .optional(),
    endDate: z
      .string()
      .regex(DATE_PATTERN, "Use YYYY-MM-DD format for endDate")
      .optional(),
    lastDays: z
      .number()
      .int("lastDays must be an integer")
      .positive("lastDays must be positive")
      .max(365, "lastDays cannot exceed 365")
      .optional(),
  })
  .superRefine((value, ctx) => {
    if (
      (value.startDate && !value.endDate) ||
      (!value.startDate && value.endDate)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Provide both startDate and endDate to use a custom range.",
        path: [value.startDate ? "endDate" : "startDate"],
      });
    }
  });

type MetricsInput = z.infer<typeof MetricsInputSchema>;

interface DateRangeResult {
  start: Date;
  end: Date;
  label: string;
  filterType: "singleDate" | "range" | "lastDays";
  days?: number;
}

interface ServiceReference {
  serviceId: string;
  serviceName: string;
}

interface NormalizedMetricHistory {
  id: string;
  entryDate: string;
  history: unknown;
}

const toMidnight = (date: Date) => {
  const cloned = new Date(date);
  cloned.setHours(0, 0, 0, 0);
  return cloned;
};

const toEndOfDay = (date: Date) => {
  const cloned = new Date(date);
  cloned.setHours(23, 59, 59, 999);
  return cloned;
};

const parseDateString = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);
  const parsed = new Date(year, (month ?? 1) - 1, day ?? 1);

  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Invalid date: ${value}`);
  }

  return parsed;
};

const resolveDateRange = (input: MetricsInput): DateRangeResult => {
  if (input.lastDays) {
    const days = input.lastDays;
    const end = toEndOfDay(new Date());
    const start = toMidnight(new Date(end));
    start.setDate(start.getDate() - (days - 1));

    return {
      start,
      end,
      filterType: "lastDays",
      label: `Last ${days} days`,
      days,
    };
  }

  if (input.startDate && input.endDate) {
    const start = toMidnight(parseDateString(input.startDate));
    const end = toEndOfDay(parseDateString(input.endDate));

    if (start > end) {
      throw new Error("startDate cannot be after endDate");
    }

    return {
      start,
      end,
      filterType: "range",
      label: `${input.startDate} to ${input.endDate}`,
    };
  }

  if (input.date) {
    const start = toMidnight(parseDateString(input.date));
    const end = toEndOfDay(parseDateString(input.date));

    return {
      start,
      end,
      filterType: "singleDate",
      label: input.date,
    };
  }

  const fallbackEnd = toEndOfDay(new Date());
  const fallbackStart = toMidnight(new Date(fallbackEnd));
  fallbackStart.setDate(fallbackStart.getDate() - (DEFAULT_LAST_DAYS - 1));

  return {
    start: fallbackStart,
    end: fallbackEnd,
    filterType: "lastDays",
    label: `Last ${DEFAULT_LAST_DAYS} days (default)`,
    days: DEFAULT_LAST_DAYS,
  };
};

const normalizeMetricHistories = (
  metricHistories: Array<{
    id: string;
    entryDate: string | Date;
    history: unknown;
  }>
): NormalizedMetricHistory[] =>
  metricHistories.map((metricHistory) => ({
    id: metricHistory.id,
    entryDate:
      typeof metricHistory.entryDate === "string"
        ? metricHistory.entryDate
        : metricHistory.entryDate.toISOString(),
    history: metricHistory.history,
  }));

const toServiceArray = (value: unknown): ServiceReference[] => {
  const parsedValue = (() => {
    if (!value) {
      return [];
    }

    if (typeof value === "string") {
      try {
        return JSON.parse(value) as unknown;
      } catch {
        return [];
      }
    }

    return value;
  })();

  if (!Array.isArray(parsedValue)) {
    return [];
  }

  return parsedValue
    .map((service, index) => {
      if (!service || typeof service !== "object") {
        return null;
      }

      const serviceRecord = service as Record<string, unknown>;
      const serviceId =
        typeof serviceRecord.serviceId === "string"
          ? serviceRecord.serviceId
          : "";
      const serviceName =
        typeof serviceRecord.serviceName === "string"
          ? serviceRecord.serviceName
          : `Service ${index + 1}`;

      if (!serviceId) {
        return null;
      }

      return {
        serviceId,
        serviceName,
      } satisfies ServiceReference;
    })
    .filter((service): service is ServiceReference =>
      Boolean(service?.serviceId)
    );
};

const collectUniqueServices = (
  clientServices: Array<{ services: unknown }>
): ServiceReference[] => {
  const serviceMap = new Map<string, ServiceReference>();

  for (const clientService of clientServices) {
    const services = toServiceArray(clientService.services);

    for (const service of services) {
      if (!serviceMap.has(service.serviceId)) {
        serviceMap.set(service.serviceId, service);
      }
    }
  }

  return Array.from(serviceMap.values());
};

const buildQueryParams = (dateRange: DateRangeResult): URLSearchParams => {
  const params = new URLSearchParams();

  if (dateRange.filterType === "lastDays" && dateRange.days) {
    params.append("lastDays", dateRange.days.toString());
  } else if (dateRange.filterType === "range") {
    const startDate = dateRange.start.toISOString().split("T")[0];
    const endDate = dateRange.end.toISOString().split("T")[0];
    params.append("startDate", startDate);
    params.append("endDate", endDate);
  } else if (dateRange.filterType === "singleDate") {
    const date = dateRange.start.toISOString().split("T")[0];
    params.append("date", date);
  }
  return params;
};

const normalizeServiceToken = (value?: string | null) => {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return undefined;
  }

  const sanitized = trimmed.toLowerCase();
  const invalidTokens = new Set([
    "all",
    "all services",
    "string",
    "service",
    "service id",
    "serviceid",
    "service name",
    "servicename",
    "none",
    "n/a",
  ]);

  if (invalidTokens.has(sanitized)) {
    return undefined;
  }

  return trimmed;
};

export const ClientServiceMetricsTool = tool({
  description:
    "Fetch service metrics for the signed-in client. Use this for any request about service updates, stats, insights, or progress — it automatically handles a specific service when provided or falls back to all approved services.",
  inputSchema: MetricsInputSchema,
  execute: async (rawInput) => {
    await AuthGuard.requireClient();
    const input = MetricsInputSchema.parse(rawInput ?? {});
    const dateRange = resolveDateRange(input);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const baseDateParams = buildQueryParams(dateRange);

    const headerStore = await Promise.resolve(headers());
    const cookieHeader = headerStore.get("cookie") ?? undefined;
    const requestHeaders: HeadersInit | undefined = cookieHeader
      ? { Cookie: cookieHeader }
      : undefined;

    const fetchJson = async <T>(url: string): Promise<T> => {
      const response = await fetch(url, {
        headers: requestHeaders,
        cache: "no-store",
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Failed to fetch metrics (${response.status} ${response.statusText}): ${errorBody || "Unknown error"}`
        );
      }

      return (await response.json()) as T;
    };

    const fetchAvailableServices = async (): Promise<ServiceReference[]> => {
      const url = `${appUrl}/api/client/client-services`;
      const data = await fetchJson<{
        clientServices: Array<{ services: unknown }>;
      }>(url);
      return collectUniqueServices(data.clientServices);
    };

    const availableServices = await fetchAvailableServices();

    const requestedServiceId = normalizeServiceToken(input.serviceId);
    const requestedServiceName = normalizeServiceToken(input.serviceName);

    let resolvedService: ServiceReference | undefined;

    if (requestedServiceId) {
      resolvedService = availableServices.find(
        (service) => service.serviceId === requestedServiceId
      );

      if (!(resolvedService || requestedServiceName)) {
        throw new Error(
          `No approved service found for ID "${requestedServiceId}". Please verify the ID or provide the service name.`
        );
      }
    }

    if (!resolvedService && requestedServiceName) {
      resolvedService = availableServices.find(
        (service) =>
          service.serviceName.toLowerCase() ===
          requestedServiceName.toLowerCase()
      );

      if (!resolvedService) {
        throw new Error(
          `No approved service found matching "${requestedServiceName}". Please verify the name or provide the service ID.`
        );
      }
    }

    if (resolvedService) {
      const params = new URLSearchParams(baseDateParams);
      params.append("serviceId", resolvedService.serviceId);
      const queryString = params.toString();
      const url = `${appUrl}/api/client/metrics/get${
        queryString ? `?${queryString}` : ""
      }`;

      const data = await fetchJson<{
        metricHistories: Array<{
          id: string;
          entryDate: string | Date;
          history: unknown;
        }>;
      }>(url);
      const metrics = normalizeMetricHistories(data.metricHistories);

      return {
        success: true,
        scope: "SERVICE" as const,
        serviceId: resolvedService.serviceId,
        serviceName: resolvedService.serviceName,
        filters: {
          type: dateRange.filterType,
          label: dateRange.label,
          start: dateRange.start.toISOString(),
          end: dateRange.end.toISOString(),
          lastDays:
            dateRange.filterType === "lastDays" ? dateRange.days : undefined,
        },
        totalRecords: metrics.length,
        data: metrics,
      };
    }

    const params = new URLSearchParams(baseDateParams);
    const queryString = params.toString();
    const allUrl = `${appUrl}/api/client/metrics/all${
      queryString ? `?${queryString}` : ""
    }`;

    const data = await fetchJson<{
      data: Array<{
        serviceId: string;
        serviceName: string;
        metricHistories: Array<{
          id: string;
          entryDate: string | Date;
          history: unknown;
        }>;
      }>;
    }>(allUrl);

    const filteredServiceMetrics = data.data.map((service) => ({
      serviceId: service.serviceId,
      serviceName: service.serviceName,
      records: normalizeMetricHistories(service.metricHistories),
      totalRecords: service.metricHistories.length,
    }));

    return {
      success: true,
      scope: "ALL_SERVICES" as const,
      filters: {
        type: dateRange.filterType,
        label: dateRange.label,
        start: dateRange.start.toISOString(),
        end: dateRange.end.toISOString(),
        lastDays:
          dateRange.filterType === "lastDays" ? dateRange.days : undefined,
      },
      totalServicesEvaluated: filteredServiceMetrics.length,
      totalServicesWithMetrics: filteredServiceMetrics.length,
      totalRecords: filteredServiceMetrics.reduce(
        (acc, service) => acc + service.totalRecords,
        0
      ),
      data: filteredServiceMetrics,
    };
  },
});
