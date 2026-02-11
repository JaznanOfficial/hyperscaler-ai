"use client";

import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const engagementCategories = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const engagementSeries = [
  {
    name: "Engagement",
    data: [42, 23, 24, 30, 38, 26, 25],
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

export function BrandingContentEngagementChart() {
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
