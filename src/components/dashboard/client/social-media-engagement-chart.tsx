"use client";

import { useQuery } from "@tanstack/react-query";
import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export const socialEngagementLegend = [
  { label: "Engagement", color: "#125899" },
  { label: "Impressions", color: "#1E92FF" },
  { label: "Reach", color: "#A5D3FF" },
] as const;

export function SocialMediaEngagementChart() {
  const { data: metricsData } = useQuery({
    queryKey: ["social-media-engagement-chart"],
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
        `/api/client/metrics/get?serviceId=SOCIAL_MEDIA&startDate=${formatDate(monthStart)}&endDate=${formatDate(monthEnd)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch metrics");
      }
      return response.json();
    },
  });

  const { categories, engagements, impressions, reach } = useMemo(() => {
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
        categories: defaultCategories,
        engagements: new Array(defaultCategories.length).fill(0),
        impressions: new Array(defaultCategories.length).fill(0),
        reach: new Array(defaultCategories.length).fill(0),
      };
    }

    // Group data by weekday (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const weekdayData: Record<
      number,
      { engagements: number; impressions: number; reach: number }
    > = {
      0: { engagements: 0, impressions: 0, reach: 0 }, // Sunday
      1: { engagements: 0, impressions: 0, reach: 0 }, // Monday
      2: { engagements: 0, impressions: 0, reach: 0 }, // Tuesday
      3: { engagements: 0, impressions: 0, reach: 0 }, // Wednesday
      4: { engagements: 0, impressions: 0, reach: 0 }, // Thursday
      5: { engagements: 0, impressions: 0, reach: 0 }, // Friday
      6: { engagements: 0, impressions: 0, reach: 0 }, // Saturday
    };

    // Accumulate data by weekday
    for (const record of metricHistories) {
      const recordDate = new Date(record.entryDate);
      const dayOfWeek = recordDate.getDay();

      weekdayData[dayOfWeek].engagements +=
        Number(record.history?.engagements) || 0;
      weekdayData[dayOfWeek].impressions +=
        Number(record.history?.impressions) || 0;
      weekdayData[dayOfWeek].reach +=
        Number(record.history?.profile_visits) || 0;
    }

    const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const engagementData: number[] = [];
    const impressionData: number[] = [];
    const reachData: number[] = [];

    for (let i = 0; i < 7; i++) {
      engagementData.push(weekdayData[i].engagements);
      impressionData.push(weekdayData[i].impressions);
      reachData.push(weekdayData[i].reach);
    }

    return {
      categories: weekdayLabels,
      engagements: engagementData,
      impressions: impressionData,
      reach: reachData,
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
      },
    },
    colors: ["#125899", "#1E92FF", "#A5D3FF"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      colors: ["transparent"],
    },
    grid: {
      borderColor: "#e2e8f0",
      strokeDashArray: 4,
    },
    legend: {
      show: false,
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
        text: "Volume",
        style: { color: "#475569", fontWeight: 500 },
      },
    },
    tooltip: {
      theme: "light",
    },
  };

  const series = [
    {
      name: "Engagement",
      data: engagements,
    },
    {
      name: "Impressions",
      data: impressions,
    },
    {
      name: "Reach",
      data: reach,
    },
  ];

  return (
    <div className="h-64 w-full">
      <ApexChart
        height={256}
        options={chartOptions}
        series={series}
        type="bar"
        width="100%"
      />
    </div>
  );
}
