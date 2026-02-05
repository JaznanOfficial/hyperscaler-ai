"use client";

import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const statusBreakdown = [
  {
    label: "Active Services",
    value: "3",

    badgeColor: "bg-sky-100 text-sky-700",
  },
  {
    label: "On Track",
    value: "1",

    badgeColor: "bg-emerald-100 text-emerald-700",
  },
  {
    label: "Needs Attention",
    value: "2",

    badgeColor: "bg-amber-100 text-amber-700",
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

  return (
    <Card className="rounded-3xl border border-slate-100 bg-white shadow-sm">
      <CardContent className="flex flex-col gap-6 lg:flex-row lg:items-center">
        <div className="flex-1">
          <div className="w-full">
            <ApexChart
              height={420}
              options={chartOptions}
              series={[73]}
              type="radialBar"
              width="100%"
            />
          </div>
          <div className="mx-auto flex w-[87%] items-center justify-between font-semibold text-slate-900 text-sm md:w-[77%] lg:w-[87%]">
            <span>0</span>
            <span>100</span>
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 text-slate-600 text-sm lg:max-w-xs">
          {statusBreakdown.map((status) => (
            <div
              className="flex items-center justify-between"
              key={status.label}
            >
              <div className="flex items-center gap-2 font-medium text-gray-700 text-xs">
                {status.label}
              </div>
              <span
                className={cn(
                  "min-w-9 rounded px-2 py-1 text-center font-semibold text-sm",
                  status.badgeColor
                )}
              >
                {status.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
