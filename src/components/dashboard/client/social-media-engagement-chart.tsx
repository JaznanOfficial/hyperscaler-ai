"use client";

import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const engagementCategories = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const engagementSeries = [
  {
    name: "Engagement",
    data: [420, 310, 365, 450, 470, 510, 330],
  },
  {
    name: "Impressions",
    data: [500, 380, 420, 520, 540, 600, 360],
  },
  {
    name: "Reach",
    data: [460, 340, 370, 480, 500, 560, 320],
  },
];

const chartOptions: ApexOptions = {
  chart: {
    type: "bar",
    toolbar: { show: false },
    fontFamily: "var(--font-outfit, 'Inter', sans-serif)",
  },
  plotOptions: {
    bar: {
      columnWidth: "45%",
      endingShape: "rounded",
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

export const socialEngagementLegend = [
  { label: "Engagement", color: "#125899" },
  { label: "Impressions", color: "#1E92FF" },
  { label: "Reach", color: "#A5D3FF" },
] as const;

export function SocialMediaEngagementChart() {
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
