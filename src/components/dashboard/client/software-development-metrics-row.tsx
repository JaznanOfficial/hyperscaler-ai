"use client";

import { summaryMetrics } from "./software-development-data";

export function SoftwareDevelopmentMetricsRow() {
  return (
    <div className="grid gap-4 border-slate-200 border-b pb-6 text-base text-slate-900 sm:grid-cols-2 lg:grid-cols-4">
      {summaryMetrics.map((metric) => (
        <div className="space-y-1 text-left" key={metric.label}>
          <p className="font-medium text-gray-600 text-xs">{metric.label}</p>
          <p className="font-semibold text-lg leading-5">{metric.value}</p>
        </div>
      ))}
    </div>
  );
}
