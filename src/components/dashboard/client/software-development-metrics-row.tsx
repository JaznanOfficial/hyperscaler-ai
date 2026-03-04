"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

export function SoftwareDevelopmentMetricsRow() {
  const [todayDate, setTodayDate] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    setTodayDate(`${year}-${month}-${day}`);
  }, []);

  const { data: metricsData } = useQuery({
    queryKey: ["software-development-metrics", todayDate],
    queryFn: async () => {
      if (!todayDate) return null;
      const response = await fetch(
        `/api/client/metrics/get?serviceId=SOFTWARE_DEVELOPMENT&date=${todayDate}`
      );
      if (!response.ok) throw new Error("Failed to fetch metrics");
      return response.json();
    },
    enabled: !!todayDate,
  });

  const metrics = useMemo(() => {
    const metricHistory = metricsData?.metricHistories?.[0];
    const history = metricHistory?.history || {};

    const featuresImplemented = Number(history?.features_implemented) || 0;
    const bugsClosed = Number(history?.bugs_closed) || 0;
    const uptime = Number(history?.uptime) || 0;
    const testCoverage = Number(history?.test_coverage) || 0;

    return [
      { label: "Features This Week", value: featuresImplemented.toString() },
      { label: "Bugs Closed", value: bugsClosed.toString() },
      { label: "Uptime", value: `${uptime}%` },
      { label: "Test Coverage", value: `${testCoverage}%` },
    ];
  }, [metricsData]);

  return (
    <div className="grid gap-4 border-slate-200 border-b pb-6 text-base text-slate-900 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div className="space-y-1 text-left" key={metric.label}>
          <p className="font-medium text-gray-600 text-xs">{metric.label}</p>
          <p className="font-semibold text-lg leading-5">{metric.value}</p>
        </div>
      ))}
    </div>
  );
}
