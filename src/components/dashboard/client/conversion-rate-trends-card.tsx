"use client"

import type { CSSProperties } from "react"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

const conversionConfig = {
  coldEmail: {
    label: "Cold Email Campaign",
    color: "hsl(var(--chart-1))",
  },
  paidAds: {
    label: "Paid Ads",
    color: "hsl(var(--chart-2))",
  },
  socialMedia: {
    label: "Social Media Marketing",
    color: "hsl(var(--chart-4))",
  },
  linkedin: {
    label: "LinkedIn Outreach",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

const conversionData = [
  { day: 2, coldEmail: 2, paidAds: 1, socialMedia: 0.5, linkedin: 0.2 },
  { day: 4, coldEmail: 4, paidAds: 2, socialMedia: 1.5, linkedin: 1 },
  { day: 6, coldEmail: 6, paidAds: 4, socialMedia: 3, linkedin: 2 },
  { day: 8, coldEmail: 8, paidAds: 5, socialMedia: 6, linkedin: 4 },
  { day: 10, coldEmail: 10, paidAds: 6, socialMedia: 8, linkedin: 7 },
  { day: 12, coldEmail: 11, paidAds: 8, socialMedia: 9, linkedin: 9 },
  { day: 16, coldEmail: 12, paidAds: 10, socialMedia: 12, linkedin: 12 },
  { day: 20, coldEmail: 13, paidAds: 11, socialMedia: 14, linkedin: 15 },
  { day: 24, coldEmail: 14, paidAds: 12, socialMedia: 16, linkedin: 18 },
  { day: 28, coldEmail: 15, paidAds: 13, socialMedia: 18, linkedin: 20 },
  { day: 30, coldEmail: 16, paidAds: 14, socialMedia: 19, linkedin: 22 },
]

const legendItems = [
  { key: "coldEmail", label: "Cold Email Campaign" },
  { key: "paidAds", label: "Paid Ads" },
  { key: "socialMedia", label: "Social Media Marketing" },
  { key: "linkedin", label: "LinkedIn Outreach" },
]

export function ConversionRateTrendsCard() {
  return (
    <Card className="border-none bg-white shadow-sm">
      <CardHeader>
        <CardTitle>Conversion Rate Trends</CardTitle>
        <CardDescription>30-day trend comparison across conversion rates.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ChartContainer config={conversionConfig} className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={conversionData} margin={{ left: 0, right: 24, top: 16, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.35)" />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                label={{ value: "Day", position: "insideRight", offset: -10, fill: "#94a3b8" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                label={{ value: "Conversion Rate (%)", angle: -90, position: "insideLeft", fill: "#94a3b8" }}
              />
              <ChartTooltip content={<ChartTooltipContent />} cursor={{ stroke: "#cbd5f5", strokeWidth: 1 }} />
              <Line type="monotone" dataKey="coldEmail" stroke="var(--color-coldEmail)" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="paidAds" stroke="var(--color-paidAds)" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="socialMedia" stroke="var(--color-socialMedia)" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="linkedin" stroke="var(--color-linkedin)" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="flex flex-wrap gap-4 text-sm">
          {legendItems.map((item) => (
            <div key={item.key} className="inline-flex items-center gap-2 text-slate-600">
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: `var(--color-${item.key})` } as CSSProperties}
              />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
