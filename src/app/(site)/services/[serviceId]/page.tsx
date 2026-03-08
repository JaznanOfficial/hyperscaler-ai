import { BadgeCheck, ChevronLeft, Lock } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
  fallbackServiceMetrics,
  siteServiceMetrics,
} from "@/data/site-service-metrics";
import { defaultSiteService, getSiteService } from "@/data/site-services";
import { cn } from "@/lib/utils";

interface SiteServiceDetailsPageProps {
  params: Promise<{ serviceId: string }>;
}

export default async function SiteServiceDetailsPage({
  params,
}: SiteServiceDetailsPageProps) {
  const { serviceId } = await params;
  const service = getSiteService(serviceId) ?? defaultSiteService;
  const metrics = siteServiceMetrics[service.id] ?? fallbackServiceMetrics;

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
            <div className="flex flex-col items-end gap-2 text-right" />
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
