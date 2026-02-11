"use client";

import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const categories = ["Week 1", "Week 2", "Week 3", "Week 4"];

const series = [
  {
    name: "Delivered",
    data: [16, 10, 13, 12],
  },
  {
    name: "Planned",
    data: [18, 12, 15, 8],
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
    },
  },
  colors: ["#1E92FF", "#A5D3FF"],
  dataLabels: { enabled: false },
  stroke: {
    show: true,
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
      text: "Features",
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

export function SoftwareFeaturesDeliveredChart() {
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
