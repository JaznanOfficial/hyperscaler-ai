"use client";

import { useQuery } from "@tanstack/react-query";
import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function BrandingContentEngagementChart() {
  const { data: metricsData } = useQuery({
    queryKey: ["branding-content-engagement"],
    queryFn: async () => {
      const today = new Date();
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      const response = await fetch(
        `/api/client/metrics/get?serviceId=BRAND_CONTENT&startDate=${formatDate(monthStart)}&endDate=${formatDate(monthEnd)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch metrics");
      }
      return response.json();
    },
  });

  const { engagementCategories, engagementSeries } = useMemo(() => {
    const metricHistories = metricsData?.metricHistories || [];

    if (metricHistories.length === 0) {
      const defaultCategories = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
      ];
      return {
        engagementCategories: defaultCategories,
        engagementSeries: [
          {
            name: "Engagement",
            data: new Array(defaultCategories.length).fill(0),
          },
        ],
      };
    }

    // Group data by day of week
    const weekdayData: Record<number, number[]> = {
      0: [], // Sunday
      1: [], // Monday
      2: [], // Tuesday
      3: [], // Wednesday
      4: [], // Thursday
      5: [], // Friday
      6: [], // Saturday
    };

    // Collect engagement rates by weekday
    for (const record of metricHistories) {
      const recordDate = new Date(record.entryDate);
      const dayOfWeek = recordDate.getDay();
      const history = record.history as Record<string, string | number>;
      const engagementRate = Number(history?.content_engagement_rate) || 0;

      weekdayData[dayOfWeek].push(engagementRate);
    }

    // Calculate average engagement for each weekday
    const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const engagementData: number[] = [];

    for (let i = 0; i < 7; i++) {
      const values = weekdayData[i];
      if (values.length > 0) {
        const average = values.reduce((a, b) => a + b, 0) / values.length;
        engagementData.push(Math.round(average));
      } else {
        engagementData.push(0);
      }
    }

    return {
      engagementCategories: weekdayLabels,
      engagementSeries: [
        {
          name: "Engagement",
          data: engagementData,
        },
      ],
    };
  }, [metricsData]);

  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      fontFamily: "var(--font-outfit, 'Inter', sans-serif)",
    },
    plotOptions: {
      bar: {
        columnWidth: "45%",
        borderRadius: 8,
      },
    },
    colors: ["#9E32DD"],
    dataLabels: { enabled: false },
    grid: {
      borderColor: "#e2e8f0",
      strokeDashArray: 4,
    },
    xaxis: {
      categories: engagementCategories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: new Array(engagementCategories.length).fill("#94a3b8"),
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        formatter: (value) => `${value}%`,
        style: {
          colors: ["#94a3b8"],
          fontSize: "12px",
        },
      },
      title: {
        text: "Engagement %",
        style: { color: "#475569", fontWeight: 500 },
      },
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: (value) => `${value}%`,
      },
    },
  };

  return (
    <div className="h-64 w-full">
      <ApexChart
        height={256}
        options={chartOptions}
        series={engagementSeries}
        type="bar"
        width="100%"
      />
    </div>
  );
}
