import { BadgeCheck, ChevronLeft, Lock } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { defaultSiteService, getSiteService } from "@/data/site-services";
import { cn } from "@/lib/utils";

const siteServiceMetrics: Record<
  string,
  { title: string; description: string }[]
> = {
  "paid-ads": [
    { title: "Impressions", description: "Total times ads were shown" },
    { title: "Reach", description: "Unique users who saw your ads" },
    { title: "Clicks", description: "Total number of clicks" },
    {
      title: "Click-Through Rate (CTR)",
      description: "Clicks divided by impressions",
    },
    {
      title: "Cost per Click (CPC)",
      description: "Average cost you pay per click",
    },
    {
      title: "Conversion Rate",
      description: "Rate of completed desired action",
    },
    { title: "Ad Spend", description: "Total campaign spend" },
    {
      title: "Return on Ad Spend (ROAS)",
      description: "Revenue for every dollar spent",
    },
  ],
};

interface SiteServiceDetailsPageProps {
  params: { serviceId: string };
}

export default function SiteServiceDetailsPage({
  params,
}: SiteServiceDetailsPageProps) {
  const service = getSiteService(params.serviceId) ?? defaultSiteService;
  const metrics = siteServiceMetrics[service.id] ?? [];

  return (
    <section className="bg-muted/20 py-10">
      <div className="mx-auto w-11/12 space-y-8 lg:w-10/12">
        <Link
          className="inline-flex items-center gap-2 font-medium text-slate-600 text-sm transition hover:text-violet-700"
          href="/services"
        >
          <ChevronLeft className="size-4" /> Back to Services
        </Link>

        <Card className="space-y-6 border border-slate-200 bg-white p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-['Outfit'] font-semibold text-3xl text-slate-900">
                  {service.title}
                </h1>
                {service.badge ? (
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 font-semibold text-xs",
                      service.badge === "Popular"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-sky-100 text-sky-700"
                    )}
                  >
                    {service.badge}
                  </span>
                ) : null}
              </div>
              <p className="text-base text-slate-600">{service.description}</p>
            </div>
            <div className="flex flex-col items-end gap-3">
              <p className="font-['Outfit'] font-bold text-3xl text-slate-900">
                {service.price}
                <span className="ml-1 font-medium text-base text-slate-500">
                  {service.cadence}
                </span>
              </p>
              <Button asChild className="min-w-40" variant="gradient">
                <Link href="/login">Login to Purchase</Link>
              </Button>
            </div>
          </div>
        </Card>

        <section className="space-y-4">
          <h2 className="font-semibold text-lg text-slate-900">
            What’s included
          </h2>
          <div className="grid gap-3 lg:grid-cols-2">
            {service.bullets.map((bullet) => (
              <div
                className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3"
                key={bullet}
              >
                <BadgeCheck className="size-4 text-emerald-500" />
                <p className="text-slate-700 text-sm">{bullet}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-lg text-slate-900">
              Metrics you can track
            </h2>
            <Lock className="size-4 text-rose-500" />
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <div
                className="rounded-lg border border-slate-200 bg-white px-4 py-4"
                key={metric.title}
              >
                <p className="font-semibold text-slate-900 text-sm">
                  {metric.title}
                </p>
                <p className="text-slate-500 text-sm">{metric.description}</p>
              </div>
            ))}
          </div>
          {metrics.length ? (
            <p className="flex items-center gap-2 font-medium text-rose-600 text-sm">
              <Lock className="size-4" /> All metrics unlock after subscribing
              to the service.
            </p>
          ) : null}
        </section>
      </div>
    </section>
  );
}
