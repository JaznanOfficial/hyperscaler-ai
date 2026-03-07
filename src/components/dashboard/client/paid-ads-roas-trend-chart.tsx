"use client";

import { useQuery } from "@tanstack/react-query";
import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function PaidAdsRoasTrendChart() {
  const { data: metricsData } = useQuery({
    queryKey: ["paid-ads-roas-trend"],
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
        `/api/client/metrics/get?serviceId=PAID_ADS&startDate=${formatDate(monthStart)}&endDate=${formatDate(monthEnd)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch metrics");
      }
      return response.json();
    },
  });

  const { categories, roasData } = useMemo(() => {
    const metricHistories = metricsData?.metricHistories || [];

    if (metricHistories.length === 0) {
      const defaultCategories = [
        "Day 5",
        "Day 10",
        "Day 15",
        "Day 20",
        "Day 25",
        "Day 30",
      ];
      return {
        categories: defaultCategories,
        roasData: new Array(defaultCategories.length).fill(0),
      };
    }

    // Sort by date
    const sorted = [...metricHistories].sort(
      (a, b) =>
        new Date(a.entryDate).getTime() - new Date(b.entryDate).getTime()
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

    // Group records by interval and calculate average ROAS
    const cats: string[] = [];
    const roas: number[] = [];

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
        roas.push(0);
      } else {
        // Calculate average ROAS for this interval
        // ROAS = (conversion_rate / total_costs) * 100
        const avgRoas =
          recordsInInterval.reduce((sum, record) => {
            const history = record.history as Record<
              string,
              Record<string, string | number>
            >;
            const metaData = history?.meta || {};
            const googleData = history?.google || {};

            const metaCosts = Number(metaData?.costs) || 0;
            const googleCosts = Number(googleData?.costs) || 0;
            const totalCosts = metaCosts + googleCosts;

            const metaConv = Number(metaData?.conversion_rate) || 0;
            const googleConv = Number(googleData?.conversion_rate) || 0;
            const avgConv = (metaConv + googleConv) / 2;

            // Simple ROAS calculation: conversion_rate / total_costs (normalized)
            const roasValue = totalCosts > 0 ? (avgConv / totalCosts) * 100 : 0;
            return sum + roasValue;
          }, 0) / recordsInInterval.length;

        roas.push(Math.round(avgRoas * 10) / 10); // Round to 1 decimal place
      }
    }

    return {
      categories: cats,
      roasData: roas,
    };
  }, [metricsData]);

  const chartOptions: ApexOptions = {
    chart: {
      id: "paid-ads-roas-trend",
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: "var(--font-outfit, 'Inter', sans-serif)",
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    colors: ["#0ea5e9"],
    dataLabels: { enabled: false },
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
        text: "ROAS",
        style: { color: "#475569", fontWeight: 500 },
      },
    },
    legend: {
      show: false,
    },
    tooltip: {
      theme: "light",
    },
  };

  const series = [
    {
      name: "ROAS",
      data: roasData,
    },
  ];

  return (
    <div className="h-64 w-full">
      <ApexChart
        height={256}
        options={chartOptions}
        series={series}
        type="line"
        width="100%"
      />
    </div>
  );
}
