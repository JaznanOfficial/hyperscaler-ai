"use client";

import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type MetricFilter = "all" | "email" | "reply" | "meetings";

const weeklyPerformance = [
  { day: "Sun", emailSent: 40, replies: 8, meetings: 1 },
  { day: "Mon", emailSent: 80, replies: 20, meetings: 4 },
  { day: "Tue", emailSent: 110, replies: 32, meetings: 6 },
  { day: "Wed", emailSent: 140, replies: 56, meetings: 8 },
  { day: "Thu", emailSent: 160, replies: 70, meetings: 10 },
  { day: "Fri", emailSent: 180, replies: 85, meetings: 12 },
  { day: "Sat", emailSent: 190, replies: 92, meetings: 14 },
];

const performanceConfig = {
  emailSent: { label: "Email Sent", color: "#7c3aed" },
  replies: { label: "Reply Generated", color: "#0ea5e9" },
  meetings: { label: "Meetings Booked", color: "#22c55e" },
};

const timelineCategories = weeklyPerformance.map((point) => point.day);

const timelineSeries = [
  {
    key: "email" as const,
    name: performanceConfig.emailSent.label,
    color: performanceConfig.emailSent.color,
    data: weeklyPerformance.map((point) => point.emailSent),
  },
  {
    key: "reply" as const,
    name: performanceConfig.replies.label,
    color: performanceConfig.replies.color,
    data: weeklyPerformance.map((point) => point.replies),
  },
  {
    key: "meetings" as const,
    name: performanceConfig.meetings.label,
    color: performanceConfig.meetings.color,
    data: weeklyPerformance.map((point) => point.meetings),
  },
];

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

export function PerformanceTimelineSection() {
  const [selectedMetric, setSelectedMetric] = useState<MetricFilter>("all");

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
