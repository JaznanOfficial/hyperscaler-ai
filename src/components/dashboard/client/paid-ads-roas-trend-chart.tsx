"use client";

import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const roasTrendData = [
  { day: "Day 5", actual: 1.4, target: 3 },
  { day: "Day 10", actual: 1.9, target: 3 },
  { day: "Day 15", actual: 2.6, target: 3 },
  { day: "Day 20", actual: 3.3, target: 3 },
  { day: "Day 25", actual: 3.1, target: 3 },
  { day: "Day 30", actual: 2.7, target: 3 },
];

const categories = roasTrendData.map((point) => point.day);

const series = [
  {
    name: "Actual ROAS",
    data: roasTrendData.map((point) => point.actual),
  },
  {
    name: "Target ROAS",
    data: roasTrendData.map((point) => point.target),
  },
];

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
  colors: ["#0ea5e9", "#94a3b8"],
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
    min: 0,
    max: 6,
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

export function PaidAdsRoasTrendChart() {
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
