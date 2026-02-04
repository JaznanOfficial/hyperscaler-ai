"use client"

import dynamic from "next/dynamic"
import type { ApexOptions } from "apexcharts"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false })

const statusBreakdown = [
  {
    label: "Active Services",
    value: "3",
    dotColor: "#38bdf8",
    badgeColor: "bg-sky-100 text-sky-700",
  },
  {
    label: "On Track",
    value: "1",
    dotColor: "#34d399",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
  {
    label: "Needs Attention",
    value: "2",
    dotColor: "#fbbf24",
    badgeColor: "bg-amber-100 text-amber-700",
  },
]

export function OverallProgressCard() {
  const chartOptions: ApexOptions = {
    chart: {
      type: "radialBar" as const,
      sparkline: { enabled: true },
      animations: { enabled: true },
    },
    colors: ["#d946ef"],
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
  }

  return (
    <Card className="rounded-3xl border border-slate-100 bg-white shadow-sm">
      <CardContent className="flex flex-col gap-6 lg:flex-row lg:items-center">
        <div className="flex-1">
          <div className="w-full">
            <ApexChart options={chartOptions} series={[73]} type="radialBar" width="100%" height={420} />
          </div>
          <div className="mt-2 w-[87%] mx-auto flex items-center justify-between text-sm font-semibold text-slate-900">
            <span>0</span>
            <span>100</span>
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 text-sm text-slate-600 lg:max-w-xs">
          {statusBreakdown.map((status) => (
            <div key={status.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-medium text-slate-800">
                <span
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: status.dotColor }}
                  aria-hidden
                />
                {status.label}
              </div>
              <span className={cn("min-w-9 rounded-full px-2 py-1 text-center text-sm font-semibold", status.badgeColor)}>
                {status.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
