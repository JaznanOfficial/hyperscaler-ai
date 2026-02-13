"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Project {
  id: string;
  status: string;
  services: Array<{ serviceName: string }>;
}

export function ActiveServicesList() {
  const [activeServices, setActiveServices] = useState<
    Array<{ id: string; serviceName: string }>
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

        const services = approvedProjects.flatMap((project) =>
          (project.services || []).map((service) => ({
            id: project.id,
            serviceName: service.serviceName || "Service",
          }))
        );

        setActiveServices(services);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
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
      <div className="space-y-1">
        <p className="font-['Outfit'] font-semibold text-gray-900 text-xl leading-7">
          Active Services{" "}
        </p>
        <p className="font-normal text-gray-600 text-sm leading-5">
          Your currently running services
        </p>
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
