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

    let queryStartDate: Date;
    let queryEndDate: Date;

    if (lastDays) {
      queryEndDate = new Date();
      queryEndDate.setUTCHours(23, 59, 59, 999);
      queryStartDate = new Date(queryEndDate);
      queryStartDate.setUTCDate(queryStartDate.getUTCDate() - (lastDays - 1));
      queryStartDate.setUTCHours(0, 0, 0, 0);
    } else if (startDate && endDate) {
      queryStartDate = parseIsoDate(startDate, false);
      queryEndDate = parseIsoDate(endDate, true);
    } else if (date) {
      queryStartDate = parseIsoDate(date, false);
      queryEndDate = parseIsoDate(date, true);
    } else {
      queryEndDate = new Date();
      queryEndDate.setUTCHours(23, 59, 59, 999);
      queryStartDate = new Date(queryEndDate);
      queryStartDate.setUTCDate(queryStartDate.getUTCDate() - 29);
      queryStartDate.setUTCHours(0, 0, 0, 0);
    }

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
        history: serviceMetrics.metricHistories.map((metric) => ({
          id: metric.id,
          serviceId: metric.serviceId,
          history: metric.history,
          entryDate: toIsoString(metric.entryDate),
          createdAt: toIsoString(metric.createdAt),
          updatedAt: toIsoString(metric.updatedAt),
        })),
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
      filtersApplied: {
        lastDays: lastDays ?? null,
        date: date ?? null,
        startDate: startDate ?? null,
        endDate: endDate ?? null,
      },
    };
  },
});
