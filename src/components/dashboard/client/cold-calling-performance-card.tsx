"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const coldMetrics = [
  { label: "Calls Made", value: "240" },
  { label: "Pick-Up Rate", value: "56%" },
  { label: "Meetings Booked", value: "24" },
  { label: "Conversion Rate", value: "18.2%" },
]

const callQualityMetrics = [
  {
    label: "Average call duration",
    change: "↑ 18% vs last period",
    detail: "4:32 minutes",
    valueText: "Ideal: 3–5 mins",
    percent: 72,
  },
  {
    label: "Qualified Conversions",
    change: "↑ 8% vs last period",
    detail: "246 (76% of pick-ups)",
    valueText: "Goal: 250",
    percent: 76,
  },
  {
    label: "Follow-Up Scheduled",
    change: "↑ 8% vs last period",
    detail: "153 (62% of qualified)",
    valueText: "Goal: 65%",
    percent: 62,
  },
]

const callMeetingData = [
  { week: "Week 1", meetings: 90, noConversion: 120 },
  { week: "Week 2", meetings: 60, noConversion: 100 },
  { week: "Week 3", meetings: 110, noConversion: 120 },
  { week: "Week 4", meetings: 95, noConversion: 105 },
]

const callMeetingConfig = {
  meetings: { label: "Calls that resulted in meetings", color: "hsl(var(--chart-4))" },
  noConversion: { label: "Calls that didn't convert", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig

const callInsights = [
  { label: "Call activity steady", detail: "+8% vs last week", color: "from-emerald-500/15 to-emerald-500/5" },
  { label: "Call duration optimal", detail: "3.6 mins avg (Ideal: 3–5 mins)", color: "from-amber-500/15 to-amber-500/5" },
  { label: "Pick-up rate healthy", detail: "22% pick-up rate (Target: >20%)", color: "from-sky-500/15 to-sky-500/5" },
  { label: "Conversions qualifying well", detail: "48 qualified conversations identified", color: "from-purple-500/15 to-purple-500/5" },
]

export function ColdCallingPerformanceCard() {
  return (
    <Card className="border-none bg-white shadow-sm">
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <CardTitle>Cold Calling</CardTitle>
            <CardDescription>Voice-based outreach performance.</CardDescription>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 text-xs font-semibold text-emerald-700">
            <span className="size-2 rounded-full bg-emerald-500" aria-hidden />
            On Track
          </div>
        </div>
        <div className="flex flex-wrap gap-6 text-center text-base font-semibold text-slate-900">
          {coldMetrics.map((metric) => (
            <div key={metric.label} className="min-w-24">
              <p>{metric.value}</p>
              <p className="text-xs font-normal text-slate-500">{metric.label}</p>
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-4 rounded-2xl border border-slate-100 p-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">Call Quality Metrics</p>
              <p className="text-xs text-slate-500">Duration, qualification rate, and follow-ups.</p>
            </div>
            <div className="space-y-4">
              {callQualityMetrics.map((metric) => (
                <div key={metric.label} className="space-y-1">
                  <div className="flex flex-wrap items-center justify-between text-sm font-medium text-slate-600">
                    <span>{metric.label}</span>
                    <span className="text-slate-500">{metric.detail}</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-violet-700 to-fuchsia-500"
                      style={{ width: `${metric.percent}%` }}
                      aria-hidden
                    />
                  </div>
                  <div className="flex flex-wrap items-center justify-between text-xs text-slate-500">
                    <span>{metric.change}</span>
                    <span>{metric.valueText}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4 rounded-2xl border border-slate-100 p-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">Call-to-Meeting Performance</p>
              <p className="text-xs text-slate-500">Weekly performance comparison.</p>
            </div>
            <ChartContainer config={callMeetingConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={callMeetingData} margin={{ left: 0, right: 16, top: 16, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.35)" />
                  <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: "rgba(148, 163, 184, 0.12)" }} />
                  <Bar dataKey="meetings" stackId="a" fill="var(--color-meetings)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="noConversion" stackId="a" fill="var(--color-noConversion)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="flex flex-wrap gap-4 text-sm">
              {Object.entries(callMeetingConfig).map(([key, config]) => (
                <div key={key} className="inline-flex items-center gap-2 text-slate-600">
                  <span className="size-2.5 rounded-full" style={{ backgroundColor: config.color }} />
                  <span>{config.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <p className="mb-4 text-sm font-semibold text-slate-900">Key Insights</p>
          <div className="grid gap-4 md:grid-cols-2">
            {callInsights.map((insight) => (
              <div
                key={insight.label}
                className={cn(
                  "rounded-2xl border border-slate-100 bg-white/90 p-4 shadow-sm",
                  "bg-linear-to-r",
                  insight.color,
                )}
              >
                <p className="text-sm font-semibold text-slate-900">{insight.label}</p>
                <p className="text-xs text-slate-600">{insight.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </CardContent>
    </Card>
  )
}
