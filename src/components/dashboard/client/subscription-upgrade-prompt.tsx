"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SubscriptionUpgradePromptProps {
  currentPlanName: string;
}

const PLAN_SEQUENCE = [
  { name: "Starter", price: 1000 },
  { name: "Growth", price: 2500 },
  { name: "Pro", price: 5000 },
  { name: "Enterprise", price: null },
] as const;

export function SubscriptionUpgradePrompt({
  currentPlanName,
}: SubscriptionUpgradePromptProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const normalizedName = currentPlanName.trim().toLowerCase();
  const currentPlanIndex = PLAN_SEQUENCE.findIndex(
    (plan) => plan.name.toLowerCase() === normalizedName
  );
  const recommendedPlan =
    currentPlanIndex >= 0 && currentPlanIndex < PLAN_SEQUENCE.length - 1
      ? PLAN_SEQUENCE[currentPlanIndex + 1]
      : null;

  const handleUpgrade = async () => {
    if (!recommendedPlan?.price) {
      window.location.href = "/contact";
      return;
    }

    try {
      setIsProcessing(true);
      const response = await fetch("/api/stripe/checkout-package", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageName: recommendedPlan.name,
          amount: recommendedPlan.price,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to start checkout");
      }

      const { url } = data ?? {};
      if (!url) {
        throw new Error("Checkout link unavailable");
      }

      window.location.href = url as string;
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to start checkout"
      );
      setIsProcessing(false);
    }
  };

  if (!recommendedPlan) {
    return null;
  }

  const isTopTier = recommendedPlan.price === null;

  return (
    <Card className="relative mt-10 overflow-visible border border-slate-200 bg-white p-6 shadow-sm lg:mt-16">
      <div className="absolute -top-4 left-6 inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-600 px-4 py-1 font-semibold text-white text-xs">
        <Sparkles className="size-3.5" />
        Recommended
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-['Outfit'] font-semibold text-2xl text-slate-900">
            You're on {currentPlanName}. Upgrade to {recommendedPlan.name}.
          </h3>
          {!isTopTier && (
            <p className="text-base text-slate-600">
              Move to {recommendedPlan.name} to unlock more services and deeper
              guidance.
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-5">
          {isTopTier ? (
            <Button
              asChild
              className="h-12 w-fit justify-center font-semibold text-sm"
              variant="gradient"
            >
              <Link href="/contact">Talk to our team</Link>
            </Button>
          ) : (
            <Button
              className="h-12 w-fit justify-center font-semibold text-sm"
              disabled={isProcessing}
              onClick={handleUpgrade}
              variant="gradient"
            >
              {isProcessing
                ? "Redirecting..."
                : `Upgrade to ${recommendedPlan.name}`}
              <ArrowRight className="size-4" />
            </Button>
          )}
          <Button
            asChild
            className="h-12 w-fit font-semibold text-gray-600 text-sm"
            variant="outline"
          >
            <Link href="/pricing">View all Plans</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
