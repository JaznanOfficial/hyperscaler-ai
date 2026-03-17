"use client";

import Link from "next/link";
import { Check, LayoutDashboard } from "lucide-react";

import { Button } from "@/components/ui/button";

const sidebarPreviewImage = "https://www.figma.com/api/mcp/asset/7742e611-3546-4f19-b3ca-30c73e278f6b";

const NEXT_STEPS = [
  "The team has been notified",
  "Your dashboard is being personalized",
  "Expect an email from us within 2 hours",
];

export default function SuccessPage() {
  return (
    <main className="bg-white min-h-svh w-full lg:grid lg:grid-cols-[minmax(420px,40%)_1fr]">
      <section className="relative hidden overflow-hidden bg-[#EBDDFA] lg:block">
        <div className="absolute -left-[520px] -top-[350px] h-[980px] w-[980px] rounded-full border border-[#DDC4F8]" />
        <div className="absolute -left-[360px] -top-[190px] h-[760px] w-[760px] rounded-full border border-[#DDC4F8]" />
        <div className="absolute -left-[220px] -top-[60px] h-[540px] w-[540px] rounded-full border border-[#DDC4F8]" />
        <div className="absolute -left-[80px] top-[90px] h-[320px] w-[320px] rounded-full border border-[#DDC4F8]" />
        <img
          alt=""
          aria-hidden="true"
          className="absolute inset-y-0 right-0 h-full w-[78%] object-cover opacity-40"
          src={sidebarPreviewImage}
        />
        <div className="absolute inset-y-0 right-0 w-[64%] bg-linear-to-r from-[#EBDDFA]/0 to-white/85" />
      </section>

      <section className="flex min-h-svh items-center justify-center px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
        <div className="w-full max-w-[640px]">
          <div className="mb-12 flex flex-col items-center gap-4 text-center">
            <span className="flex size-16 items-center justify-center rounded-full border border-[#A7E8BF] bg-[#D3F3DF] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.02),0px_2px_4px_0px_rgba(0,0,0,0.04)]">
              <Check aria-hidden="true" className="size-7 text-[#15803D]" />
            </span>
            <h1 className="font-['Outfit'] font-medium text-[#1A1A1A] text-4xl leading-[1.4] sm:text-[40px]">
              You&apos;re all set, Jamie !
            </h1>
          </div>

          <div className="mx-auto mb-11 max-w-[470px]">
            <p className="mb-[18px] font-medium text-[#515A65] text-sm leading-[1.4]">
              What happens next
            </p>
            <div className="space-y-[18px]">
              {NEXT_STEPS.map((step, index) => (
                <div className="flex h-10 items-center gap-3" key={step}>
                  <span className="flex size-[30px] items-center justify-center rounded-full border border-[#D1D1D1] bg-[#F5F5F5] font-semibold text-[#414851] text-sm leading-[1.4] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.02),0px_2px_4px_0px_rgba(0,0,0,0.04)]">
                    {index + 1}
                  </span>
                  <p className="font-semibold text-[#1A1A1A] text-base leading-[1.4]">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild className="h-12 min-w-[220px]" size="lg" variant="gradient">
              <Link href="/client">
                <LayoutDashboard aria-hidden="true" className="size-[18px]" />
                Go to my Dashboard
              </Link>
            </Button>
            <Button
              asChild
              className="h-12 min-w-[220px] border-[#D1D1D1] text-[#515A65] hover:bg-transparent"
              size="lg"
              variant="outline"
            >
              <Link href="/contact">Schedule a Call</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}