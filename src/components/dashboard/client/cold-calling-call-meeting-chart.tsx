"use client";

import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const categories = ["Week 1", "Week 2", "Week 3", "Week 4"];

const series = [
  {
    name: "Calls that resulted in meetings",
    data: [90, 60, 110, 95],
  },
  {
    name: "Calls that didn't convert",
    data: [120, 100, 120, 105],
  },
];

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

export const callMeetingLegend = [
  { label: "Calls that resulted in meetings", color: "#9E32DD" },
  { label: "Calls that didn't convert", color: "#D8ADF1" },
] as const;

export function ColdCallingCallMeetingChart() {
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
