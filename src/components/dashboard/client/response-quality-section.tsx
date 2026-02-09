"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const responseQualityData = [
  { name: "Positive", value: 70, color: "#15803d" },
  { name: "Negative", value: 30, color: "#b91c1c" },
];

export function ResponseQualitySection() {
  return (
    <div className="rounded-2xl border border-slate-100 p-4">
      <ChartContainer className="mx-auto h-72 max-w-sm" config={{}}>
        <ResponsiveContainer height="100%" width="100%">
          <PieChart>
            <Pie
              data={responseQualityData}
              dataKey="value"
              innerRadius={90}
              outerRadius={120}
              paddingAngle={2}
              strokeWidth={0}
            >
              {responseQualityData.map((entry) => (
                <Cell fill={entry.color} key={entry.name} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-semibold text-3xl text-slate-900">70%</span>
          <span className="text-slate-500 text-xs">Positive Response</span>
        </div>
      </ChartContainer>
      <div className="space-y-2 text-sm">
        {responseQualityData.map((item) => (
          <div
            className="flex items-center justify-between text-slate-600"
            key={item.name}
          >
            <div className="flex items-center gap-2">
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.name} Response
            </div>
            <span className="font-semibold text-slate-900">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
