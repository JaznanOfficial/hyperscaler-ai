"use client";

import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const funnelStages = [
  { label: "Email Sent Rate", value: "100% (5,000 sent)", width: "100%" },
  { label: "Delivery Rate", value: "68% (3,400 delivered)", width: "78%" },
  { label: "Open Rate", value: "22% (1,100 opened)", width: "56%" },
  { label: "Reply Rate", value: "5% (250 replied)", width: "34%" },
  { label: "Meetings", value: "2% (100 meetings)", width: "20%" },
];

const funnelPercentages = funnelStages.map((stage) =>
  Number(stage.width.replace(/[^0-9.]/g, ""))
);

const funnelChartSeries = [
  {
    name: "Conversion",
    data: funnelStages.map((stage, index) => ({
      x: stage.label,
      y: funnelPercentages[index],
    })),
  },
];

const funnelChartOptions: ApexOptions = {
  chart: {
    type: "bar",
    toolbar: { show: false },
    fontFamily: "var(--font-outfit, 'Inter', sans-serif)",
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: "75%",
      isFunnel: true,
      distributed: true,
    },
  },
  grid: { show: false },
  colors: ["#a855f7"],
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      gradientToColors: ["#ec4899"],
      stops: [0, 100],
    },
  },
  dataLabels: {
    enabled: true,
    offsetX: -10,
    style: {
      colors: ["#0f172a"],
      fontSize: "12px",
      fontWeight: 600,
    },
    formatter: (_, opts) => funnelStages[opts.dataPointIndex]?.value ?? "",
  },
  xaxis: {
    labels: { show: false },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    labels: {
      style: { colors: ["#0f172a"], fontSize: "13px", fontWeight: 600 },
    },
  },
  tooltip: {
    y: {
      formatter: (_, opts) => funnelStages[opts.dataPointIndex]?.value ?? "",
    },
  },
};

export function ConversionFunnelSection() {
  return (
    <div className="rounded-2xl border border-slate-100 p-4">
      <div className="w-full">
        <ApexChart
          height={320}
          options={funnelChartOptions}
          series={funnelChartSeries}
          type="bar"
          width="100%"
        />
      </div>
    </div>
  );
}
