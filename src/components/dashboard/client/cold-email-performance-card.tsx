"use client";

import { useQuery } from "@tanstack/react-query";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  CircleCheckBig,
  Signal,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { ConversionFunnelSection } from "./conversion-funnel-section";
import { InsightsDrawer } from "./insights-drawer";
import { KeyInsightsGrid } from "./key-insights-grid";
import { PerformanceTimelineSection } from "./performance-timeline-section";
import { ResponseQualitySection } from "./response-quality-section";

type Insight = {
  label: string;
  detail: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  detailColor: string;
};

const insights: Insight[] = [
  {
    label: "Reply quality improving",
    detail: "+5% vs last period",
    icon: TrendingUp,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    detailColor: "text-emerald-600",
  },
  {
    label: "Deliverability needs attention",
    detail: "32% bounce rate (Target < 5%)",
    icon: AlertTriangle,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    detailColor: "text-amber-600",
  },
  {
    label: "Inbox reputation healthy",
    detail: "0.5% complaint rate (Industry < 1%)",
    icon: CircleCheckBig,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    detailColor: "text-slate-600",
  },
  {
    label: "Conversion Rate strong",
    detail: "2% email-to-meeting conversion",
    icon: Signal,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
    detailColor: "text-sky-600",
  },
];

export function ColdEmailPerformanceCard() {
  const [todayDate, setTodayDate] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    setTodayDate(`${year}-${month}-${day}`);
  }, []);

  const { data: metricsData } = useQuery({
    queryKey: ["cold-email-metrics", todayDate],
    queryFn: async () => {
      if (!todayDate) return null;
      const response = await fetch(
        `/api/client/metrics/get?serviceId=COLD_EMAIL&date=${todayDate}`
      );
      if (!response.ok) throw new Error("Failed to fetch metrics");
      return response.json();
    },
    enabled: !!todayDate,
  });

  const metricHistory = metricsData?.metricHistories?.[0];
  const history = metricHistory?.history || {};

  const coldEmailMetrics = [
    { label: "Emails Sent", value: history?.emails_sent || "0" },
    { label: "Open Rate", value: `${history?.open_rate || "0"}%` },
    { label: "Reply Rate", value: `${history?.reply_rate || "0"}%` },
    { label: "Bounce Rate", value: `${history?.bounce_rate || "0"}%` },
    { label: "Spam Rate", value: `${history?.spam_rate || "0"}%` },
    { label: "Conversion Rate", value: `${history?.conversion_rate || "0"}%` },
  ];

  return (
    <Card className="border-none bg-white shadow-sm">
      <CardContent className="space-y-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-semibold text-lg text-slate-900">
                Cold Email Campaign
              </p>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700 text-xs">
                <span
                  aria-hidden
                  className="size-2 rounded-full bg-emerald-500"
                />
                On Track
              </span>
            </div>
            <p className="text-slate-500 text-sm">Outbound prospecting</p>
          </div>
          <InsightsDrawer />
        </div>
        <div className="mt-6 grid gap-4 border-slate-200 border-b pb-6 text-base text-slate-900 md:grid-cols-3 lg:grid-cols-6">
          {coldEmailMetrics.map((metric) => (
            <div className="space-y-1 text-left" key={metric.label}>
              <p className="font-medium text-gray-600 text-xs">
                {metric.label}
              </p>
              <p className="font-semibold text-lg leading-5">{metric.value}</p>
            </div>
          ))}
        </div>

        <PerformanceTimelineSection />

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 lg:col-span-1">
            <div>
              <p className="font-semibold text-slate-900 text-sm">
                Conversion Funnel
              </p>
              <p className="text-slate-500 text-xs">
                Track how prospects move from outreach to booked meetings.
              </p>
            </div>
            <ConversionFunnelSection />
          </div>
          <div className="space-y-4 lg:col-span-1">
            <div>
              <p className="font-semibold text-slate-900 text-sm">
                Response Quality Breakdown
              </p>
              <p className="text-slate-500 text-xs">
                Quality of response based on positive and negative responses
              </p>
            </div>
            <ResponseQualitySection />
          </div>
        </section>

        <section>
          <p className="mb-4 font-semibold text-slate-900 text-sm">
            Key Insights
          </p>
          <KeyInsightsGrid insights={insights} />
        </section>
      </CardContent>
    </Card>
  );
}
