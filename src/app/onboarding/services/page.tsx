"use client";

import {
  ArrowLeft,
  ArrowRight,
  Code,
  Funnel,
  Pencil,
  Share2,
  TrendingUp,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const SERVICE_IMAGES = [
  { id: "paid-ads", src: "/services/Paid Ads/Clear.svg", alt: "Paid Ads" },
  {
    id: "social-media",
    src: "/services/Social Media/Clear.svg",
    alt: "Social Media",
  },
  {
    id: "content-brand",
    src: "/services/Software Dev/Clear.svg",
    alt: "Content & Brand",
  },
  {
    id: "outbound-growth",
    src: "/services/Outbound Growth/Clear.svg",
    alt: "Outbound Growth",
  },
];

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
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  function toggleService(id: string) {
    setSelectedServices((prev) =>
      prev.includes(id)
        ? prev.filter((serviceId) => serviceId !== id)
        : [...prev, id]
    );
  }

  return (
    <main className="min-h-svh w-full bg-white lg:grid lg:grid-cols-[minmax(420px,40%)_1fr]">
      <section
        className="relative hidden overflow-hidden lg:flex lg:flex-col lg:items-center lg:justify-center"
        style={{
          backgroundImage: "url('/services/services-bg.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto flex w-2/3 flex-col gap-5 px-8">
          {SERVICE_IMAGES.map((service, index) => (
            <div
              className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
              key={service.id}
            >
              <Image
                alt={service.alt}
                height={200}
                src={service.src}
                width={200}
              />
            </div>
          ))}
        </div>
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
            <Button
              className="h-[45px] w-[155px]"
              type="button"
              variant="gradient"
            >
              Continue
              <ArrowRight aria-hidden="true" className="size-[18px]" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
