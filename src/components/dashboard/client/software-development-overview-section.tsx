"use client";

import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

import { completionPercent, teamStatuses } from "./software-development-data";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const radialOptions: ApexOptions = {
  chart: {
    type: "radialBar",
    sparkline: { enabled: true },
    fontFamily: "var(--font-outfit, 'Inter', sans-serif)",
  },
  plotOptions: {
    radialBar: {
      hollow: { size: "62%" },
      track: { background: "#e2e8f0" },
      dataLabels: {
        name: { show: false },
        value: {
          show: true,
          fontSize: "28px",
          fontWeight: 700,
          color: "#0f172a",
          formatter: (val) => `${Math.round(val)}%`,
        },
      },
    },
  },
  colors: ["#8b5cf6"],
  stroke: { lineCap: "round" },
};

export function SoftwareDevelopmentOverviewSection() {
  return (
    <div className="grid gap-6 rounded-2xl border border-slate-100 p-4 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
      <div className="flex flex-col items-center justify-center gap-3">
        <p className="text-slate-500 text-sm">Overall project completion</p>
        <div className="w-48">
          <ApexChart
            height={220}
            options={radialOptions}
            series={[completionPercent]}
            type="radialBar"
            width="100%"
          />
        </div>
        <p className="text-center text-slate-500 text-sm">
          {completionPercent}% Complete
        </p>
      </div>
      <div className="space-y-4">
        <p className="font-semibold text-slate-900 text-sm">
          Team Status Overview
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {teamStatuses.map((status) => (
            <div
              className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4 shadow-sm"
              key={status.label}
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-white shadow">
                  <status.icon className="size-5 text-violet-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">
                    {status.label}
                  </p>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 font-semibold text-xs ${status.badgeBg} ${status.badgeText}`}
                  >
                    {status.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
