"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const leftPreviewImage = "/onboarding/business-onboarding.png";

const INDUSTRIES = [
  "SaaS",
  "Local Business",
  "Agency",
  "E-commerce",
  "Real Estate",
  "Healthcare",
  "Other",
];

const REVENUE_RANGES = [
  "Prefer not to say",
  "Under $10k / month",
  "$10k - $50k / month",
  "$50k - $250k / month",
  "$250k+ / month",
];

const STAGES = ["Startup", "Growing", "Established", "Enterprise"];

export default function BusinessPage() {
  const [selectedStage, setSelectedStage] = useState("Startup");

  return (
    <main className="min-h-svh w-full bg-white lg:grid lg:grid-cols-[minmax(420px,40%)_1fr]">
      <section className="relative hidden overflow-hidden bg-[#EBDDFA] lg:block" />

      <section className="flex min-h-svh justify-center px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
        <div className="w-full max-w-[760px]">
          <div className="mb-9 flex items-center justify-between">
            <div className="w-[160px]">
              <p className="mb-3 text-[#515A65] text-base">Step 1 of 3</p>
              <div className="flex items-center gap-[5px]">
                <span className="h-2 w-[51px] rounded bg-[#D8ADF1]" />
                <span className="h-2 w-[53px] rounded bg-[#B9BDC1]" />
                <span className="h-2 w-[51px] rounded bg-[#B9BDC1]" />
              </div>
            </div>

            <Link
              className="inline-flex items-center gap-1.5 font-medium text-[#515A65] text-base no-underline"
              href="/onboarding/welcome"
            >
              <ArrowLeft aria-hidden="true" className="size-5" />
              Back
            </Link>
          </div>

          <div className="mb-10 space-y-2">
            <h1 className="font-['Outfit'] font-medium text-3xl text-[#1A1A1A] leading-[1.5] sm:text-[32px]">
              Tell us about your business
            </h1>
            <p className="text-[#515A65] text-base leading-6">
              Help us shape Hyperscaler around how you build and grow.
            </p>
          </div>

          <form className="space-y-7">
            <div className="space-y-3">
              <label
                className="font-normal text-[#1A1A1A] text-base"
                htmlFor="business-name"
              >
                Business Name
              </label>
              <Input
                className="h-10 border-[#E4E4E7] bg-[#F5F5F5] placeholder:text-[#71717A]"
                id="business-name"
                placeholder="client@example.com"
              />
            </div>

            <div className="space-y-3">
              <label
                className="font-normal text-[#1A1A1A] text-base"
                htmlFor="industry"
              >
                Industry/ Niche
              </label>
              <Select defaultValue={INDUSTRIES[0]}>
                <SelectTrigger
                  className="h-10 w-full border-[#E4E4E7] bg-[#F5F5F5] text-[#414851] shadow-none"
                  id="industry"
                >
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent className="w-[--radix-select-trigger-width]">
                  {INDUSTRIES.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <p className="font-normal text-[#1A1A1A] text-base">
                Business Stage
              </p>
              <div className="flex flex-wrap gap-4">
                {STAGES.map((stage) => {
                  const isSelected = selectedStage === stage;
                  return (
                    <button
                      className={`h-9 rounded-full border px-6 font-medium text-sm transition-colors ${
                        isSelected
                          ? "border-[#C084FC] bg-[#F3E8FF] text-[#7E22CE]"
                          : "border-[#E4E4E7] bg-[#F5F5F5] text-[#515A65]"
                      }`}
                      key={stage}
                      onClick={() => setSelectedStage(stage)}
                      type="button"
                    >
                      {stage}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <p className="font-normal text-[#1A1A1A] text-base">
                Website URL <span className="opacity-60">(optional)</span>
              </p>
              <Input
                className="h-10 border-[#E4E4E7] bg-[#F5F5F5] placeholder:text-[#71717A]"
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-3">
              <p className="font-normal text-[#1A1A1A] text-base">
                Monthly Revenue Range{" "}
                <span className="opacity-60">(optional)</span>
              </p>
              <Select defaultValue={REVENUE_RANGES[0]}>
                <SelectTrigger className="h-10 w-full border-[#E4E4E7] bg-[#F5F5F5] text-[#414851] shadow-none">
                  <SelectValue placeholder="Prefer not to say" />
                </SelectTrigger>
                <SelectContent className="w-[--radix-select-trigger-width]">
                  {REVENUE_RANGES.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              className="h-[45px] w-[155px]"
              type="button"
              variant="gradient"
            >
              Continue
              <ArrowRight aria-hidden="true" className="size-[18px]" />
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
