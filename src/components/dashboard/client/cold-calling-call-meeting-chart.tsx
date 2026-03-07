"use client";

import { useQuery } from "@tanstack/react-query";
import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export const callMeetingLegend = [
  { label: "Calls that resulted in meetings", color: "#9E32DD" },
  { label: "Calls that didn't convert", color: "#D8ADF1" },
] as const;

export function ColdCallingCallMeetingChart() {
  const { data: metricsData } = useQuery({
    queryKey: ["cold-calling-call-meeting-chart"],
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
        `/api/client/metrics/get?serviceId=COLD_CALLING&startDate=${formatDate(monthStart)}&endDate=${formatDate(monthEnd)}`
      );
      if (!response.ok) throw new Error("Failed to fetch metrics");
      return response.json();
    },
  });

  const { categories, callsInMeetings, callsNotConverted } = useMemo(() => {
    const metricHistories = metricsData?.metricHistories || [];

    if (metricHistories.length === 0) {
      const defaultCategories = ["Week 1", "Week 2", "Week 3", "Week 4"];
      return {
        categories: defaultCategories,
        callsInMeetings: new Array(defaultCategories.length).fill(0),
        callsNotConverted: new Array(defaultCategories.length).fill(0),
      };
    }

    // Group data by week
    const today = new Date();
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

    const weeks = [
      { label: "Week 1", start: 1, end: 7 },
      { label: "Week 2", start: 8, end: 14 },
      { label: "Week 3", start: 15, end: 21 },
      { label: "Week 4", start: 22, end: 28 },
      { label: "Week 5", start: 29, end: 31 },
    ];

    const cats: string[] = [];
    const inMeetings: number[] = [];
    const notConverted: number[] = [];

    for (const week of weeks) {
      const weekRecords = metricHistories.filter(
        (record: {
          entryDate: string | Date;
          history?: Record<string, unknown>;
        }) => {
          const recordDate = new Date(record.entryDate);
          const dayOfMonth = recordDate.getDate();
          return dayOfMonth >= week.start && dayOfMonth <= week.end;
        }
      );

      cats.push(week.label);

      const totalCalls = weekRecords.reduce(
        (
          sum: number,
          record: {
            entryDate: string | Date;
            history?: Record<string, unknown>;
          }
        ) => {
          return sum + (Number(record.history?.calls_made) || 0);
        },
        0
      );

      const totalMeetings = weekRecords.reduce(
        (
          sum: number,
          record: {
            entryDate: string | Date;
            history?: Record<string, unknown>;
          }
        ) => {
          return sum + (Number(record.history?.meetings_booked) || 0);
        },
        0
      );

      inMeetings.push(totalMeetings);
      notConverted.push(totalCalls - totalMeetings);
    }

    const fallbackCategories = ["Week 1", "Week 2", "Week 3", "Week 4"];
    return {
      categories: cats.length > 0 ? cats : fallbackCategories,
      callsInMeetings:
        inMeetings.length > 0
          ? inMeetings
          : new Array(fallbackCategories.length).fill(0),
      callsNotConverted:
        notConverted.length > 0
          ? notConverted
          : new Array(fallbackCategories.length).fill(0),
    };
  }, [metricsData]);

  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: { show: false },
      fontFamily: "var(--font-outfit, 'Inter', sans-serif)",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        borderRadius: 6,
      },
    },
    colors: ["#9E32DD", "#D8ADF1"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
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
        text: "Calls",
        style: { color: "#475569", fontWeight: 500 },
      },
    },
    legend: { show: false },
    tooltip: {
      shared: true,
      intersect: false,
      theme: "light",
    },
    fill: {
      opacity: 1,
    },
  };

  const series = [
    {
      name: "Calls that resulted in meetings",
      data: callsInMeetings,
    },
    {
      name: "Calls that didn't convert",
      data: callsNotConverted,
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
