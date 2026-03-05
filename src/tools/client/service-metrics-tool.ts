import { tool } from "ai";
import z from "zod";
import { prisma } from "@/backend/config/prisma";
import { AuthGuard } from "@/backend/utils/auth-guard";

const toIsoString = (value: Date | string): string => {
  if (value instanceof Date) {
    return value.toISOString();
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime())
    ? new Date().toISOString()
    : parsed.toISOString();
};

const toOptionalIsoString = (value?: Date | string): string | undefined => {
  if (!value) {
    return undefined;
  }

  return toIsoString(value);
};

interface DateFilterInput {
  lastDays?: number;
  date?: string;
  startDate?: string;
  endDate?: string;
}

interface DateRangeResult {
  start: Date;
  end: Date;
  filtersApplied: {
    lastDays: number | null;
    date: string | null;
    startDate: string | null;
    endDate: string | null;
  };
}

const parseIsoDate = (value: string, endOfDay: boolean) => {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(
    Date.UTC(
      year,
      (month ?? 1) - 1,
      day ?? 1,
      endOfDay ? 23 : 0,
      endOfDay ? 59 : 0,
      endOfDay ? 59 : 0,
      endOfDay ? 999 : 0
    )
  );
};

const resolveDateRange = ({
  lastDays,
  date,
  startDate,
  endDate,
}: DateFilterInput): DateRangeResult => {
  const filtersApplied = {
    lastDays: lastDays ?? null,
    date: date ?? null,
    startDate: startDate ?? null,
    endDate: endDate ?? null,
  };

  if (lastDays && lastDays > 0) {
    const end = new Date();
    end.setUTCHours(23, 59, 59, 999);
    const start = new Date(end);
    start.setUTCDate(start.getUTCDate() - (lastDays - 1));
    start.setUTCHours(0, 0, 0, 0);

    return {
      start,
      end,
      filtersApplied,
    };
  }

  if (startDate && endDate) {
    return {
      start: parseIsoDate(startDate, false),
      end: parseIsoDate(endDate, true),
      filtersApplied,
    };
  }

  if (date) {
    return {
      start: parseIsoDate(date, false),
      end: parseIsoDate(date, true),
      filtersApplied,
    };
  }

  const end = new Date();
  end.setUTCHours(23, 59, 59, 999);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 29);
  start.setUTCHours(0, 0, 0, 0);

  return {
    start,
    end,
    filtersApplied,
  };
};

export const ClientServiceMetricsTool = tool({
  description:
    "Get all service metrics data for the signed-in client, including metric histories grouped by service. Supports flexible date filtering: query by last N days (e.g., 'last 7 days'), specific date (e.g., 'March 5, 2026'), or date range (e.g., 'from March 1 to March 5, 2026'). Defaults to last 30 days if no date filter is provided.",
  inputSchema: z.object({
    lastDays: z
      .number()
      .describe("Get metrics from the last N days")
      .optional(),
    date: z
      .string()
      .describe("Get metrics for a specific date (YYYY-MM-DD format)")
      .optional(),
    startDate: z
      .string()
      .describe("Get metrics from start date (YYYY-MM-DD format)")
      .optional(),
    endDate: z
      .string()
      .describe("Get metrics to end date (YYYY-MM-DD format)")
      .optional(),
  }),
  execute: async ({ lastDays, date, startDate, endDate }) => {
    const session = await AuthGuard.requireClient();

    const {
      start: queryStartDate,
      end: queryEndDate,
      filtersApplied,
    } = resolveDateRange({ lastDays, date, startDate, endDate });

    const clientServices = await prisma.clientService.findMany({
      where: {
        clientId: session.user.id,
        status: "APPROVED",
      },
    });

    const serviceNameMap = new Map<string, string>();
    for (const clientService of clientServices) {
      if (!clientService.services) {
        continue;
      }

      try {
        const services = JSON.parse(clientService.services) as Record<
          string,
          unknown
        >[];

        for (const service of services) {
          const serviceId =
            typeof service.serviceId === "string"
              ? service.serviceId
              : undefined;
          const serviceName =
            typeof service.serviceName === "string"
              ? service.serviceName
              : undefined;

          if (serviceId && serviceName && !serviceNameMap.has(serviceId)) {
            serviceNameMap.set(serviceId, serviceName);
          }
        }
      } catch (error) {
        console.error("Failed to parse client services", error);
      }
    }

    const metricHistories = await prisma.metricHistory.findMany({
      where: {
        clientId: session.user.id,
        entryDate: {
          gte: queryStartDate,
          lte: queryEndDate,
        },
      },
      orderBy: {
        entryDate: "asc",
      },
    });

    const groupedMetrics = new Map<
      string,
      {
        serviceId: string;
        serviceName: string;
        metricHistories: typeof metricHistories;
      }
    >();

    for (const history of metricHistories) {
      const serviceId = history.serviceId || "GENERAL";
      const serviceName = serviceNameMap.get(serviceId) ?? serviceId;
      const bucket = groupedMetrics.get(serviceId);

      if (bucket) {
        bucket.metricHistories.push(history);
      } else {
        groupedMetrics.set(serviceId, {
          serviceId,
          serviceName,
          metricHistories: [history],
        });
      }
    }

    const normalizedMetrics = Array.from(groupedMetrics.values()).map(
      (serviceMetrics) => ({
        serviceId: serviceMetrics.serviceId,
        serviceName: serviceMetrics.serviceName,
        metrics: {},
        history: serviceMetrics.metricHistories.map((metric) => {
          const { createdAt, updatedAt } = metric as {
            createdAt?: Date | string;
            updatedAt?: Date | string;
          };

          return {
            id: metric.id,
            serviceId: metric.serviceId,
            history: metric.history,
            entryDate: toIsoString(metric.entryDate),
            createdAt: toOptionalIsoString(createdAt),
            updatedAt: toOptionalIsoString(updatedAt),
          };
        }),
      })
    );

    const totalMetrics = normalizedMetrics.reduce(
      (sum: number, service) => sum + service.history.length,
      0
    );

    return {
      success: true,
      total: totalMetrics,
      servicesCount: normalizedMetrics.length,
      data: normalizedMetrics,
      filtersApplied,
    };
  },
});

