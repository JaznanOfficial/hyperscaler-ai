"use client";

import { useQuery } from "@tanstack/react-query";
import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type MetricFilter = "all" | "email" | "reply" | "meetings";

const performanceConfig = {
  emailSent: { label: "Email Sent", color: "#7c3aed" },
  replies: { label: "Reply Generated", color: "#0ea5e9" },
  meetings: { label: "Meetings Booked", color: "#22c55e" },
};

export function PerformanceTimelineSection() {
  const [selectedMetric, setSelectedMetric] = useState<MetricFilter>("all");

  const { data: metricsData } = useQuery({
    queryKey: ["cold-email-performance-timeline"],
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
        `/api/client/metrics/get?serviceId=COLD_EMAIL&startDate=${formatDate(monthStart)}&endDate=${formatDate(monthEnd)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch metrics");
      }
      return response.json();
    },
  });

  const { timelineCategories, timelineSeries } = useMemo(() => {
    const metricHistories = metricsData?.metricHistories || [];

    if (metricHistories.length === 0) {
      const defaultWeekly = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      return {
        timelineCategories: defaultWeekly,
        timelineSeries: [
          {
            key: "email" as const,
            name: performanceConfig.emailSent.label,
            color: performanceConfig.emailSent.color,
            data: new Array(defaultWeekly.length).fill(0),
          },
          {
            key: "reply" as const,
            name: performanceConfig.replies.label,
            color: performanceConfig.replies.color,
            data: new Array(defaultWeekly.length).fill(0),
          },
          {
            key: "meetings" as const,
            name: performanceConfig.meetings.label,
            color: performanceConfig.meetings.color,
            data: new Array(defaultWeekly.length).fill(0),
          },
        ],
      };
    }

    // Group data by day of week
    const weekdayData: Record<
      number,
      { emailSent: number; replies: number; meetings: number }
    > = {
      0: { emailSent: 0, replies: 0, meetings: 0 }, // Sunday
      1: { emailSent: 0, replies: 0, meetings: 0 }, // Monday
      2: { emailSent: 0, replies: 0, meetings: 0 }, // Tuesday
      3: { emailSent: 0, replies: 0, meetings: 0 }, // Wednesday
      4: { emailSent: 0, replies: 0, meetings: 0 }, // Thursday
      5: { emailSent: 0, replies: 0, meetings: 0 }, // Friday
      6: { emailSent: 0, replies: 0, meetings: 0 }, // Saturday
    };

    // Accumulate data by weekday
    for (const record of metricHistories) {
      const recordDate = new Date(record.entryDate);
      const dayOfWeek = recordDate.getDay();
      const history = record.history as Record<string, string | number>;

      weekdayData[dayOfWeek].emailSent += Number(history?.emails_sent) || 0;
      weekdayData[dayOfWeek].replies += Number(history?.reply_rate) || 0;
      weekdayData[dayOfWeek].meetings += Number(history?.conversion_rate) || 0;
    }

    const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const emailSentData: number[] = [];
    const repliesData: number[] = [];
    const meetingsData: number[] = [];

    for (let i = 0; i < 7; i++) {
      emailSentData.push(weekdayData[i].emailSent);
      repliesData.push(weekdayData[i].replies);
      meetingsData.push(weekdayData[i].meetings);
    }

    return {
      timelineCategories: weekdayLabels,
      timelineSeries: [
        {
          key: "email" as const,
          name: performanceConfig.emailSent.label,
          color: performanceConfig.emailSent.color,
          data: emailSentData,
        },
        {
          key: "reply" as const,
          name: performanceConfig.replies.label,
          color: performanceConfig.replies.color,
          data: repliesData,
        },
        {
          key: "meetings" as const,
          name: performanceConfig.meetings.label,
          color: performanceConfig.meetings.color,
          data: meetingsData,
        },
      ],
    };
  }, [metricsData]);

  const timelineChartOptions: ApexOptions = {
    chart: {
      id: "performance-timeline",
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: "var(--font-outfit, 'Inter', sans-serif)",
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    colors: timelineSeries.map((series) => series.color),
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
      categories: timelineCategories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: new Array(timelineCategories.length).fill("#94a3b8"),
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
    legend: { show: false },
    tooltip: {
      theme: "light",
    },
  };

  const activeSeries =
    selectedMetric === "all"
      ? timelineSeries
      : timelineSeries.filter((series) => series.key === selectedMetric);

  const chartSeries = activeSeries.map(({ name, data }) => ({ name, data }));
  const chartOptions: ApexOptions = {
    ...timelineChartOptions,
    colors: activeSeries.map((series) => series.color),
  };

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-slate-900 text-sm">
            Performance Timeline
          </p>
          <p className="text-slate-500 text-xs">
            7-day trend comparison across key metrics.
          </p>
        </div>
        <Select
          onValueChange={(value) => setSelectedMetric(value as MetricFilter)}
          value={selectedMetric}
        >
          <SelectTrigger className="border-slate-200 px-3 py-1 font-medium text-slate-700 text-xs shadow-sm">
            <SelectValue placeholder="All key metrics" />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="all">All key metrics</SelectItem>
            <SelectItem value="email">Email Sent</SelectItem>
            <SelectItem value="reply">Reply Generated</SelectItem>
            <SelectItem value="meetings">Meetings Booked</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="h-72 w-full">
        <ApexChart
          height={288}
          options={chartOptions}
          series={chartSeries}
          type="line"
          width="100%"
        />
      </div>
      <div className="flex flex-wrap justify-center gap-4 text-center text-sm">
        {activeSeries.map((series) => (
          <div
            className="inline-flex items-center gap-2 text-slate-600"
            key={series.key}
          >
            <span
              className="size-2.5 rounded-full"
              style={{ backgroundColor: series.color }}
            />
            <span>{series.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
