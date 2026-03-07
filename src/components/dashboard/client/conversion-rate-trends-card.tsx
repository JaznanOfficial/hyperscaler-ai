"use client";

import { useQuery } from "@tanstack/react-query";
import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import type { CSSProperties } from "react";
import { useMemo } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  buildChartColors,
  buildLegendItems,
  PERIOD_LABELS,
  type ServiceSeries,
  summarizeConversionRates,
} from "./chart/conversion-rate-utils";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function ConversionRateTrendsCard() {
  // Fetch all active services' metrics for last 30 days
  const { data: metricsData } = useQuery({
    queryKey: ["conversion-rate-trends-30days"],
    queryFn: async () => {
      const response = await fetch("/api/client/metrics/all?lastDays=30");
      if (!response.ok) throw new Error("Failed to fetch metrics");
      return response.json();
    },
  });

  const { categories, series, colors, legendItems } = useMemo(() => {
    const allMetrics = metricsData?.data || [];
    const serviceSeries = summarizeConversionRates(allMetrics);
    const chartColors = buildChartColors(serviceSeries);

    return {
      categories: PERIOD_LABELS,
      series: serviceSeries,
      colors: chartColors,
      legendItems: buildLegendItems(serviceSeries, chartColors),
    } satisfies {
      categories: string[];
      series: ServiceSeries[];
      colors: string[];
      legendItems: { label: string; color: string }[];
    };
  }, [metricsData]);

  const chartOptions: ApexOptions = {
    chart: {
      id: "conversion-rate-trends",
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: "var(--font-outfit, 'Inter', sans-serif)",
    },
    stroke: {
      curve: "smooth",
      width: 2.5,
    },
    colors,
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      strokeWidth: 2,
      strokeColors: "#ffffff",
    },
    grid: {
      borderColor: "#e2e8f0",
      strokeDashArray: 4,
    },
    xaxis: {
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: new Array(categories.length).fill("#94a3b8"),
          fontSize: "12px",
        },
      },
      title: {
        text: "Day",
        offsetY: 60,
        style: { color: "#94a3b8", fontWeight: 500 },
      },
    },
    yaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        formatter: (value) => `${value}`,
        style: {
          colors: ["#94a3b8"],
          fontSize: "12px",
        },
      },
      title: {
        text: "Conversion Rate (%)",
        style: { color: "#475569", fontWeight: 500 },
      },
    },
    legend: { show: false },
    tooltip: {
      theme: "light",
      y: {
        formatter: (value) => `${value}%`,
      },
    },
  };

  return (
    <Card className="border-none bg-white shadow-sm">
      <CardContent className="space-y-6 px-1 lg:px-5">
        <div className="h-90 w-full">
          <ApexChart
            height={360}
            options={chartOptions}
            series={series}
            type="line"
            width="100%"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          {legendItems.map((item) => (
            <div className="inline-flex items-center gap-2" key={item.label}>
              <span
                className="size-3 rounded-full"
                style={{ backgroundColor: item.color } as CSSProperties}
              />
              <span className="text-slate-700">{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
