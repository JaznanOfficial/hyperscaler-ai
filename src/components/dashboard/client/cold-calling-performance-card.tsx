"use client";

import { AlertTriangle, PhoneCall, TrendingUp, UsersRound } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ColdCallingCallMeetingChart,
  callMeetingLegend,
} from "./cold-calling-call-meeting-chart";
import { InsightsDrawer } from "./insights-drawer";
import { KeyInsightsGrid } from "./key-insights-grid";

const callQualityMetrics = [
  {
    label: "Average call duration",
    change: "↑ 18% vs last period",
    detail: "4:32 minutes",
    percent: 72,
  },
  {
    label: "Qualified Conversions",
    change: "↑ 8% vs last period",
    detail: "246 (76% of pick-ups)",
    percent: 76,
  },
  {
    label: "Follow-Up Scheduled",
    change: "↑ 8% vs last period",
    detail: "153 (62% of qualified)",
    percent: 62,
  },
];

const callInsights = [
  {
    label: "Call activity steady",
    detail: "+8% vs last week",
    icon: TrendingUp,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    label: "Call duration optimal",
    detail: "3.6 mins avg",
    icon: AlertTriangle,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    label: "Pick-up rate healthy",
    detail: "22% pick-up rate",
    icon: PhoneCall,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
  },
  {
    label: "Conversions qualifying well",
    detail: "48 qualified calls",
    icon: UsersRound,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
];

interface ColdCallingPerformanceCardProps {
  data?: Record<string, any>;
}

export function ColdCallingPerformanceCard({ data }: ColdCallingPerformanceCardProps) {
  const coldMetrics = [
    { label: "Calls Made", value: data?.["Total Calls"] || "0" },
    { label: "Pick-Up Rate", value: data?.["Connected Calls"] || "0" },
    { label: "Meetings Booked", value: data?.["Meetings Booked"] || "0" },
    { label: "Conversion Rate", value: data?.["Conversion Rate"] || "0" },
  ];
  return (
    <Card className="border-none bg-white shadow-sm">
      <CardHeader className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <CardTitle className="font-semibold text-lg text-slate-900">
                Cold Calling
              </CardTitle>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700 text-xs">
                <span
                  aria-hidden
                  className="size-2 rounded-full bg-emerald-500"
                />
                On Track
              </span>
            </div>
            <CardDescription className="text-slate-500 text-sm">
              Voice-based outreach performance.
            </CardDescription>
          </div>
          <InsightsDrawer defaultService="cold-calling" />
        </div>
        <div className="grid gap-4 border-slate-200 border-b pb-6 text-base text-slate-900 md:grid-cols-4 lg:grid-cols-4">
          {coldMetrics.map((metric) => (
            <div className="space-y-1 text-left" key={metric.label}>
              <p className="font-medium text-gray-600 text-xs">
                {metric.label}
              </p>
              <p className="font-semibold text-lg leading-5">{metric.value}</p>
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-4 rounded-2xl border border-slate-100 p-4">
            <div>
              <p className="font-semibold text-slate-900 text-sm">
                Call Quality Metrics
              </p>
              <p className="text-slate-500 text-xs">
                Duration, qualification rate, and follow-ups.
              </p>
            </div>
            <div className="space-y-4">
              {callQualityMetrics.map((metric) => (
                <div className="space-y-2" key={metric.label}>
                  <p className="font-semibold text-slate-900 text-sm">
                    {metric.label}
                  </p>
                  <div className="flex items-center gap-3">
                    <Progress
                      className="h-3 flex-1 rounded-full bg-slate-200"
                      indicatorClassName="rounded-full bg-[#68A1F1]"
                      value={metric.percent}
                    />
                    <span className="font-medium text-slate-500 text-xs">
                      {metric.detail}
                    </span>
                  </div>
                  <div className="font-medium text-emerald-600 text-xs">
                    <span className="font-medium text-emerald-600">
                      {metric.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4 rounded-2xl border border-slate-100 p-4">
            <div>
              <p className="font-semibold text-slate-900 text-sm">
                Call-to-Meeting Performance
              </p>
              <p className="text-slate-500 text-xs">
                Weekly performance comparison.
              </p>
            </div>
            <ColdCallingCallMeetingChart />
            <div className="flex flex-wrap gap-4 text-sm">
              {callMeetingLegend.map((legend) => (
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

        <section>
          <p className="mb-4 font-semibold text-slate-900 text-sm">
            Key Insights
          </p>
          <KeyInsightsGrid insights={callInsights} />
        </section>
      </CardContent>
    </Card>
  );
}
