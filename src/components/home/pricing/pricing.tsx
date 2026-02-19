"use client";

import type { VariantProps } from "class-variance-authority";
import {
  ArrowRight,
  Building2,
  Check,
  Rocket,
  Target,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { SectionHeader } from "@/components/shared/section-header";
import { TalkToSalesDrawer } from "@/components/site/services/talk-to-sales-drawer";
import { buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const scalePricingData = [
  {
    icon: <Rocket className="size-5 md:size-6" />,
    name: "Starter",
    description:
      "One channel, full automation. Perfect for testing the waters.",
    price: {
      amount: "$1,000",
      cadence: "/month",
      note: "Billed monthly · Cancel anytime",
    },
    comparisonLabel: "What's included",
    cta: {
      type: "link",
      href: "#",
      label: "Get Started",
      variant: "outline" as const,
    },
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
    price: {
      amount: "$2,500",
      cadence: "/month",
      note: "Billed monthly · Cancel anytime",
    },
    comparisonLabel: "Everything in Starter, plus",
    highlight: {
      label: "Most Popular",
    },
    cta: {
      type: "link",
      href: "#",
      label: "Get Started",
      variant: "gradient" as const,
    },
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
    price: {
      amount: "$5,000",
      cadence: "/month",
      note: "Billed monthly · Cancel anytime",
    },
    comparisonLabel: "Everything in Growth, plus",
    cta: {
      type: "link",
      href: "#",
      label: "Get Started",
      variant: "outline" as const,
    },
    features: [
      "All services included",
      "Lead qualification & pipeline handoff",
      "Custom funnel building & landing pages",
      "Weekly strategy calls",
      "Slack/dedicated channel support",
    ],
  },
  {
    icon: <Building2 className="size-4 md:size-5" />,
    name: "Enterprise",
    description: "Custom-built growth infrastructure for your org.",
    price: {
      amount: "Custom Pricing",
      cadence: "",
      note: "Tailored to your goals & budget",
    },
    comparisonLabel: "Everything in Pro, plus",
    cta: {
      type: "drawer",
      label: "Talk to Us",
      variant: "gradient" as const,
    },
    features: [
      "Dedicated growth team assigned",
      "Custom integrations & workflows",
      "SLA guarantees & uptime commitment",
      "Executive reporting & board decks",
      "Priority onboarding within 48 hours",
    ],
  },
];

const buildPricingData = [
  {
    icon: <Rocket className="size-5 md:size-6" />,
    name: "Starter",
    description: "Ship your MVP or iterate on an existing product fast.",
    price: {
      amount: "$2,500",
      cadence: "/month",
      note: "Billed monthly · Cancel anytime",
    },
    comparisonLabel: "What's included",
    cta: {
      type: "link",
      href: "#",
      label: "Get Started",
      variant: "outline" as const,
    },
    features: [
      "1 product track (web app, mobile, or landing page)",
      "AI-assisted development & design",
      "Dashboard with sprint progress",
      "Bi-weekly deliverables & demos",
      "Email support",
    ],
  },
  {
    icon: <Zap className="size-5 md:size-6" />,
    name: "Growth",
    description:
      "Dedicated product team shipping weekly with human + AI velocity.",
    price: {
      amount: "$5,000",
      cadence: "/month",
      note: "Billed monthly · Cancel anytime",
    },
    comparisonLabel: "Everything in Starter, plus",
    highlight: {
      label: "Most Popular",
    },
    cta: {
      type: "link",
      href: "#",
      label: "Get Started",
      variant: "gradient" as const,
    },
    features: [
      "Up to 3 product tracks in parallel",
      "Dedicated product manager & engineer",
      "Weekly sprint deliverables",
      "UX/UI design included",
      "Priority Slack support",
    ],
  },
  {
    icon: <Target className="size-5 md:size-6" />,
    name: "Pro",
    description: "Full product org in a box. Ship like a well-funded Series B.",
    price: {
      amount: "$25,000",
      cadence: "/month",
      note: "Billed monthly · Cancel anytime",
    },
    comparisonLabel: "Everything in Growth, plus",
    cta: {
      type: "link",
      href: "#",
      label: "Get Started",
      variant: "outline" as const,
    },
    features: [
      "Unlimited product tracks",
      "Full engineering team (front + back + infra)",
      "Architecture review & technical roadmap",
      "Daily standups & real-time collaboration",
      "CTO-level strategic guidance",
    ],
  },
  {
    icon: <Building2 className="size-4 md:size-5" />,
    name: "Enterprise",
    description: "Custom product development at any scale, your way.",
    price: {
      amount: "Custom Pricing",
      cadence: "",
      note: "Tailored to your goals & budget",
    },
    comparisonLabel: "Everything in Pro, plus",
    cta: {
      type: "drawer",
      label: "Talk to Us",
      variant: "gradient" as const,
    },
    features: [
      "Dedicated multi-discipline product team",
      "Custom tech stack & integrations",
      "SLA guarantees & compliance support",
      "Investor-ready product documentation",
      "Priority onboarding within 48 hours",
    ],
  },
];

const Pricing = () => {
  return (
    <section
      className="mx-auto flex w-11/12 flex-col items-center justify-center gap-8 py-10 md:gap-10 md:py-12 lg:w-10/12 lg:gap-13 lg:py-16"
      id="pricing"
    >
      <SectionHeader
        description="Pick the package that matches where you are. Scale to get customers. Build to ship product. No long-term contracts."
        gradientTitle="everything"
        titlePart1="Growth shouldn't cost you "
      />

      <Tabs className="w-full" defaultValue="scale">
        <TabsList className="mx-auto h-5 w-full max-w-40 cursor-pointer rounded-full border border-slate-300 bg-white text-base lg:h-12! lg:max-w-62 lg:px-2 lg:py-2">
          <TabsTrigger
            className="cursor-pointer rounded-full font-semibold text-sm data-[state=active]:bg-[#9E32DD] data-[state=active]:text-white lg:h-9 lg:flex-1 lg:px-5 lg:py-2 lg:text-lg"
            value="scale"
          >
            Scale
          </TabsTrigger>
          <TabsTrigger
            className="cursor-pointer rounded-full font-semibold text-sm data-[state=active]:bg-[#9E32DD] data-[state=active]:text-white lg:h-9 lg:flex-1 lg:px-5 lg:py-2 lg:text-lg"
            value="build"
          >
            Build
          </TabsTrigger>
        </TabsList>

        <TabsContent className="mt-8" value="scale">
          <PricingCards data={scalePricingData} />
        </TabsContent>
        <TabsContent className="mt-8" value="build">
          <PricingCards data={buildPricingData} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];

const renderPricingCta = (item: PricingCard, isAuthenticated: boolean) => {
  const overrideVariant = (variant?: ButtonVariant): ButtonVariant => {
    if (item.highlight && variant === "gradient") {
      return "outline";
    }
    return variant ?? "default";
  };

  if (item.cta?.type === "link" && item.cta.href) {
    // Extract price amount (remove $ and /month)
    const priceAmount = item.price?.amount?.replace(/[$,]/g, "") || "0";
    const packageName = item.name;
    
    const href = isAuthenticated 
      ? `/client?package=${encodeURIComponent(packageName)}&amount=${priceAmount}`
      : `/signup?package=${encodeURIComponent(packageName)}&amount=${priceAmount}`;
    
    return (
      <Link
        className={cn(
          buttonVariants({ variant: overrideVariant(item.cta.variant) }),
          "w-full"
        )}
        href={href}
      >
        {item.cta.label} <ArrowRight className="size-4" />
      </Link>
    );
  }

  if (item.cta?.type === "drawer") {
    return (
      <TalkToSalesDrawer
        buttonClassName="w-full"
        buttonVariant={overrideVariant(item.cta.variant ?? "outline")}
      />
    );
  }

  return null;
};

type PricingCard = (typeof scalePricingData)[number];

const PricingCards = ({ data }: { data: PricingCard[] }) => {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  
  return (
    <div className="grid grid-cols-1 gap-5 max-lg:w-full sm:grid-cols-2 xl:grid-cols-4">
      {data.map((item) => {
        const highlightStyles = item.highlight
          ? "border border-transparent bg-[#F8F3FF] shadow-[0_0_15px_rgba(91,33,182,0.45)] outline outline-1 outline-offset-[-1px] outline-purple-700"
          : "border border-[#D1D1D1] bg-white";
        const isCustomPrice = item.price?.amount
          ?.toLowerCase()
          .includes("custom");

        const ctaContent = renderPricingCta(item, isAuthenticated);

        return (
          <div
            className={cn(
              "relative flex w-full flex-col items-start justify-between gap-7 rounded-xl border px-7 py-8",
              highlightStyles
            )}
            key={item.name}
          >
            <div className="mr-auto flex flex-col items-start justify-start gap-3">
              <div
                className={cn(
                  item.highlight
                    ? "bg-purple-200/70 text-purple-700 ring-1 ring-white"
                    : "bg-[#D1D1D1] text-[#515A65]",
                  "flex size-9 items-center justify-center rounded-lg md:size-11"
                )}
              >
                {item.icon}
              </div>
              <div>
                <h3
                  className={cn(
                    "font-['Outfit']",
                    "font-medium text-[#1A1A1A] text-xl sm:text-2xl"
                  )}
                >
                  {item.name}
                </h3>
                <p className="text-[#515A65] text-sm leading-5">
                  {item.description}
                </p>
              </div>
            </div>
            {item.price ? (
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-baseline gap-1 text-[#1A1A1A]">
                  <span
                    className={cn(
                      "font-['Outfit'] font-semibold text-2xl leading-8",
                      isCustomPrice &&
                        "bg-linear-to-r from-violet-800 to-fuchsia-500 bg-clip-text text-transparent"
                    )}
                  >
                    {item.price.amount}
                  </span>
                  <span className="font-['Inter'] font-medium text-[#414851] text-sm">
                    {item.price.cadence}
                  </span>
                </div>
                <p className="font-['Inter'] text-[#515A65] text-xs">
                  {item.price.note}
                </p>
              </div>
            ) : null}

            <div
              className={cn(
                "h-px w-full",
                item.highlight ? "bg-[#E3D3FF]" : "bg-[#E7DFF6]"
              )}
            />

            {item.comparisonLabel ? (
              <p className="font-['Inter'] font-medium text-[#515A65] text-xs uppercase leading-4">
                {item.comparisonLabel}
              </p>
            ) : null}

            <div className="flex flex-col gap-2">
              {item.features.map((feature) => (
                <div
                  className="flex items-center gap-3"
                  key={`${item.name}-${feature}`}
                >
                  <div
                    className={cn(
                      "rounded-full p-1",
                      item.highlight
                        ? "bg-purple-100 ring-1 ring-purple-200"
                        : "bg-[#ECD6F8B2]"
                    )}
                  >
                    <Check className="size-3 font-bold text-purple-800 md:size-3.5" />
                  </div>
                  <p className="font-normal text-[#414851] text-sm leading-5">
                    {feature}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex w-full flex-col gap-3">
              {!isCustomPrice && (
                <Link
                  className={cn(
                    item.highlight
                      ? buttonVariants({ variant: "gradient" })
                      : "flex w-full items-center justify-center gap-2 rounded-lg border border-purple-100 bg-purple-50 px-4 py-2.5 font-semibold text-purple-600 text-sm transition hover:bg-purple-100"
                  )}
                  href="https://calendly.com/ujjwalroy1/ai-implementation"
                  rel="noreferrer"
                  target="_blank"
                >
                  Book a free session <ArrowRight className="size-4" />
                </Link>
              )}

              {ctaContent}
            </div>
            {item.highlight?.label ? (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full border border-[#D946EF] bg-[#9E32DD] px-3 py-1.5 text-[10px] text-white md:px-4 md:text-xs">
                {item.highlight.label}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Pricing;
