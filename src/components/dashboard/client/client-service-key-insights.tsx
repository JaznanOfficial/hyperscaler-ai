"use client";

import { useQuery } from "@tanstack/react-query";
import {
  AlertTriangle,
  CircleCheckBig,
  Info,
  type LucideIcon,
} from "lucide-react";
import { useMemo } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { useClientInsights } from "@/hooks/use-client-insights";
import { buildServiceInsightPayload } from "@/lib/service-insights";
import { cn } from "@/lib/utils";
import type { InsightSeverity } from "@/types/client-insights";

interface MetricHistoryRecord {
  entryDate?: string;
  history?: Record<string, unknown> | string | null;
}

interface MetricsResponse {
  metricHistories?: MetricHistoryRecord[];
}

interface ClientServiceKeyInsightsProps {
  serviceId: string;
  serviceName?: string;
  className?: string;
}

const severityStyles: Record<
  InsightSeverity,
  { icon: LucideIcon; iconBg: string; iconColor: string; detailColor: string }
> = {
  success: {
    icon: CircleCheckBig,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    detailColor: "text-emerald-600",
  },
  warning: {
    icon: AlertTriangle,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    detailColor: "text-amber-600",
  },
  info: {
    icon: Info,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
    detailColor: "text-slate-600",
  },
};

const parseHistory = (history?: MetricHistoryRecord["history"]) => {
  if (!history) {
    return {} as Record<string, unknown>;
  }

  if (typeof history === "string") {
    try {
      return JSON.parse(history) as Record<string, unknown>;
    } catch {
      return {} as Record<string, unknown>;
    }
  }

  if (typeof history === "object") {
    return history as Record<string, unknown>;
  }

  return {} as Record<string, unknown>;
};

const fetchServiceMetrics = async (serviceId: string) => {
  const response = await fetch(
    `/api/client/metrics/get?serviceId=${serviceId}&lastDays=7`
  );

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const message =
      typeof errorBody?.error === "string"
        ? errorBody.error
        : "Failed to load metrics";
    throw new Error(message);
  }

  return (await response.json()) as MetricsResponse;
};

const skeletonPlaceholders = ["first", "second", "third", "fourth"] as const;

const InsightsSkeleton = () => (
  <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
    {skeletonPlaceholders.map((placeholder) => (
      <div className="flex items-center gap-4" key={placeholder}>
        <Skeleton className="size-12 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    ))}
  </div>
);

export function ClientServiceKeyInsights({
  serviceId,
  serviceName,
  className,
}: ClientServiceKeyInsightsProps) {
  const {
    data: metricsData,
    isLoading: metricsLoading,
    error: metricsError,
  } = useQuery({
    queryKey: ["client-service-metric-history", serviceId],
    queryFn: () => fetchServiceMetrics(serviceId),
    enabled: Boolean(serviceId),
    staleTime: 1000 * 60 * 5,
  });

  const { summary, comparisonSummary } = useMemo(() => {
    const records = metricsData?.metricHistories?.map((record) => ({
      entryDate: record.entryDate,
      history: parseHistory(record.history),
    }));

    return buildServiceInsightPayload(records ?? []);
  }, [metricsData]);

  const insightsQuery = useClientInsights({
    serviceId,
    summary: summary ?? undefined,
    comparisonSummary,
    enabled: Boolean(summary),
  });

  const isLoading = metricsLoading || insightsQuery.isLoading;
  const error = metricsError || insightsQuery.error;
  const insights = insightsQuery.data?.insights ?? [];

  return (
    <section className={cn(className)}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="font-semibold text-slate-900 text-sm">Key Insights</p>
        <span className="text-slate-500 text-xs">AI generated</span>
      </div>

      {isLoading && <InsightsSkeleton />}

      {!isLoading && error && (
        <div className="rounded-lg bg-rose-50 px-4 py-3 text-rose-700 text-sm">
          {(error as Error).message || "Unable to load insights."}
        </div>
      )}

      {!(isLoading || error) && insights.length === 0 && (
        <div className="rounded-lg bg-slate-50 px-4 py-3 text-slate-600 text-sm">
          {summary
            ? "No noteworthy changes detected in the latest data."
            : `Insights will appear once we have enough recent data for ${serviceName ?? "this service"}.`}
        </div>
      )}

      {!(isLoading || error) && insights.length > 0 && (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {insights.map((insight) => {
            const style = severityStyles[insight.severity];
            const Icon = style.icon;

            return (
              <div
                className="flex min-h-16 items-center gap-4"
                key={insight.title}
              >
                <div className="flex shrink-0 items-center">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-lg border border-white/60 shadow-sm",
                      style.iconBg
                    )}
                  >
                    <Icon
                      aria-hidden
                      className={cn("h-5 w-5", style.iconColor)}
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-center gap-1">
                  <p className="font-semibold text-slate-900 text-sm leading-tight">
                    {insight.title}
                  </p>
                  <p className={cn("font-medium text-xs", style.detailColor)}>
                    {insight.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
