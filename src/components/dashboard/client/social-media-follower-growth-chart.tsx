"use client";

import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const followerCategories = [
  "Day 5",
  "Day 10",
  "Day 15",
  "Day 20",
  "Day 25",
  "Day 30",
];

const followerSeries = [
  {
    name: "Followers",
    data: [3, 8, 13, 17, 22, 30],
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
      shadeIntensity: 0.75,
      gradientToColors: ["#ECD6F8"],
      opacityFrom: 0.85,
      opacityTo: 0.1,
      stops: [0, 100],
    },
  },
  colors: ["#9E32DD"],
  dataLabels: {
    enabled: false,
  },
  grid: {
    borderColor: "#e2e8f0",
    strokeDashArray: 4,
  },
  xaxis: {
    categories: followerCategories,
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: {
      style: {
        colors: new Array(followerCategories.length).fill("#94a3b8"),
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
      text: "Growth",
      style: { color: "#475569", fontWeight: 500 },
    },
  },
  tooltip: {
    theme: "light",
  },
};

export function SocialMediaFollowerGrowthChart() {
  return (
    <div className="h-64 w-full">
      <ApexChart
        height={256}
        options={chartOptions}
        series={followerSeries}
        type="area"
        width="100%"
      />
    </div>
  );
}
