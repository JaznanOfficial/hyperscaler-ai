"use client"

import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const linkedinMetrics = [
  { label: "Connection Request Sent", value: "42" },
  { label: "Messages Sent", value: "38" },
  { label: "Positive Reply Rates", value: "6%" },
  { label: "Meetings Booked", value: "7" },
]

const conversionTrend = [
  { day: "Day 5", value: 4 },
  { day: "Day 10", value: 9 },
  { day: "Day 15", value: 13 },
  { day: "Day 20", value: 16 },
  { day: "Day 25", value: 19 },
  { day: "Day 30", value: 27 },
]

const conversionConfig = {
  value: { label: "Conversion Rate", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig

const clickRateData = [
  { name: "Accepted Requests", value: 46, color: "hsl(var(--chart-2))" },
  { name: "Ignored Requests", value: 54, color: "#cfd8df" },
]

const linkedinInsights = [
  { label: "Engaging social media posts", detail: "3.1% Engagement ➜ Lead conversion rate", color: "from-emerald-500/15 to-emerald-500/5" },
  { label: "Personalized email campaigns", detail: "4.5% Email ➜ Lead conversion rate", color: "from-amber-500/15 to-amber-500/5" },
  { label: "Informative webinars", detail: "5.0% Webinar ➜ Lead conversion rate", color: "from-sky-500/15 to-sky-500/5" },
  { label: "Targeted online ads", detail: "3.8% Ad ➜ Lead conversion rate", color: "from-purple-500/15 to-purple-500/5" },
]

export function ColdLinkedinPerformanceCard() {
  return (
    <Card className="border-none bg-white shadow-sm">
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <CardTitle>Cold LinkedIn Outreach</CardTitle>
            <CardDescription>Voice-based outreach performance.</CardDescription>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 text-xs font-semibold text-emerald-700">
            <span className="size-2 rounded-full bg-emerald-500" aria-hidden />
            On Track
          </div>
        </div>
        <div className="flex flex-wrap gap-6 text-center text-base font-semibold text-slate-900">
          {linkedinMetrics.map((metric) => (
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
              <p className="text-smowered font-semibold text-slate-900">Conversion Rate Growth Trend</p>
              <p className="text-xs text-slate-500">Last 30 days connection to lead conversion trend.</p>
            </div>
            <ChartContainer config={conversionConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={conversionTrend} margin={{ left: 0, right: 16, top: 16, bottom: 8 }}>
                  <defs>
                    <linearGradient id="linkedinConversion" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.25)" />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} cursor={{ stroke: "#cbd5f5", strokeWidth: 1 }} />
                  <Area type="monotone" dataKey="value" stroke="var(--color-value)" strokeWidth={3} fill="url(#linkedinConversion)" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
            <p className="text-sm font-semibold text-emerald-600">↑ 12% vs last month</p>
          </div>
          <div className="space-y-4 rounded-2xl border border-slate-100 p-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">Content Click Rate</p>
              <p className="text-xs text-slate-500">How effectively outreach drives responses.</p>
            </div>
            <ChartContainer config={{ acceptance: { label: "Accepted", color: "hsl(var(--chart-2))" } }} className="mx-auto h-64 max-w-xs">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={clickRateData} innerRadius={70} outerRadius={90} paddingAngle={2} dataKey="value" strokeWidth={0}>
                    {clickRateData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-semibold text-slate-900">46%</span>
                <span className="text-xs text-slate-500">Accepted</span>
              </div>
            </ChartContainer>
            <div className="space-y-2 text-sm">
              {clickRateData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.name}
                  </div>
                  <span className="font-semibold text-slate-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <p className="mb-4 text-sm font-semibold text-slate-900">Key Insights</p>
          <div className="grid gap-4 md:grid-cols-2">
            {linkedinInsights.map((insight) => (
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
