"use client";

import { Check, Rocket, Target, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { BuyPackageButton } from "@/components/client/buy-package-button";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const packages = [
  {
    icon: <Rocket className="size-5 md:size-6" />,
    name: "Starter",
    description:
      "One channel, full automation. Perfect for testing the waters.",
    price: 1000,
    features: [
      "Pick only one service",
      "AI agent + human experts managing your campaign 24/7",
      "Dashboard with real-time KPIs",
      "Weekly performance reports",
      "Email support",
    ],
  },
  {
    icon: <Zap className="size-5 md:size-6" />,
    name: "Growth",
    description: "Multi-channel acquisition with human oversight baked in.",
    price: 2500,
    highlight: true,
    features: [
      "Pick up to 3 services",
      "Dedicated human growth strategist",
      "A/B testing & creative optimization",
      "Bi-weekly strategy calls",
      "Priority support",
    ],
  },
  {
    icon: <Target className="size-5 md:size-6" />,
    name: "Pro",
    description: "Full-stack growth engine for serious scale.",
    price: 5000,
    features: [
      "All services included",
      "Lead qualification & pipeline handoff",
      "Custom funnel building & landing pages",
      "Weekly strategy calls",
      "Slack/dedicated channel support",
    ],
  },
];

export function RecommendedPackages() {
  const [activePackage, setActivePackage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/client/packages")
      .then((res) => res.json())
      .then((data) => {
        const activePkg = data.packages?.find((p: any) => p.status === "PAID");
        if (activePkg) {
          setActivePackage(activePkg.packageName);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="mt-10">
      <div className="space-y-1">
        <p className="font-['Outfit'] font-semibold text-gray-900 text-xl leading-7">
          Upgrade Your Package
        </p>
        <p className="font-normal text-gray-600 text-sm leading-5">
          Get more services and features with our premium packages
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {packages.map((pkg) => {
          const isActive = activePackage === pkg.name;
          
          return (
            <Card
              className={`relative overflow-visible border p-6 shadow-sm ${
                pkg.highlight
                  ? "border-purple-200 bg-purple-50/50 ring-2 ring-purple-200"
                  : "border-slate-200 bg-white"
              }`}
              key={pkg.name}
            >
              {pkg.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-purple-300 bg-purple-600 px-3 py-1 text-[10px] text-white">
                  Most Popular
                </div>
              )}
              {isActive && (
                <div className="absolute -top-3 right-4 rounded-full border border-emerald-300 bg-emerald-600 px-3 py-1 text-[10px] text-white">
                  Active
                </div>
              )}
              <div className="space-y-5">
                <div className="flex items-start justify-between">
                  <div
                    className={`flex size-11 items-center justify-center rounded-lg ${
                      pkg.highlight
                        ? "bg-purple-200/70 text-purple-700"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {pkg.icon}
                  </div>
                </div>
                <div>
                  <h3 className="font-['Outfit'] font-semibold text-slate-900 text-xl">
                    {pkg.name}
                  </h3>
                  <p className="mt-1 text-slate-600 text-sm">{pkg.description}</p>
                </div>
                <div>
                  <p className="font-['Outfit'] font-bold text-3xl text-slate-900">
                    ${pkg.price.toLocaleString()}
                    <span className="ml-1 font-medium text-base text-slate-500">
                      /month
                    </span>
                  </p>
                </div>
                <div className="h-px w-full bg-slate-200" />
                <div className="space-y-3">
                  {pkg.features.map((feature) => (
                    <div className="flex items-start gap-3" key={feature}>
                      <div
                        className={`mt-0.5 rounded-full p-1 ${
                          pkg.highlight
                            ? "bg-purple-100 ring-1 ring-purple-200"
                            : "bg-slate-100"
                        }`}
                      >
                        <Check className="size-3 text-purple-700" />
                      </div>
                      <p className="text-slate-700 text-sm leading-5">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
                {loading ? (
                  <Button className="w-full" disabled variant="gradient">
                    Loading...
                  </Button>
                ) : isActive ? (
                  <Button className="w-full" disabled variant="outline">
                    Current Plan
                  </Button>
                ) : (
                  <BuyPackageButton amount={pkg.price} packageName={pkg.name} />
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
