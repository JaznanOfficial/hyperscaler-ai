"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Service {
  serviceName: string;
  updates?: Record<string, any>;
}

interface Project {
  id: string;
  status: string;
  services: Service[];
}

export function ServiceMetricsView() {
  const [allServices, setAllServices] = useState<
    Array<{ projectId: string; service: Service }>
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/client/projects")
      .then((res) => res.json())
      .then((data) => {
        const projects: Project[] = data.projects || [];
        const approvedProjects = projects.filter(
          (p) => p.status === "APPROVED"
        );

        const allServicesData = approvedProjects.flatMap((project) =>
          (project.services || []).map((service) => ({
            projectId: project.id,
            service,
          }))
        );

        setAllServices(allServicesData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || allServices.length === 0) {
    return null;
  }

  return (
    <>
      {allServices.map(({ projectId, service }, index) => {
        const updates =
          service.updates && typeof service.updates === "object"
            ? service.updates
            : {};
        const metrics = Object.entries(updates);

        return (
          <Card
            className="border-none bg-white shadow-sm"
            key={`${projectId}-${index}`}
          >
            <CardHeader className="space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <CardTitle className="font-semibold text-lg text-slate-900">
                      {service.serviceName || "Service"}
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
                    Real-time metrics from your team
                  </CardDescription>
                </div>
              </div>
              {metrics.length > 0 && (
                <div className="grid gap-4 border-slate-200 border-b pb-6 text-base text-slate-900 md:grid-cols-3 lg:grid-cols-7">
                  {metrics.map(([key, value]) => (
                    <div className="space-y-1 text-left" key={key}>
                      <p className="font-medium text-gray-600 text-xs capitalize">
                        {key.replace(/_/g, " ")}
                      </p>
                      <p className="font-semibold text-lg leading-5">
                        {String(value)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-8">
              {metrics.length > 0 ? (
                <section className="space-y-4 rounded-2xl border border-slate-100 p-4">
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">
                      Performance Metrics
                    </p>
                    <p className="text-slate-500 text-xs">
                      Current progress and performance indicators
                    </p>
                  </div>
                  <div className="space-y-4">
                    {metrics.map(([key, value]) => {
                      const numValue =
                        typeof value === "number"
                          ? value
                          : Number.parseFloat(String(value)) || 0;
                      const progress = Math.min(Math.max(numValue, 0), 100);

                      return (
                        <div className="space-y-2" key={key}>
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-slate-900 text-sm capitalize">
                              {key.replace(/_/g, " ")}
                            </p>
                            <p className="text-slate-600 text-sm">
                              {String(value)}
                            </p>
                          </div>
                          <Progress className="h-2" value={progress} />
                        </div>
                      );
                    })}
                  </div>
                </section>
              ) : (
                <section className="rounded-2xl border border-slate-100 p-8 text-center">
                  <p className="text-slate-500 text-sm">
                    No metrics available yet. Your team will update this soon.
                  </p>
                </section>
              )}
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
