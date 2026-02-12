import { ArrowRight, Building2, Check } from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "@/components/shared/section-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const pricingData = [
  {
    icon: <Check className="size-4 md:size-5" />,
    name: "Monthly Plans",
    description: "Subscribe to individual services",
    link: {
      href: "/services",
      label: "Choose Services",
    },
    features: [
      "Pay per service",
      "Monthly Billing",
      "Full Dashboard Access",
      "Contact Support",
      "Cancel anytime",
    ],
  },
  {
    icon: <Building2 className="size-4 md:size-5" />,
    name: "Enterprise",
    description: "Custom plan for teams",
    link: {
      href: "/contact",
      label: "Talk to Us",
    },
    features: [
      "Multiple services bundled",
      "Custom workflows & Pricing",
      "Dedicated support",
      "SLA guarantees",
      "Priority onboarding",
    ],
  },
];

const Pricing = () => {
  return (
    <section className="mx-auto flex w-11/12 flex-col items-center justify-center gap-8 py-10 md:gap-10 md:py-12 lg:w-10/12 lg:gap-13 lg:py-16">
      <SectionHeader
        description="Start monthly — upgrade to Enterprise anytime"
        titlePart1="Simple, transparent pricing"
      />

      <div className="grid grid-cols-1 gap-5 max-lg:w-full sm:grid-cols-2 md:gap-7 lg:gap-[38px]">
        {pricingData.map((item, index) => (
          <div
            className={cn(
              "relative flex w-full flex-col items-start justify-between gap-7 rounded-xl border px-7 py-8 lg:w-[405px]",
              index === 0
                ? "border-[#D946EF] bg-purple-100 shadow-purple-400/30 shadow-xl"
                : "border-[#D1D1D1] bg-white"
            )}
            key={index}
          >
            <div className="mr-auto flex flex-col items-start justify-start gap-3">
              <div
                className={cn(
                  index === 0
                    ? "bg-[#FBF5FF] text-purple-800"
                    : "bg-[#D1D1D1] text-[#515A65]",
                  "flex size-9 items-center justify-center rounded-lg border border-white md:size-11"
                )}
              >
                {item.icon}
              </div>
              <div>
                <h3
                  className={cn(
                    "font-['Outfit']",
                    "font-semibold text-[#1A1A1A] text-xl sm:text-2xl"
                  )}
                >
                  {item.name}
                </h3>
                <p className="text-[#414851]">{item.description}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {item.features.map((feature, index) => (
                <div className="flex items-center gap-3" key={index}>
                  <div className="rounded-full bg-[#ECD6F8B2] p-1">
                    <Check className="size-3 font-bold text-purple-800 md:size-3.5" />
                  </div>
                  <p className="text-[#414851]">{feature}</p>
                </div>
              ))}
            </div>

            <Link
              className={cn(
                buttonVariants(
                  index === 0 ? { variant: "gradient" } : { variant: "outline" }
                ),
                "w-full"
              )}
              href={item.link.href}
            >
              {item.link.label} <ArrowRight className="size-4" />
            </Link>
            {index === 0 && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full border border-[#D946EF] bg-[#9E32DD] px-3 py-1.5 text-[10px] text-white md:px-4 md:text-xs">
                Most Popular
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
