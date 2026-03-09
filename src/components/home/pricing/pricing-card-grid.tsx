"use client";

import { ArrowRight, Check, Zap } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { TalkToSalesDrawer } from "@/components/site/services/talk-to-sales-drawer";
import type { ButtonVariant } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { PricingCard, SavingsHighlight } from "./types";

const overrideVariant = (
  variant: ButtonVariant | undefined,
  isHighlight: boolean
): ButtonVariant => {
  if (isHighlight && variant === "gradient") {
    return "outline";
  }
  return variant ?? "default";
};

const renderPricingCta = (item: PricingCard, isAuthenticated: boolean) => {
  if (item.cta?.type === "link" && item.cta.href) {
    const priceAmount = item.price?.amount?.replace(/[$,]/g, "") || "0";
    const href = isAuthenticated
      ? `/client?package=${encodeURIComponent(item.name)}&amount=${priceAmount}`
      : `/signup?package=${encodeURIComponent(item.name)}&amount=${priceAmount}`;

    return (
      <Link
        className={cn(
          buttonVariants({
            variant: overrideVariant(item.cta.variant, !!item.highlight),
          }),
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
        buttonVariant={overrideVariant(
          item.cta.variant ?? "outline",
          !!item.highlight
        )}
      />
    );
  }

  return null;
};

const SavingsHighlightPill = ({
  highlight,
}: {
  highlight?: SavingsHighlight;
}) => {
  if (!highlight) {
    return null;
  }

  return (
    <div className="flex w-full items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3">
      <div className="text-emerald-600">
        <Zap className="size-4" />
      </div>
      <div className="flex flex-col">
        <p className="font-['Inter'] font-medium text-[#515A65] text-xs">
          {highlight.title}
        </p>
        <p className="font-['Inter'] font-semibold text-emerald-600 text-sm">
          {highlight.subtitle}
        </p>
      </div>
    </div>
  );
};

interface PricingCardsProps {
  data: PricingCard[];
}

export const PricingCards = ({ data }: PricingCardsProps) => {
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
                    ? "bg-purple-600 text-white ring-1 ring-white"
                    : "bg-[#D1D1D1] text-[#515A65]",
                  "inline-flex items-center gap-2 rounded-xl px-3 py-1"
                )}
              >
                <div className="flex size-6 items-center justify-center md:size-7">
                  {item.icon}
                </div>
                <h3
                  className={cn(
                    "font-['Outfit'] font-medium text-base sm:text-lg",
                    item.highlight ? "text-white" : "text-[#1A1A1A]"
                  )}
                >
                  {item.name}
                </h3>
              </div>
              <p className="text-[#515A65] text-sm leading-5">
                {item.description}
              </p>
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

            <SavingsHighlightPill highlight={item.savingsHighlight} />

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
