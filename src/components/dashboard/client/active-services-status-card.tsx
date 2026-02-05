"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const services = [
  {
    name: "Cold Email Campaign",
    progress: 76,
    summary: "12 meetings · $2,870 spend",
    color: "#22c55e",
  },
  {
    name: "Paid Ads",
    progress: 19,
    summary: "4,850 engagements · $1,980 spend",
    color: "#0ea5e9",
  },
  {
    name: "Social Media Marketing",
    progress: 36,
    summary: "42 leads · $3,600 spend",
    color: "#f97316",
  },
];

export function ActiveServicesStatusCard() {
  return (
    <Card className="border-none bg-white shadow-sm">
      <CardContent className="space-y-5">
        {services.map((service) => (
          <div className="space-y-2" key={`${service.name}-meta`}>
            <p className="font-semibold text-slate-900 text-sm">
              {service.name}
            </p>
            <div className="flex items-center gap-3">
              <Progress
                className="h-2 flex-1 rounded-full bg-slate-200"
                indicatorClassName="rounded-full"
                indicatorStyle={{ backgroundColor: service.color }}
                value={service.progress}
              />
              <p className="text-right font-semibold text-slate-900 text-sm">
                {service.progress}% of Monthly Goal
              </p>
            </div>
            <p className="text-slate-500 text-xs">{service.summary}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
