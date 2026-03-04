"use client";

import { useQuery } from "@tanstack/react-query";
import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function SoftwareBugTrendChart() {
  const { data: metricsData } = useQuery({
    queryKey: ["software-development-bugs-monthly"],
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
        `/api/client/metrics/get?serviceId=SOFTWARE_DEVELOPMENT&startDate=${formatDate(monthStart)}&endDate=${formatDate(monthEnd)}`
      );
      if (!response.ok) throw new Error("Failed to fetch metrics");
      return response.json();
    },
  });

  const { categories, series } = useMemo(() => {
    const metricHistories = metricsData?.metricHistories || [];

    // Calculate number of weeks in current month
    const today = new Date();
    const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const daysInMonth = monthEnd.getDate();
    const numWeeks = Math.ceil(daysInMonth / 7);

    // Create week labels dynamically
    const weekLabels = Array.from(
      { length: numWeeks },
      (_, i) => `Week ${i + 1}`
    );

    if (metricHistories.length === 0) {
      return {
        categories: weekLabels,
        series: [
          { name: "Opened", data: new Array(numWeeks).fill(0) },
          { name: "Closed", data: new Array(numWeeks).fill(0) },
        ],
      };
    }

    // Group data by week
    const weekData: Record<number, { opened: number[]; closed: number[] }> = {};
    for (let i = 1; i <= numWeeks; i++) {
      weekData[i] = { opened: [], closed: [] };
    }

    for (const record of metricHistories) {
      const recordDate = new Date(record.entryDate);
      const dayOfMonth = recordDate.getDate();
      const week = Math.ceil(dayOfMonth / 7);
      const history = record.history as Record<string, string | number>;

      const opened = Number(history?.bugs_opened) || 0;
      const closed = Number(history?.bugs_closed) || 0;

      if (week >= 1 && week <= numWeeks) {
        weekData[week].opened.push(opened);
        weekData[week].closed.push(closed);
      }
    }

    // Calculate weekly averages
    const openedData: number[] = [];
    const closedData: number[] = [];

    for (let week = 1; week <= numWeeks; week++) {
      const opened = weekData[week].opened;
      const closed = weekData[week].closed;

      const avgOpened =
        opened.length > 0
          ? Math.round(opened.reduce((a, b) => a + b, 0) / opened.length)
          : 0;
      const avgClosed =
        closed.length > 0
          ? Math.round(closed.reduce((a, b) => a + b, 0) / closed.length)
          : 0;

      openedData.push(avgOpened);
      closedData.push(avgClosed);
    }

    return {
      categories: weekLabels,
      series: [
        { name: "Opened", data: openedData },
        { name: "Closed", data: closedData },
      ],
    };
  }, [metricsData]);

  const chartOptions: ApexOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: "var(--font-outfit, 'Inter', sans-serif)",
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    colors: ["#ef4444", "#22c55e"],
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
        text: "Bugs",
        style: { color: "#475569", fontWeight: 500 },
      },
    },
    legend: {
      show: true,
      fontSize: "12px",
      labels: { colors: "#475569" },
    },
    tooltip: {
      theme: "light",
    },
  };

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
