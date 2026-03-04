"use client";

import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

import { Card, CardContent } from "@/components/ui/card";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const statusCards = [
  {
    label: "Active Services",
    value: "3",
    color: "text-sky-600",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-100",
    chartColor: "#0ea5e9",
  },
  {
    label: "On Track",
    value: "1",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-100",
    chartColor: "#10b981",
  },
  {
    label: "Needs Attention",
    value: "2",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-100",
    chartColor: "#f59e0b",
  },
  {
    label: "Time saved due to AI",
    value: "28hrs",
    subValue: "/week",
    color: "text-fuchsia-600",
    bgColor: "bg-fuchsia-50",
    borderColor: "border-fuchsia-100",
    chartColor: "#d946ef",
    isTimeSaved: true,
  },
];

export function OverallProgressCard() {
  const chartOptions: ApexOptions = {
    chart: {
      type: "radialBar" as const,
      sparkline: { enabled: true },
      animations: { enabled: true },
    },
    colors: ["#9E32DD"],
    labels: ["Growth"],
    stroke: {
      lineCap: "round",
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: "80%",
        },
        track: {
          background: "#e5e7eb",
          strokeWidth: "50%",
        },
        dataLabels: {
          show: true,
          value: {
            formatter: (val) => `${Math.round(Number(val))}%`,
            fontSize: "36px",
            fontWeight: 700,
            color: "#0f172a",
            offsetY: -10,
          },
          name: {
            show: true,
            offsetY: 20,
            color: "#475569",
            fontSize: "14px",
            fontWeight: 600,
          },
        },
      },
    },
  };

  const getSmallChartOptions = (color: string): ApexOptions => ({
    chart: {
      type: "area" as const,
      sparkline: { enabled: true },
      animations: { enabled: true },
    },
    colors: [color],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.1,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    tooltip: { enabled: false },
  });

  return (
    <Card className="rounded-3xl border border-slate-100 bg-white">
      <CardContent className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        {/* Left side - Main chart (hidden on mobile) */}
        <div className="flex-col items-center justify-center lg:flex lg:w-1/2">
          <div className="w-full">
            <ApexChart
              height={320}
              options={chartOptions}
              series={[73]}
              type="radialBar"
              width="100%"
            />
          </div>
          <div className="mx-auto flex w-70 items-center justify-between font-semibold text-slate-900 text-sm md:w-70 lg:w-70 xl:w-70">
            <span>0</span>
            <span>100</span>
          </div>
        </div>

        {/* Right side - Status cards grid */}
        <div className="w-full lg:w-1/2">
          <div className="grid grid-cols-2 gap-4">
            {statusCards.map((card) => (
              <div
                className={`rounded-2xl border ${card.borderColor} ${card.bgColor} p-4`}
                key={card.label}
              >
                <p className="mb-3 font-medium text-slate-700 text-xs">
                  {card.label}
                </p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className={`font-bold text-3xl ${card.color}`}>
                      {card.value}
                    </p>
                    {card.subValue && (
                      <p className={`text-xs ${card.color}`}>{card.subValue}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
