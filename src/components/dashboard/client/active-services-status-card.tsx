"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const serviceConfig: Record<string, { color: string }> = {
  "cmm2b4i9v000010kjjn8gnunc": { color: "#0ea5e9" }, // Paid Ads
  "cmm2b4j58000110kj3fouc7wr": { color: "#f97316" }, // Social Media
  "cmm2b4jrx000210kjr0wxdk7s": { color: "#22c55e" }, // Cold Calling
  "cmm2b4khh000310kjfskvvs9k": { color: "#a855f7" }, // Branding Content
  "cmm2b4l4d000410kj1l2q2qkc": { color: "#ec4899" }, // Cold Linkedin
  "cmm2b4lr0000510kj84s4g4f3": { color: "#14b8a6" }, // Software Development
};

interface ActiveServicesStatusCardProps {
  serviceData: Record<string, { serviceName: string; metrics: any }>;
}

export function ActiveServicesStatusCard({ serviceData }: ActiveServicesStatusCardProps) {
  const activeServices = Object.entries(serviceData).map(([serviceId, data]) => ({
    id: serviceId,
    name: data.serviceName,
    progress: Math.floor(Math.random() * 100), // TODO: Calculate real progress
    summary: "Real-time metrics from your team",
    color: serviceConfig[serviceId]?.color || "#64748b",
  }));

  if (activeServices.length === 0) {
    return (
      <Card className="border-none bg-white shadow-sm">
        <CardContent className="py-8 text-center">
          <p className="text-slate-500 text-sm">No active services yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none bg-white shadow-sm">
      <CardContent className="space-y-5">
        {activeServices.map((service) => (
          <div className="space-y-2" key={service.id}>
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
