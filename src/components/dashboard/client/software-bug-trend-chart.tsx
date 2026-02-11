"use client";

import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const categories = ["Week 1", "Week 2", "Week 3", "Week 4"];

const series = [
  {
    name: "Opened",
    data: [12, 16, 10, 11],
  },
  {
    name: "Closed",
    data: [9, 11, 12, 13],
  },
];

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

export function SoftwareBugTrendChart() {
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
