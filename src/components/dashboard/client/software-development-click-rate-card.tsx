"use client";

import { useQuery } from "@tanstack/react-query";
import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function SoftwareDevelopmentOverviewCard() {
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

  const completionPercent = useMemo(() => {
    const metricHistory = metricsData?.metricHistories?.[0];
    const history = metricHistory?.history || {};
    const completionStr = String(history?.project_completion || "0").replace(
      "%",
      ""
    );
    return Number(completionStr) || 0;
  }, [metricsData]);

  const radialOptions: ApexOptions = {
    chart: {
      type: "radialBar",
      sparkline: { enabled: true },
      fontFamily: "var(--font-outfit, 'Inter', sans-serif)",
    },
    plotOptions: {
      radialBar: {
        hollow: { size: "62%" },
        track: { background: "#e2e8f0" },
        dataLabels: {
          name: { show: false },
          value: {
            show: true,
            fontSize: "28px",
            fontWeight: 700,
            color: "#0f172a",
            formatter: (val) => `${Math.round(val)}%`,
          },
        },
      },
    },
    colors: ["#8b5cf6"],
    stroke: { lineCap: "round" },
  };

  return (
    <div className="space-y-4 rounded-2xl border border-slate-100 p-4">
      <div>
        <p className="font-semibold text-slate-900 text-sm">
          Overall Project Completion
        </p>
      </div>
      <div className="flex justify-center">
        <div className="w-48">
          <ApexChart
            height={220}
            options={radialOptions}
            series={[completionPercent]}
            type="radialBar"
            width="100%"
          />
        </div>
      </div>
      <p className="text-center text-slate-500 text-sm">
        {completionPercent}% Complete
      </p>
    </div>
  );
}
