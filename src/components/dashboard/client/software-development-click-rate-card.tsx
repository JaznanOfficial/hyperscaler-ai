"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { softwareClickRateData } from "./software-development-data";

export function SoftwareDevelopmentClickRateCard() {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-100 p-4">
      <div>
        <p className="font-semibold text-slate-900 text-sm">
          Overall Project Completion
        </p>
      </div>
      <ChartContainer className="mx-auto h-72 max-w-sm" config={{}}>
        <ResponsiveContainer height="100%" width="100%">
          <PieChart>
            <Pie
              data={softwareClickRateData}
              dataKey="value"
              innerRadius={90}
              outerRadius={120}
              paddingAngle={2}
              strokeWidth={0}
            >
              {softwareClickRateData.map((entry) => (
                <Cell fill={entry.color} key={entry.name} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-semibold text-3xl text-slate-900">46%</span>
          <span className="text-slate-500 text-xs">Click Rate</span>
        </div>
      </ChartContainer>
    </div>
  );
}
