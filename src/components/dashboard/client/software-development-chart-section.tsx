"use client";

import { SoftwareBugTrendChart } from "./software-bug-trend-chart";
import { bugLegend } from "./software-development-data";
import { SoftwareFeaturesDeliveredChart } from "./software-features-delivered-chart";

export function SoftwareDevelopmentChartSection() {
  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4 rounded-2xl border border-slate-100 p-4">
        <div>
          <p className="font-semibold text-slate-900 text-sm">
            Features Delivered (Week over Week)
          </p>
          <p className="text-slate-500 text-xs">
            Weekly feature delivery tracking.
          </p>
        </div>
        <SoftwareFeaturesDeliveredChart />
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="inline-flex items-center gap-2 text-slate-600">
            <span
              className="size-2.5 rounded-full"
              style={{ backgroundColor: "#1E92FF" }}
            />
            <span>Delivered</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-2xl border border-slate-100 p-4">
        <div>
          <p className="font-semibold text-slate-900 text-sm">
            Bugs: Open vs Closed
          </p>
          <p className="text-slate-500 text-xs">
            Weekly visibility into bug creation and closure trends.
          </p>
        </div>
        <SoftwareBugTrendChart />
        <div className="flex flex-wrap gap-4 text-sm">
          {bugLegend.map((legend) => (
            <div
              className="inline-flex items-center gap-2 text-slate-600"
              key={legend.label}
            >
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: legend.color }}
              />
              <span>{legend.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