export const ClientSingleServiceMetricsTool = tool({
  description:
    "Get single service metrics data for the signed-in client, including metric histories. Supports flexible date filtering: query by last N days (e.g., 'last 7 days'), specific date (e.g., 'March 5, 2026'), or date range (e.g., 'from March 1 to March 5, 2026'). Defaults to last 30 days if no date filter is provided.",
  inputSchema: z
    .object({
      serviceId: z
        .string()
        .trim()
        .describe("Exact service identifier, e.g. PAID_ADS")
        .optional(),
      serviceName: z
        .string()
        .trim()
        .describe("Human-readable service name, e.g. Paid Ads")
        .optional(),
      lastDays: z
        .number()
        .describe("Get metrics from the last N days")
        .optional(),
      date: z
        .string()
        .describe("Get metrics for a specific date (YYYY-MM-DD format)")
        .optional(),
      startDate: z
        .string()
        .describe("Get metrics from start date (YYYY-MM-DD format)")
        .optional(),
      endDate: z
        .string()
        .describe("Get metrics to end date (YYYY-MM-DD format)")
        .optional(),
    })
    .refine(
      (input) => Boolean(input.serviceId || input.serviceName),
      "Provide either serviceId or serviceName to fetch metrics."
    ),
  execute: async ({
    serviceId,
    serviceName,
    lastDays,
    date,
    startDate,
    endDate,
  }) => {
    const session = await AuthGuard.requireClient();

    const {
      start: queryStartDate,
      end: queryEndDate,
      filtersApplied,
    } = resolveDateRange({ lastDays, date, startDate, endDate });

    const clientServices = await prisma.clientService.findMany({
      where: {
        clientId: session.user.id,
        status: "APPROVED",
      },
    });

    const serviceNameMap = new Map<string, string>();

    for (const clientService of clientServices) {
      if (!clientService.services) {
        continue;
      }

      try {
        const services = JSON.parse(clientService.services) as Record<
          string,
          unknown
        >[];

        for (const service of services) {
          const parsedId =
            typeof service.serviceId === "string"
              ? service.serviceId
              : undefined;
          const parsedName =
            typeof service.serviceName === "string"
              ? service.serviceName
              : undefined;

          if (parsedId && parsedName && !serviceNameMap.has(parsedId)) {
            serviceNameMap.set(parsedId, parsedName);
          }
        }
      } catch (error) {
        console.error("Failed to parse client services", error);
      }
    }

    const normalizeName = (value: string) => value.trim().toLowerCase();

    let resolvedServiceId = serviceId;
    let resolvedServiceName = resolvedServiceId
      ? serviceNameMap.get(resolvedServiceId)
      : undefined;

    if (!resolvedServiceId && serviceName) {
      const lookup = normalizeName(serviceName);
      for (const [id, name] of serviceNameMap.entries()) {
        if (normalizeName(name) === lookup) {
          resolvedServiceId = id;
          resolvedServiceName = name;
          break;
        }
      }
    }

    if (!resolvedServiceId && serviceName) {
      resolvedServiceId = serviceName.toUpperCase().replace(/\s+/g, "_");
      resolvedServiceName = serviceName;
    }

    if (!resolvedServiceId) {
      return {
        success: false,
        error: "Service not found for this client.",
      };
    }

    const metrics = await prisma.metricHistory.findMany({
      where: {
        clientId: session.user.id,
        serviceId: resolvedServiceId,
        entryDate: {
          gte: queryStartDate,
          lte: queryEndDate,
        },
      },
      orderBy: {
        entryDate: "asc",
      },
    });

    const normalizedRecords = metrics.map((metric) => ({
      id: metric.id,
      serviceId: metric.serviceId,
      history: metric.history,
      entryDate: toIsoString(metric.entryDate),
      createdAt: toOptionalIsoString(
        (metric as { createdAt?: Date | string }).createdAt
      ),
      updatedAt: toOptionalIsoString(
        (metric as { updatedAt?: Date | string }).updatedAt
      ),
    }));

    const serviceEntry =
      normalizedRecords.length > 0
        ? [
            {
              serviceId: resolvedServiceId,
              serviceName:
                resolvedServiceName ??
                serviceNameMap.get(resolvedServiceId) ??
                resolvedServiceId,
              metrics: {},
              history: normalizedRecords,
            },
          ]
        : [];

    return {
      success: true,
      total: normalizedRecords.length,
      servicesCount: serviceEntry.length,
      data: serviceEntry,
      filtersApplied,
    };
  },
});
