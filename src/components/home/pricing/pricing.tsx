import {
  ArrowRight,
  Building2,
  Check,
  Rocket,
  Target,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "@/components/shared/section-header";
import { TalkToSalesDrawer } from "@/components/site/services/talk-to-sales-drawer";
import { buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const pricingData = [
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

const Pricing = () => {
  return (
    <section className="mx-auto flex w-11/12 flex-col items-center justify-center gap-8 py-10 md:gap-10 md:py-12 lg:w-10/12 lg:gap-13 lg:py-16">
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
          <PricingCards />
        </TabsContent>
        <TabsContent className="mt-8" value="build">
          <PricingCards />
        </TabsContent>
      </Tabs>
    </section>
  );
};

const PricingCards = () => {
  return (
    <div className="grid grid-cols-1 gap-5 max-lg:w-full sm:grid-cols-2 xl:grid-cols-4">
      {pricingData.map((item) => {
        const highlightStyles = item.highlight
          ? "border border-transparent bg-[#F8F3FF] shadow-[0_0_45px_rgba(91,33,182,0.45)] outline outline-1 outline-offset-[-1px] outline-purple-700"
          : "border border-[#D1D1D1] bg-white";

        let ctaContent: React.ReactNode = null;
        if (item.cta?.type === "link" && item.cta.href) {
          ctaContent = (
            <Link
              className={cn(
                buttonVariants({ variant: item.cta.variant ?? "default" }),
                "w-full"
              )}
              href={item.cta.href}
            >
              {item.cta.label} <ArrowRight className="size-4" />
            </Link>
          );
        } else if (item.cta?.type === "drawer") {
          ctaContent = (
            <TalkToSalesDrawer
              buttonClassName="w-full"
              buttonVariant="outline"
            />
          );
        }

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
                  <span className="font-['Outfit'] font-semibold text-2xl leading-8">
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

            {ctaContent}
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
