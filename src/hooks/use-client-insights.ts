"use client";

import { useQuery } from "@tanstack/react-query";

import type { ClientInsightsResponse } from "@/types/client-insights";

interface UseClientInsightsParams {
  serviceId?: string;
  summary?: Record<string, unknown>;
  comparisonSummary?: Record<string, unknown>;
  enabled?: boolean;
}

export function useClientInsights({
  serviceId,
  summary,
  comparisonSummary,
  enabled = true,
}: UseClientInsightsParams) {
  const hasPayload = Boolean(serviceId && summary);
  const summaryKey = JSON.stringify(summary ?? {});
  const comparisonKey = JSON.stringify(comparisonSummary ?? {});

  const payload = hasPayload
    ? {
        serviceId,
        summary,
        comparisonSummary,
      }
    : null;

  const query = useQuery<ClientInsightsResponse>({
    queryKey: ["client-insights", serviceId, summaryKey, comparisonKey],
    queryFn: async () => {
      if (!payload) {
        throw new Error("Missing insights payload");
      }

      const response = await fetch("/api/client/insights/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        const message =
          typeof errorBody?.error === "string"
            ? errorBody.error
            : "Failed to generate insights";
        throw new Error(message);
      }

      return (await response.json()) as ClientInsightsResponse;
    },
    enabled: Boolean(enabled && payload),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });

  return query;
}
