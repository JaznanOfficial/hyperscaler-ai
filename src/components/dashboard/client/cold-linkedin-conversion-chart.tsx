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
      // Get current month's start and today's date
      const today = new Date();
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

      const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      const response = await fetch(
        `/api/client/metrics/get?serviceId=LINKEDIN_OUTREACH&startDate=${formatDate(monthStart)}&endDate=${formatDate(today)}`
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

    // Get the month start date
    const startDate = new Date(sorted[0].entryDate);
    const monthStart = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      1
    );

    // Create 6 intervals: days 1-5, 6-10, 11-15, 16-20, 21-25, 26-30
    const intervals: Array<{
      dayLabel: string;
      startDay: number;
      endDay: number;
    }> = [
      { dayLabel: "Day 5", startDay: 1, endDay: 5 },
      { dayLabel: "Day 10", startDay: 6, endDay: 10 },
      { dayLabel: "Day 15", startDay: 11, endDay: 15 },
      { dayLabel: "Day 20", startDay: 16, endDay: 20 },
      { dayLabel: "Day 25", startDay: 21, endDay: 25 },
      { dayLabel: "Day 30", startDay: 26, endDay: 30 },
    ];

    // Group records by interval and calculate average rate
    const cats: string[] = [];
    const rates: number[] = [];

    for (const interval of intervals) {
      // Find all records that fall within this interval
      const recordsInInterval = sorted.filter((record) => {
        const recordDate = new Date(record.entryDate);
        const dayOfMonth = recordDate.getDate();
        return dayOfMonth >= interval.startDay && dayOfMonth <= interval.endDay;
      });

      cats.push(interval.dayLabel);

      if (recordsInInterval.length === 0) {
        // No data for this interval, use 0
        rates.push(0);
      } else {
        // Calculate average conversion rate for this interval
        const avgRate =
          recordsInInterval.reduce((sum, record) => {
            const history = record.history as Record<string, string | number>;
            const rate = Number(history?.positive_reply_rate) || 0;
            return sum + rate;
          }, 0) / recordsInInterval.length;
        rates.push(Math.round(avgRate));
      }
    }

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
