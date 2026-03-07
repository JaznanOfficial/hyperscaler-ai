"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function SubscriptionUpgradePrompt() {
  return (
    <Card className="relative mt-10 overflow-visible border border-slate-200 bg-white p-6 shadow-sm lg:mt-16">
      <div className="absolute -top-4 left-6 inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-600 px-4 py-1 font-semibold text-white text-xs">
        <Sparkles className="size-3.5" />
        Recommended
      </div>
      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="font-['Outfit'] font-semibold text-2xl text-slate-900">
            Ready to Scale Even Faster?
          </h3>
          <p className="text-base text-slate-600">
            The Pro Plan gives you unlimited growth channels, advanced support,
            and premium strategies designed for serious growth.
          </p>
          <div className="flex items-center gap-3 rounded-lg bg-fuchsia-50/80 px-4 py-3 text-sm text-violet-600">
            <Sparkles className="size-4 shrink-0" />
            Compare plans to choose the best fit for the growth of my business.
          </div>
        </div>

        <div className="flex gap-5">
          <Button
            className="h-12 w-fit justify-center font-semibold text-sm"
            variant="gradient"
          >
            Upgrade to Pro Plan
            <ArrowRight className="size-4" />
          </Button>
          <Button
            asChild
            className="h-12 w-fit font-semibold text-gray-600 text-sm"
            variant="outline"
          >
            <Link href="/client/subscriptions?view=plans">View all Plans</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
