"use client";

import {
  ArrowLeft,
  ArrowRight,
  CircleHelp,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const SOURCE_OPTIONS = [
  { id: "linkedin", label: "LinkedIn", icon: Linkedin },
  { id: "google", label: "Google Search", icon: Search },
  { id: "facebook", label: "Facebook", icon: Facebook },
  { id: "instagram", label: "Instagram", icon: Instagram },
  { id: "outreach", label: "Cold Email or Outreach", icon: Mail },
  { id: "other", label: "Other", icon: CircleHelp },
] as const;

export default function SourcePage() {
  const [source, setSource] =
    useState<(typeof SOURCE_OPTIONS)[number]["id"]>("linkedin");

  return (
    <main className="min-h-svh w-full bg-white lg:flex">
      <section className="relative hidden w-1/2 overflow-hidden lg:block">
        <video
          autoPlay
          className="h-full object-cover"
          loop
          muted
          src="/source.mp4"
        />
      </section>

      <section className="flex w-full items-center justify-center">
        <div className="flex w-full max-w-[560px] flex-col items-center gap-12 px-6 py-16 text-center sm:px-10 lg:px-16">
          <div className="mb-9 flex w-full items-center justify-between">
            <div className="w-[160px]">
              <p className="mb-3 text-[#515A65] text-base">Step 3 of 3</p>
              <div className="flex items-center gap-[5px]">
                <span className="h-2 w-[53px] rounded bg-[#B9BDC1]" />
                <span className="h-2 w-[51px] rounded bg-[#B9BDC1]" />
                <span className="h-2 w-[51px] rounded bg-[#D8ADF1]" />
              </div>
            </div>

            <Link
              className="inline-flex items-center gap-1.5 font-medium text-[#515A65] text-base no-underline"
              href="/onboarding/services"
            >
              <ArrowLeft aria-hidden="true" className="size-5" />
              Back
            </Link>
          </div>
          <div className="flex flex-col items-center gap-8">
            <div className="space-y-4">
              <h1 className="font-['Outfit'] font-medium text-4xl text-[#1A1A1A] leading-[1.4] sm:text-[40px]">
                How did you discover Hyperscaler?
              </h1>
            </div>
          </div>

          <div className="w-full space-y-[22px]">
            {SOURCE_OPTIONS.map(({ id, label, icon: Icon }) => {
              const selected = source === id;

              return (
                <button
                  className={`flex h-[60px] w-full items-center gap-3 rounded-xl border bg-white px-6 text-left shadow-[0px_1px_3px_0px_rgba(0,0,0,0.02),0px_2px_4px_0px_rgba(0,0,0,0.04)] transition-colors ${
                    selected
                      ? "border-[#C084FC] bg-[#FAF5FF]"
                      : "border-[#D1D1D1] hover:border-[#B9BDC1]"
                  }`}
                  key={id}
                  onClick={() => setSource(id)}
                  type="button"
                >
                  <Icon className="size-[18px] text-[#1A1A1A]" />
                  <span className="font-semibold text-2sm text-[#1A1A1A] leading-[1.4]">
                    {label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex w-full max-w-[292px] flex-col items-center gap-4">
            <Button
              className="h-[52px] w-full"
              size="lg"
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
