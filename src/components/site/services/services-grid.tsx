import { CheckCircle2, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { TalkToSalesDrawer } from "@/components/site/services/talk-to-sales-drawer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { SiteService } from "@/data/site-services";

interface ServicesGridProps {
  services: SiteService[];
  ctaType?: "cart" | "talk";
  talkButtonLabel?: string;
}

export function ServicesGrid({
  services,
  ctaType = "cart",
  talkButtonLabel,
}: ServicesGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {services.map((service) => (
        <Card
          className="relative flex h-full flex-col justify-between border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(12,10,44,0.05)]"
          key={service.id}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-['Outfit'] font-semibold text-slate-900 text-xl">
                {service.title}
              </h3>
              {service.badge ? (
                <span
                  className={`rounded-full px-3 py-1 font-semibold text-xs ${
                    service.badge === "Popular"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-sky-100 text-sky-700"
                  }`}
                >
                  {service.badge}
                </span>
              ) : null}
            </div>
            <p className="text-slate-600 text-sm leading-6">
              {service.description}
            </p>
            <ul className="space-y-2 text-slate-600 text-sm">
              {service.bullets.map((bullet) => (
                <li className="flex items-start gap-2" key={bullet}>
                  <CheckCircle2 className="mt-0.5 size-4 text-emerald-500" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 space-y-4">
            {ctaType !== "talk" && (
              <p className="font-['Outfit'] font-bold text-3xl text-slate-900">
                {service.price}
                <span className="ml-1 font-medium text-base text-slate-500">
                  {service.cadence}
                </span>
              </p>
            )}
            <div className="flex w-full flex-col gap-3">
              {ctaType === "talk" ? (
                <TalkToSalesDrawer
                  buttonClassName="flex-1"
                  buttonLabel={talkButtonLabel}
                />
              ) : (
                <Button asChild className="flex-1" variant="gradient">
                  <Link href="/login">
                    <ShoppingCart className="size-4" />
                    Login to Purchase
                  </Link>
                </Button>
              )}
              <Button asChild className="flex-1" variant="outline">
                <Link href={`/services/${service.id}`}>View Details</Link>
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
