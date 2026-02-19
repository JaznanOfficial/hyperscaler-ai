"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Service {
  id: string;
  serviceName: string;
}

export function ExploreServicesGrid() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data.services || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="mt-20">
      <div className="space-y-1">
        <p className="font-['Outfit'] font-semibold text-gray-900 text-xl leading-7">
          Explore More Services
        </p>
        <p className="font-normal text-gray-600 text-sm leading-5">
          Browse our full catalog
        </p>
      </div>

      {loading ? (
        <p className="mt-10 text-center text-slate-600">Loading services...</p>
      ) : services.length === 0 ? (
        <p className="mt-10 text-center text-slate-600">
          No services available
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <Card
              className="relative overflow-visible border border-slate-200 bg-white p-5 shadow-sm"
              key={service.id}
            >
              <div className="space-y-5">
                <div className="flex w-full flex-wrap items-center justify-between gap-2">
                  <h3 className="font-['Outfit'] font-medium text-lg text-slate-900 leading-6">
                    {service.serviceName}
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-sky-100 px-2.5 py-0.5 font-semibold text-sky-700 text-xs">
                    New
                  </span>
                </div>
                <p className="text-base text-slate-700 leading-6">
                  Strategic service to help grow your business
                </p>
              </div>

              <div className="flex w-full flex-col gap-4 pt-4">
                <div className="flex w-full flex-col gap-3 min-[450px]:flex-row">
                  <Button asChild className="flex-1" variant="gradient">
                    <Link href={`/client/services/${service.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
