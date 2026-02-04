"use client"

import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const brandingMetrics = [
  { label: "Assets Produced", value: "42" },
  { label: "Approval Rate", value: "95.5%" },
  { label: "Content Engagement", value: "6.9%" },
  { label: "Brand Search Volume", value: "+18%" },
]

const engagementData = [
  { day: "Mon", value: 42 },
  { day: "Tue", value: 23 },
  { day: "Wed", value: 24 },
  { day: "Thu", value: 30 },
  { day: "Fri", value: 38 },
  { day: "Sat", value: 26 },
  { day: "Sun", value: 25 },
]

const engagementConfig = {
  value: { label: "Engagement", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig

const clickRateData = [
  { name: "Clicked", value: 46, color: "hsl(var(--chart-2))" },
  { name: "Not Clicked", value: 54, color: "#cbd5f5" },
]

const brandingInsights = [
  { label: "Content driving leads", detail: "2.6% Content ➜ Lead conversion rate", color: "from-emerald-500/15 to-emerald-500/5" },
  { label: "Delivery timelines at risk", detail: "3.3 days avg time to delivery (Target: <3 days)", color: "from-amber-500/15 to-amber-500/5" },
  { label: "Brand interest increasing", detail: "+18% brand search volume growth", color: "from-sky-500/15 to-sky-500/5" },
  { label: "Direct traffic accelerating", detail: "+21% growth in direct visits", color: "from-purple-500/15 to-purple-500/5" },
]

export function BrandingContentPerformanceCard() {
  return (
    <Card className="border-none bg-white shadow-sm">
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <CardTitle>Branding & Content Creation</CardTitle>
            <CardDescription>Voice-based outreach performance snapshot.</CardDescription>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 text-xs font-semibold text-emerald-700">
            <span className="size-2 rounded-full bg-emerald-500" aria-hidden />
            On Track
          </div>
        </div>
        <div className="flex flex-wrap gap-6 text-center text-base font-semibold text-slate-900">
          {brandingMetrics.map((metric) => (
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
              <p className="text-sm font-semibold text-slate-900">Content Engagement Rate</p>
              <p className="text-xs text-slate-500">Weekly performance comparison.</p>
            </div>
            <ChartContainer config={engagementConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementData} margin={{ left: 0, right: 16, top: 16, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.35)" />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <YAxis tickFormatter={(value) => `${value}%`} tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: "rgba(148, 163, 184, 0.12)" }} />
                  <Bar dataKey="value" fill="var(--color-value)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className="space-y-4 rounded-2xl border border-slate-100 p-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">Content Click Rate</p>
              <p className="text-xs text-slate-500">How effectively content drives user clicks.</p>
            </div>
            <ChartContainer config={{ click: { label: "Clicked", color: "hsl(var(--chart-2))" } }} className="mx-auto h-64 max-w-xs">
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
                <span className="text-xs text-slate-500">Click Rate</span>
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
            {brandingInsights.map((insight) => (
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
