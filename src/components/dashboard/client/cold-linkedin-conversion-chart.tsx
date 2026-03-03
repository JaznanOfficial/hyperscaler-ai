"use client";

import { useQuery } from "@tanstack/react-query";
import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const getChartOptions = (categories: string[]): ApexOptions => ({
  chart: {
    type: "area",
    toolbar: { show: false },
    fontFamily: "var(--font-outfit, 'Inter', sans-serif)",
  },
  stroke: {
    curve: "smooth",
    width: 3,
  },
  fill: {
    type: "gradient",
    gradient: {
      type: "vertical",
      shadeIntensity: 0.7,
      gradientToColors: ["#bfdbfe"],
      inverseColors: false,
      opacityFrom: 0.85,
      opacityTo: 0.1,
      stops: [0, 100],
    },
  },
  colors: ["#3b82f6"],
  dataLabels: {
    enabled: false,
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
  },
  yaxis: {
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: {
      style: {
        colors: ["#94a3b8"],
        fontSize: "12px",
      },
    },
    title: {
      text: "Conversion %",
      style: { color: "#475569", fontWeight: 500 },
    },
  },
  tooltip: {
    theme: "light",
    y: {
      formatter: (value) => `${value}%`,
    },
  },
});

export function ColdLinkedinConversionChart() {
  const { data: metricsData } = useQuery({
    queryKey: ["linkedin-conversion-trend"],
    queryFn: async () => {
      const response = await fetch(
        "/api/client/metrics/get?serviceId=LINKEDIN_OUTREACH&lastDays=30"
      );
      if (!response.ok) throw new Error("Failed to fetch metrics");
      return response.json();
    },
  });

  const { categories, conversionRates } = useMemo(() => {
    const metricHistories = metricsData?.metricHistories || [];

    if (metricHistories.length === 0) {
      return {
        categories: ["Day 5", "Day 10", "Day 15", "Day 20", "Day 25", "Day 30"],
        conversionRates: [4, 9, 13, 16, 19, 27],
      };
    }

    // Sort by date
    const sorted = [...metricHistories].sort(
      (a, b) =>
        new Date(a.entryDate).getTime() - new Date(b.entryDate).getTime()
    );

    // Extract dates and conversion rates
    const cats = sorted.map((record) => {
      const date = new Date(record.entryDate);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    });

    const rates = sorted.map((record) => {
      const history = record.history as Record<string, any>;
      const rate = Number(history?.positive_reply_rate) || 0;
      return Math.round(rate);
    });

    return {
      categories: cats,
      conversionRates: rates,
    };
  }, [metricsData]);

  const conversionSeries = [
    {
      name: "Conversion Rate",
      data: conversionRates,
    },
  ];

  const chartOptions = getChartOptions(categories);

  return (
    <div className="h-64 w-full">
      <ApexChart
        height={256}
        options={chartOptions}
        series={conversionSeries}
        type="area"
        width="100%"
      />
    </div>
  );
}
