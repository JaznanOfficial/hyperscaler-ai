"use client";

import {
  ArrowLeft,
  ArrowRight,
  Code,
  Funnel,
  Loader2,
  Pencil,
  Share2,
  TrendingUp,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentType } from "react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

const leftPreviewImage = "/onboarding/business-onboarding.png";

type ServiceOption = {
  id: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
};

const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: "paid-ads",
    title: "Paid Ads",
    description: "Google & Meta Ad Campaigns",
    icon: TrendingUp,
  },
  {
    id: "social-media",
    title: "Social Media",
    description: "Content strategy and management",
    icon: Share2,
  },
  {
    id: "content-brand",
    title: "Content & Brand",
    description: "Visual identity and storytelling",
    icon: Pencil,
  },
  {
    id: "outbound-growth",
    title: "Outbound Growth",
    description: "Cold email, LinkedIn outreach & cold calling",
    icon: Funnel,
  },
  {
    id: "software-dev",
    title: "Software Development",
    description: "Web apps, mobile, custom tools",
    icon: Code,
  },
  {
    id: "automation",
    title: "Automation & Systems",
    description: "Workflows, integrations, CRM",
    icon: Zap,
  },
];

export default function ServicesPage() {
  const router = useRouter();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function toggleService(id: string) {
    setSelectedServices((prev) =>
      prev.includes(id)
        ? prev.filter((serviceId) => serviceId !== id)
        : [...prev, id]
    );
  }

  async function onContinue() {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/onboarding/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          services: selectedServices,
        }),
      });

      const data = (await response.json()) as {
        success: boolean;
        message?: string;
      };

      if (!(response.ok && data.success)) {
        throw new Error(data.message || "Failed to save services");
      }

      router.push("/onboarding/source");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(message, { richColors: true });
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-svh w-full bg-white lg:grid lg:grid-cols-[minmax(420px,40%)_1fr]">
      <section className="relative hidden overflow-hidden bg-[#EBDDFA] lg:block">
        <div className="absolute -top-[350px] -left-[520px] h-[980px] w-[980px] rounded-full border border-[#DDC4F8]" />
        <div className="absolute -top-[190px] -left-[360px] h-[760px] w-[760px] rounded-full border border-[#DDC4F8]" />
        <div className="absolute -top-[60px] -left-[220px] h-[540px] w-[540px] rounded-full border border-[#DDC4F8]" />
        <div className="absolute top-[90px] -left-[80px] h-[320px] w-[320px] rounded-full border border-[#DDC4F8]" />
        <img
          alt=""
          aria-hidden="true"
          className="absolute inset-y-0 right-0 h-full w-[78%] object-cover opacity-40"
          src={leftPreviewImage}
        />
        <div className="absolute inset-y-0 right-0 w-[64%] bg-linear-to-r from-[#EBDDFA]/0 to-white/85" />
      </section>

      <section className="flex min-h-svh justify-center px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
        <div className="w-full max-w-[760px]">
          <div className="mb-9 flex items-center justify-between">
            <div className="w-[160px]">
              <p className="mb-3 text-[#515A65] text-base">Step 2 of 3</p>
              <div className="flex items-center gap-[5px]">
                <span className="h-2 w-[53px] rounded bg-[#B9BDC1]" />
                <span className="h-2 w-[51px] rounded bg-[#D8ADF1]" />
                <span className="h-2 w-[51px] rounded bg-[#B9BDC1]" />
              </div>
            </div>

            <Link
              className="inline-flex items-center gap-1.5 font-medium text-[#515A65] text-base no-underline"
              href="/onboarding/business"
            >
              <ArrowLeft aria-hidden="true" className="size-5" />
              Back
            </Link>
          </div>

          <div className="mb-10 space-y-2">
            <h1 className="font-['Outfit'] font-medium text-3xl text-[#1A1A1A] leading-normal sm:text-[32px]">
              What would you like to grow?
            </h1>
            <p className="text-[#515A65] text-base leading-6">
              Choose the areas where you&apos;d like Hyperscaler to help.
            </p>
          </div>

          <div className="grid gap-[22px] sm:grid-cols-2">
            {SERVICE_OPTIONS.map(({ id, title, description, icon: Icon }) => {
              const selected = selectedServices.includes(id);

              return (
                <button
                  className={`h-[94px] rounded-xl border bg-white px-6 py-[18px] text-left shadow-[0px_1px_3px_0px_rgba(0,0,0,0.02),0px_2px_4px_0px_rgba(0,0,0,0.04)] transition-colors ${
                    selected
                      ? "border-[#C084FC] bg-[#FAF5FF]"
                      : "border-[#D1D1D1] hover:border-[#B9BDC1]"
                  }`}
                  key={id}
                  onClick={() => toggleService(id)}
                  type="button"
                >
                  <div className="flex items-start gap-3">
                    <span className="pt-1">
                      <Icon className="size-[18px] text-[#1A1A1A]" />
                    </span>
                    <span className="space-y-1">
                      <span className="block font-semibold text-[#1A1A1A] text-base leading-[1.4]">
                        {title}
                      </span>
                      <span className="block text-[#515A65] text-sm leading-5">
                        {description}
                      </span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-[26px]">
            <div className="flex items-center gap-3">
              <Button
                className="h-[45px] w-[155px]"
                onClick={() => router.push("/onboarding/book-a-demo")}
                type="button"
                variant="outline"
              >
                Skip
              </Button>
              <Button
                className="h-[45px] w-[155px]"
                disabled={isLoading}
                onClick={onContinue}
                type="button"
                variant="gradient"
              >
                {isLoading ? (
                  <>
                    Saving
                    <Loader2
                      aria-hidden="true"
                      className="size-[18px] animate-spin"
                    />
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight aria-hidden="true" className="size-[18px]" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
