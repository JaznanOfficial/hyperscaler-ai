import { CheckCircle2, ChevronLeft, Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { defaultSiteService, getSiteService } from "@/data/site-services";
import { cn } from "@/lib/utils";

interface SiteServiceDetailsPageProps {
  params: { serviceId: string };
}

export default function SiteServiceDetailsPage({
  params,
}: SiteServiceDetailsPageProps) {
  const service = getSiteService(params.serviceId) ?? defaultSiteService;

  return (
    <section
      className={cn(
        "mx-auto",
        "flex",
        "min-h-[calc(90vh)]",
        "flex-col",
        "bg-muted/20",
        "py-10"
      )}
    >
      <div className={cn("w-11/12", "max-w-5xl", "space-y-10")}>
        <Link
          className={cn(
            "inline-flex",
            "items-center",
            "gap-2",
            "font-medium",
            "text-slate-600",
            "text-sm",
            "transition",
            "hover:text-violet-700"
          )}
          href="/services"
        >
          <ChevronLeft className="size-4" /> Back to Services
        </Link>

        <Card
          className={cn(
            "border",
            "border-slate-200",
            "bg-white",
            "space-y-6",
            "p-6"
          )}
        >
          <div
            className={cn(
              "flex",
              "flex-col",
              "gap-6",
              "lg:flex-row",
              "lg:items-start",
              "lg:justify-between"
            )}
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <h1
                  className={cn(
                    "font-['Outfit']",
                    "font-semibold",
                    "text-4xl",
                    "text-slate-900"
                  )}
                >
                  {service.title}
                </h1>
                {service.badge ? (
                  <span
                    className={cn(
                      "rounded-full",
                      "px-3",
                      "py-1",
                      "font-semibold",
                      "text-xs",
                      service.badge === "Popular"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-sky-100 text-sky-700"
                    )}
                  >
                    {service.badge}
                  </span>
                ) : null}
              </div>
              <p className={cn("text-lg", "text-slate-600", "leading-7")}>
                {service.description}
              </p>
            </div>
            <div
              className={cn(
                "rounded-2xl",
                "bg-linear-to-r",
                "from-violet-800",
                "via-fuchsia-600",
                "to-pink-500",
                "p-1",
                "text-white"
              )}
            >
              <div
                className={cn(
                  "flex",
                  "flex-col",
                  "gap-3",
                  "rounded-2xl",
                  "bg-white/5",
                  "px-6",
                  "py-5"
                )}
              >
                <p
                  className={cn(
                    "text-sm",
                    "uppercase",
                    "tracking-[0.2em]",
                    "text-white/80"
                  )}
                >
                  Starts at
                </p>
                <p
                  className={cn("font-['Outfit']", "font-semibold", "text-4xl")}
                >
                  {service.price}
                  <span
                    className={cn(
                      "ml-2",
                      "font-medium",
                      "text-base",
                      "text-white/80"
                    )}
                  >
                    {service.cadence}
                  </span>
                </p>
                <div className={cn("text-sm", "text-white/90")}>
                  Includes onboarding, reporting, and dedicated experts.
                </div>
                <Button className={cn("w-full")} variant="gradient">
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <section className={cn("grid", "gap-6", "lg:grid-cols-[2fr,1fr]")}>
          <Card
            className={cn(
              "border",
              "border-slate-200",
              "bg-white",
              "space-y-5",
              "p-6"
            )}
          >
            <div
              className={cn(
                "flex",
                "items-center",
                "gap-2",
                "font-semibold",
                "text-fuchsia-700",
                "text-sm"
              )}
            >
              <Sparkles className="size-4" /> What you'll get
            </div>
            <div className={cn("grid", "gap-3", "md:grid-cols-2")}>
              {service.bullets.map((bullet) => (
                <div
                  className={cn(
                    "flex",
                    "items-start",
                    "gap-3",
                    "rounded-2xl",
                    "border",
                    "border-slate-100",
                    "bg-slate-50/80",
                    "px-4",
                    "py-3"
                  )}
                  key={bullet}
                >
                  <CheckCircle2
                    className={cn("mt-0.5", "size-5", "text-emerald-500")}
                  />
                  <p className={cn("text-sm", "text-slate-700")}>{bullet}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card
            className={cn(
              "border",
              "border-slate-200",
              "bg-white",
              "space-y-4",
              "p-6"
            )}
          >
            <p className={cn("font-semibold", "text-base", "text-slate-900")}>
              Need something custom?
            </p>
            <p className={cn("text-slate-600", "text-sm")}>
              Layer this service with automations, analytics, or white-glove
              delivery from Hyperscaler experts.
            </p>
            <Button asChild variant="outline">
              <Link href="mailto:hello@hyperscaler.ai">Talk to sales</Link>
            </Button>
          </Card>
        </section>
      </div>
    </section>
  );
}
