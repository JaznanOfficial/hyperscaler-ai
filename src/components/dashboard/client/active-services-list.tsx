"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const recommendedServices = [
  {
    id: "brand-content",
    title: "Cold Email Campaign",
    description: "Service Running",
    status: "On track",
  },
  {
    id: "social-media-strategy",
    title: "Social Media Strategy",
    description: "Service Running",
    status: "On track",
  },
  {
    id: "website-redesign",
    title: "Website Redesign",
    description: "Service Running",
    status: "In progress",
  },
];

export function ActiveServicesList() {
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
        {recommendedServices.map((service) => (
          <Card
            className="relative overflow-visible border border-slate-200 bg-white p-5 shadow-sm"
            key={service.id}
          >
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-['Outfit'] font-medium text-lg text-slate-900 leading-6">
                  {service.title}
                </h3>
                {service.status ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 font-semibold text-emerald-700 text-xs">
                    <span className="size-2 rounded-full bg-emerald-500" />
                    {service.status}
                  </span>
                ) : null}
              </div>
              <p className="text-base text-slate-700 leading-6">
                {service.description}
              </p>
            </div>

            <div className="flex w-full flex-col gap-4 pt-4">
              <div className="flex w-full flex-col gap-3 min-[450px]:flex-row">
                {/* <Button className="flex-1 bg-neutral-300" variant="secondary">
                  <span className="inline-flex items-center gap-1">
                    Dashboard
                    <ExternalLink className="size-3.5" />
                  </span>
                </Button> */}
                <Button asChild className="flex-1" variant="outline">
                  <Link href="/client/statistics">View</Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
