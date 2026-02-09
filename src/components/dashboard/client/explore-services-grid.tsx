"use client";

import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const recommendedServices = [
  {
    id: "brand-content",
    title: "Brand & Content Creation",
    description:
      "Strategic content creation that positions you as an industry thought leader.",
    highlight:
      "Complements your social media marketing subscription for a full funnel approach",
    price: "$500",
    cadence: "/month",
  },
  {
    id: "pipeline-accelerator",
    title: "Pipeline Accelerator",
    description:
      "Outbound orchestration focused on high-intent accounts ready to convert now.",
    highlight:
      "Pairs with your Hyperscaler AI workspace for 2x faster activation",
    price: "$800",
    cadence: "/month",
  },
];

export function ExploreServicesGrid() {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <p className="font-['Outfit'] font-semibold text-gray-900 text-xl leading-7">
          Explore More Services
        </p>
        <p className="font-normal text-gray-600 text-sm leading-5">
          Browse our full catalog
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {recommendedServices.map((service) => (
          <Card
            className="relative overflow-visible border border-slate-200 bg-white p-5 shadow-sm"
            key={service.id}
          >
            <div className="space-y-5">
              <h3 className="font-['Outfit'] font-medium text-lg text-slate-900 leading-6">
                {service.title}
              </h3>
              <p className="text-base text-slate-700 leading-6">
                {service.description}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-lg bg-fuchsia-50 px-4 py-2 font-normal text-fuchsia-700 text-sm">
              <Sparkles className="size-4" />
              {service.highlight}
            </div>

            <div className="flex w-full flex-col gap-4 pt-4">
              <p className="font-['Outfit'] font-bold text-2xl text-slate-900 leading-8">
                {service.price}
                <span className="font-medium text-slate-500 text-sm leading-5">
                  {service.cadence}
                </span>
              </p>
              <div className="flex w-full flex-col gap-3 min-[450px]:flex-row">
                <Button className="flex-1" variant="gradient">
                  Add to Cart
                </Button>
                <Button className="flex-1" variant="outline">
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
