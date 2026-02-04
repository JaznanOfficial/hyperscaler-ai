"use client"

import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const weeklyPerformance = [
  { day: "Sun", emailSent: 40, replies: 8, meetings: 1 },
  { day: "Mon", emailSent: 80, replies: 20, meetings: 4 },
  { day: "Tue", emailSent: 110, replies: 32, meetings: 6 },
  { day: "Wed", emailSent: 140, replies: 56, meetings: 8 },
  { day: "Thu", emailSent: 160, replies: 70, meetings: 10 },
  { day: "Fri", emailSent: 180, replies: 85, meetings: 12 },
  { day: "Sat", emailSent: 190, replies: 92, meetings: 14 },
]

const performanceConfig = {
  emailSent: { label: "Email Sent", color: "hsl(var(--chart-1))" },
  replies: { label: "Reply Generated", color: "hsl(var(--chart-3))" },
  meetings: { label: "Meetings Booked", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig

const funnelStages = [
  { label: "Email Sent Rate", value: "100% (5,000 sent)", width: "100%" },
  { label: "Delivery Rate", value: "68% (3,400 delivered)", width: "78%" },
  { label: "Open Rate", value: "22% (1,100 opened)", width: "56%" },
  { label: "Reply Rate", value: "5% (250 replied)", width: "34%" },
  { label: "Meetings", value: "2% (100 meetings)", width: "20%" },
]

const responseQualityData = [
  { name: "Positive", value: 70, color: "hsl(var(--chart-2))" },
  { name: "Negative", value: 30, color: "hsl(var(--chart-5))" },
]

const insights = [
  { label: "Reply quality improving", detail: "+5% vs last period", color: "from-emerald-500/15 to-emerald-500/5" },
  { label: "Deliverability needs attention", detail: "32% bounce rate (target < 5%)", color: "from-amber-500/15 to-amber-500/5" },
  { label: "Inbox reputation healthy", detail: "0.5% complaint rate (industry <1%)", color: "from-sky-500/15 to-sky-500/5" },
  { label: "Conversion Rate strong", detail: "2% email-to-meeting conversion", color: "from-purple-500/15 to-purple-500/5" },
]

export function ServicesOverviewCard() {
  return (
    <Card className="border-none bg-white shadow-sm">
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <CardTitle>Services Overview</CardTitle>
            <CardDescription>Individual performance of each subscribed service.</CardDescription>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 text-xs font-semibold text-emerald-700">
            <span className="size-2 rounded-full bg-emerald-500" aria-hidden />
            On Track
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 text-sm text-slate-500">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Primary service</p>
            <p className="text-base font-semibold text-slate-900">Cold Email Campaign</p>
            <p>Outbound prospecting</p>
          </div>
          <div className="ml-auto flex flex-wrap gap-4 text-center text-base font-semibold text-slate-900">
            {[
              { label: "Drafts Sent", value: "12,450" },
              { label: "Open Rate", value: "34.2%" },
              { label: "Reply Rate", value: "8.5%" },
              { label: "Meetings", value: "12" },
              { label: "Conversion", value: "12%" },
            ].map((metric) => (
              <div key={metric.label} className="min-w-22.5">
                <p>{metric.value}</p>
                <p className="text-xs font-normal text-slate-500">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">Performance Timeline</p>
              <p className="text-xs text-slate-500">7-day trend comparison across key metrics.</p>
            </div>
            <button
              type="button"
              className="rounded-xl border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm"
            >
              All key metrics
            </button>
          </div>
          <ChartContainer config={performanceConfig} className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyPerformance} margin={{ left: 0, right: 24, top: 16, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.35)" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} cursor={{ stroke: "#cbd5f5", strokeWidth: 1 }} />
                <Line type="monotone" dataKey="emailSent" stroke="var(--color-emailSent)" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="replies" stroke="var(--color-replies)" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="meetings" stroke="var(--color-meetings)" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="flex flex-wrap gap-4 text-sm">
            {Object.entries(performanceConfig).map(([key, config]) => (
              <div key={key} className="inline-flex items-center gap-2 text-slate-600">
                <span className="size-2.5 rounded-full" style={{ backgroundColor: config.color }} />
                <span>{config.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <FunnelPanel />
          <ResponseQualityPanel />
        </section>

        <section>
          <p className="mb-4 text-sm font-semibold text-slate-900">Key Insights</p>
          <div className="grid gap-4 md:grid-cols-2">
            {insights.map((insight) => (
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

function FunnelPanel() {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-100 p-4">
      <div>
        <p className="text-sm font-semibold text-slate-900">Conversion Funnel</p>
        <p className="text-xs text-slate-500">Track how prospects move from outreach to booked meetings.</p>
      </div>
      <div className="space-y-3">
        {funnelStages.map((stage) => (
          <div key={stage.label} className="space-y-1">
            <div className="flex items-center justify-between text-xs font-medium text-slate-500">
              <span>{stage.label}</span>
              <span>{stage.value}</span>
            </div>
            <div className="h-4 rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-linear-to-r from-violet-600 to-fuchsia-500"
                style={{ width: stage.width }}
                aria-hidden
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ResponseQualityPanel() {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-100 p-4">
      <div>
        <p className="text-sm font-semibold text-slate-900">Response Quality Breakdown</p>
        <p className="text-xs text-slate-500">Share of positive vs negative replies.</p>
      </div>
      <ChartContainer
        config={{ positive: { label: "Positive", color: "hsl(var(--chart-2))" } }}
        className="mx-auto h-56 max-w-xs"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={responseQualityData}
              innerRadius={70}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              strokeWidth={0}
            >
              {responseQualityData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-semibold text-slate-900">70%</span>
          <span className="text-xs text-slate-500">Positive Response</span>
        </div>
      </ChartContainer>
      <div className="space-y-2 text-sm">
        {responseQualityData.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-slate-600">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              {item.name} Response
            </div>
            <span className="font-semibold text-slate-900">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
