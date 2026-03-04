"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function ResponseQualitySection() {
  const { data: metricsData } = useQuery({
    queryKey: ["cold-email-response-quality"],
    queryFn: async () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;

      const response = await fetch(
        `/api/client/metrics/get?serviceId=COLD_EMAIL&date=${dateStr}`
      );
      if (!response.ok) throw new Error("Failed to fetch metrics");
      return response.json();
    },
  });

  const { responseQualityData, positivePercentage } = useMemo(() => {
    const metricHistory = metricsData?.metricHistories?.[0];
    const history = metricHistory?.history || {};

    const positiveResponse = Number(history?.positive_response_rate) || 0;
    const negativeResponse = Number(history?.negative_response_rate) || 0;

    const data = [
      { name: "Positive", value: positiveResponse, color: "#15803d" },
      { name: "Negative", value: negativeResponse, color: "#b91c1c" },
    ];

    return {
      responseQualityData: data,
      positivePercentage: positiveResponse.toFixed(0),
    };
  }, [metricsData]);

  return (
    <div className="rounded-2xl border border-slate-100 p-4">
      <ChartContainer className="mx-auto h-72 max-w-sm" config={{}}>
        <ResponsiveContainer height="100%" width="100%">
          <PieChart>
            <Pie
              data={responseQualityData}
              dataKey="value"
              innerRadius={90}
              outerRadius={120}
              paddingAngle={2}
              strokeWidth={0}
            >
              {responseQualityData.map((entry) => (
                <Cell fill={entry.color} key={entry.name} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-semibold text-3xl text-slate-900">
            {positivePercentage}%
          </span>
          <span className="text-slate-500 text-xs">Positive Response</span>
        </div>
      </ChartContainer>
      <div className="space-y-2 text-sm">
        {responseQualityData.map((item) => (
          <div
            className="flex items-center justify-between text-slate-600"
            key={item.name}
          >
            <div className="flex items-center gap-2">
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.name} Response
            </div>
            <span className="font-semibold text-slate-900">
              {item.value.toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
