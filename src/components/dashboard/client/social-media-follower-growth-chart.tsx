"use client";

import { useQuery } from "@tanstack/react-query";
import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function SocialMediaFollowerGrowthChart() {
  const { data: metricsData } = useQuery({
    queryKey: ["social-media-follower-growth-trend"],
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
      if (!response.ok) throw new Error("Failed to fetch metrics");
      return response.json();
    },
  });

  const { categories, followerGrowth } = useMemo(() => {
    const metricHistories = metricsData?.metricHistories || [];

    if (metricHistories.length === 0) {
      return {
        categories: ["Day 5", "Day 10", "Day 15", "Day 20", "Day 25", "Day 30"],
        followerGrowth: [3, 8, 13, 17, 22, 30],
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

    // Group records by interval and calculate average follower growth
    const cats: string[] = [];
    const growth: number[] = [];

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
        growth.push(0);
      } else {
        // Calculate average follower growth for this interval
        const avgGrowth =
          recordsInInterval.reduce((sum, record) => {
            const history = record.history as Record<string, string | number>;
            const followers = Number(history?.followers_gained) || 0;
            return sum + followers;
          }, 0) / recordsInInterval.length;
        growth.push(Math.round(avgGrowth));
      }
    }

    return {
      categories: cats,
      followerGrowth: growth,
    };
  }, [metricsData]);

  const chartOptions: ApexOptions = {
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
        shadeIntensity: 0.75,
        gradientToColors: ["#ECD6F8"],
        opacityFrom: 0.85,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
    colors: ["#9E32DD"],
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
        text: "Growth",
        style: { color: "#475569", fontWeight: 500 },
      },
    },
    tooltip: {
      theme: "light",
    },
  };

  const series = [
    {
      name: "Followers",
      data: followerGrowth,
    },
  ];

  return (
    <div className="h-64 w-full">
      <ApexChart
        height={256}
        options={chartOptions}
        series={series}
        type="area"
        width="100%"
      />
    </div>
  );
}
