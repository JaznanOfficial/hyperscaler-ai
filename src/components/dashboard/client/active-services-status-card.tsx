"use client"

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, type ChartConfig } from "@/components/ui/chart"

const services = [
  {
    name: "Cold Email Campaign",
    progress: 76,
    summary: "12 meetings · $2,870 spend",
    color: "hsl(var(--chart-2))",
  },
  {
    name: "Paid Ads",
    progress: 19,
    summary: "4,850 engagements · $1,980 spend",
    color: "hsl(var(--chart-3))",
  },
  {
    name: "Social Media Marketing",
    progress: 36,
    summary: "42 leads · $3,600 spend",
    color: "hsl(var(--chart-4))",
  },
]

const serviceConfig = {
  progress: {
    label: "Progress",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function ActiveServicesStatusCard() {
  return (
    <Card className="border-none bg-white shadow-sm">
      <CardHeader>
        <CardTitle>Active Services Status</CardTitle>
        <CardDescription>Quick highlights that show service health status.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={serviceConfig} className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={services} layout="vertical" margin={{ left: 0, right: 24, top: 16, bottom: 16 }}>
              <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.4)" />
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#0f172a", fontSize: 12, fontWeight: 600 }}
                width={150}
              />
              <Bar dataKey="progress" radius={[999, 999, 999, 999]} background={{ fill: "#e2e8f0" }}>
                {services.map((service) => (
                  <Cell key={service.name} fill={service.color} />
                ))}
              </Bar>
              <ChartTooltip content={<CustomTooltip />} cursor={{ fill: "rgba(148, 163, 184, 0.12)" }} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-6 space-y-4 text-sm text-slate-600">
          {services.map((service) => (
            <div key={`${service.name}-meta`} className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">{service.name}</p>
                <p className="text-xs text-slate-500">{service.summary}</p>
              </div>
              <p className="text-sm font-semibold text-slate-900">{service.progress}% of Monthly Goal</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: { value?: number }[] }) {
  if (!active || !payload?.length) return null
  const value = payload[0]?.value ?? 0
  return (
    <div className="rounded-lg border bg-white px-3 py-2 text-xs shadow-md">
      <p className="font-medium text-slate-900">{value}% of monthly goal</p>
    </div>
  )
}
