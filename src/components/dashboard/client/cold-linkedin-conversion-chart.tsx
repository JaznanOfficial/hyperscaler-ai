"use client";

import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const conversionCategories = [
  "Day 5",
  "Day 10",
  "Day 15",
  "Day 20",
  "Day 25",
  "Day 30",
];

const conversionSeries = [
  {
    name: "Conversion Rate",
    data: [4, 9, 13, 16, 19, 27],
  },
];

const chartOptions: ApexOptions = {
  chart: {
    type: "area",
    toolbar: { show: false },
    fontFamily: "var(--font-outfit, 'Inter', sans-serif)",
  },
  stroke: {
    curve: "smooth",
    width: 3,
  },
  fill: {
    type: "gradient",
    gradient: {
      type: "vertical",
      shadeIntensity: 0.7,
      gradientToColors: ["#bfdbfe"],
      inverseColors: false,
      opacityFrom: 0.85,
      opacityTo: 0.1,
      stops: [0, 100],
    },
  },
  colors: ["#3b82f6"],
  dataLabels: {
    enabled: false,
  },
  grid: {
    borderColor: "#e2e8f0",
    strokeDashArray: 4,
  },
  xaxis: {
    categories: conversionCategories,
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: {
      style: {
        colors: new Array(conversionCategories.length).fill("#94a3b8"),
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
      text: "Conversion %",
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

export function ColdLinkedinConversionChart() {
  return (
    <div className="h-64 w-full">
      <ApexChart
        height={256}
        options={chartOptions}
        series={conversionSeries}
        type="area"
        width="100%"
      />
    </div>
  );
}
