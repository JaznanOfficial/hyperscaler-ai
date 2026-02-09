"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const recommendedServices = [
  {
    id: "brand-content",
    title: "Cold Email Campaign",
    description:
      "Strategic content creation that positions you as an industry thought leader.",
    highlight:
      "Complements your social media marketing subscription for a full funnel approach",
    price: "$500",
    cadence: "/month",
  },
  {
    id: "social-media-strategy",
    title: "Social Media Strategy",
    description: "Service Running",
  },
  {
    id: "website-redesign",
    title: "Website Redesign",
    description: "Service Running",
  },
];

export function ActiveServicesList() {
  return (
    <section className="space-y-4">
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
              <h3 className="font-['Outfit'] font-medium text-lg text-slate-900 leading-6">
                {service.title}
              </h3>
              <p className="text-base text-slate-700 leading-6">
                {service.description}
              </p>
            </div>

            <div className="flex w-full flex-col gap-4 pt-4">
              <div className="flex w-full flex-col gap-3 min-[450px]:flex-row">
                <Button className="flex-1 bg-neutral-300" variant="secondary">
                  Dashboard
                </Button>
                <Button className="flex-1" variant="outline">
                  View
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
