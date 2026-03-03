"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useClientServices } from "@/hooks/use-client-services";

export function ActiveServicesList() {
  const { data: projects, isLoading } = useClientServices();

  const activeServices =
    projects
      ?.filter((p) => p.status === "APPROVED")
      .flatMap((project) => {
        let services: Array<{ serviceName?: string }> = [];
        try {
          if (typeof project.services === "string" && project.services.trim()) {
            services = JSON.parse(project.services);
          }
        } catch {
          services = [];
        }
        return (Array.isArray(services) ? services : []).map((service) => ({
          id: project.id,
          serviceName: service.serviceName || "Service",
        }));
      }) || [];

  if (isLoading) {
    return (
      <section className="mt-20">
        <div className="space-y-1">
          <p className="font-['Outfit'] font-semibold text-gray-900 text-xl leading-7">
            Active Services
          </p>
          <p className="font-normal text-gray-600 text-sm leading-5">
            Your currently running services
          </p>
        </div>
        <p className="mt-10 text-center text-slate-600">Loading services...</p>
      </section>
    );
  }

  if (activeServices.length === 0) {
    return null;
  }

  return (
    <section className="mt-20">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="font-['Outfit'] font-semibold text-gray-900 text-xl leading-7">
            Active Services{" "}
          </p>
          <p className="font-normal text-gray-600 text-sm leading-5">
            Your currently running services
          </p>
        </div>
        <Link href="/client/subscriptions">
          <Button variant="gradient">
            Need more services? Upgrade your plan
          </Button>
        </Link>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {activeServices.map((service) => (
          <Card
            className="relative overflow-visible border border-slate-200 bg-white p-5 shadow-sm"
            key={service.id}
          >
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-['Outfit'] font-medium text-lg text-slate-900 leading-6">
                  {service.serviceName}
                </h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 font-semibold text-emerald-700 text-xs">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  On track
                </span>
              </div>
              <p className="text-base text-slate-700 leading-6">
                Service Running
              </p>
            </div>

            <div className="flex w-full flex-col gap-4 pt-4">
              <div className="flex w-full flex-col gap-3 min-[450px]:flex-row">
                <Button asChild className="flex-1" variant="outline">
                  <Link href={`/client/statistics?service=${service.id}`}>
                    View
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
