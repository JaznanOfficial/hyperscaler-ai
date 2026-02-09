import { BadgeCheck, ChevronLeft, Lock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  defaultClientServiceDetail,
  getClientServiceDetail,
} from "@/data/client-service-details";

interface ClientServiceDetailsPageProps {
  params: { serviceId: string };
}

export default function ClientServiceDetailsPage({
  params,
}: ClientServiceDetailsPageProps) {
  const detail =
    getClientServiceDetail(params.serviceId) ?? defaultClientServiceDetail;

  return (
    <section className="mx-auto flex h-[calc(92vh)] flex-1 flex-col overflow-y-auto">
      <div className="mx-auto w-11/12 space-y-8 py-6 lg:w-10/12">
        <Link
          className="inline-flex items-center gap-2 font-medium text-slate-600 text-sm transition hover:text-violet-700"
          href="/client/services"
        >
          <ChevronLeft className="size-4" /> Back to Services
        </Link>

        <Card className="space-y-6 border border-slate-200 p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-['Outfit'] font-semibold text-3xl text-slate-900">
                  {detail.title}
                </h1>
                {detail.badge ? (
                  <span className="rounded-full bg-amber-100 px-3 py-1 font-semibold text-amber-700 text-xs uppercase tracking-wide">
                    {detail.badge}
                  </span>
                ) : null}
              </div>
              <p className="text-base text-slate-600">{detail.description}</p>
            </div>
            <div className="flex flex-col items-end gap-3">
              <p className="font-['Outfit'] font-bold text-3xl text-slate-900">
                {detail.price}
                <span className="ml-1 font-medium text-base text-slate-500">
                  {detail.cadence}
                </span>
              </p>
              <Button className="min-w-[160px]" variant="gradient">
                Add to Cart
              </Button>
            </div>
          </div>
        </Card>

        <section className="space-y-4">
          <h2 className="font-semibold text-lg text-slate-900">
            What’s included
          </h2>
          <div className="grid gap-3 lg:grid-cols-2">
            {detail.features.map((feature) => (
              <div
                className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3"
                key={feature}
              >
                <BadgeCheck className="size-4 text-emerald-500" />
                <p className="text-slate-700 text-sm">{feature}</p>
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
            {detail.metrics.map((metric) => (
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
          {detail.note ? (
            <p className="flex items-center gap-2 font-medium text-rose-600 text-sm">
              <Lock className="size-4" /> {detail.note}
            </p>
          ) : null}
        </section>
      </div>
    </section>
  );
}
