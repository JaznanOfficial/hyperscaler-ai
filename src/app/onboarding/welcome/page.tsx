"use client";
import { ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Button } from "@/components/ui/button";

const sidebarPreviewImage = "/onboarding/Hyperscaler-Onboarding.gif";
const sidebarSurfaceImage =
  "https://www.figma.com/api/mcp/asset/279f7d50-adf4-4376-b5ea-19b5b17d01cb";

export default function WelcomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <main className="min-h-svh w-full bg-white lg:grid lg:grid-cols-[minmax(420px,40%)_1fr]">
      <section className="relative m-4 hidden overflow-hidden rounded-3xl bg-[#EBDDFA] lg:block">
        <div className="absolute -top-[350px] -left-[520px] h-[980px] w-[980px] rounded-full border border-[#DDC4F8]" />
        <div className="absolute -top-[190px] -left-[360px] h-[760px] w-[760px] rounded-full border border-[#DDC4F8]" />
        <div className="absolute -top-[60px] -left-[220px] h-[540px] w-[540px] rounded-full border border-[#DDC4F8]" />
        <div className="absolute top-[90px] -left-[80px] h-[320px] w-[320px] rounded-full border border-[#DDC4F8]" />

        <div className="absolute inset-y-[10%] left-[18%] w-[62%] rounded-3xl border border-white/30 bg-white/55 p-4 shadow-2xl backdrop-blur-[1px]">
          <img
            alt="Hyperscaler assistant preview"
            className="h-full w-full rounded-2xl object-cover opacity-90"
            src={sidebarSurfaceImage}
          />
        </div>

        <img
          alt="Hyperscaller onboarding"
          aria-hidden="true"
          className="absolute top-1/2 -right-[70%] hidden h-[92%] -translate-y-1/2 rounded-2xl object-cover opacity-50 xl:block"
          src={sidebarPreviewImage}
        />
      </section>

      <section className="flex min-h-svh items-center justify-center px-6 py-16 sm:px-10 lg:px-16">
        <div className="flex w-full max-w-[560px] flex-col items-center gap-12 text-center">
          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-2">
              <Image
                alt="Hyperscaler"
                height={200}
                priority
                src="/logo.png"
                width={200}
              />
            </div>

            <div className="space-y-4">
              <h1 className="font-['Outfit'] font-medium text-4xl text-[#1A1A1A] leading-[1.4] sm:text-[40px]">
                Welcome onboard
              </h1>
              <p className="mx-auto max-w-[560px] text-[#515A65] text-base leading-6">
                Let&apos;s tailor Hyperscaler to your business and start
                unlocking smarter ways to build, launch, and grow
              </p>
            </div>
          </div>

          <div className="flex w-full max-w-[292px] flex-col items-center gap-4">
            <Button
              className="h-[52px] w-full"
              disabled={isLoading}
              onClick={() => {
                setIsLoading(true);
                router.push("/onboarding/business");
              }}
              size="lg"
              type="button"
              variant="gradient"
            >
              {isLoading ? (
                <>
                  Loading
                  <Loader2
                    aria-hidden="true"
                    className="size-[18px] animate-spin"
                  />
                </>
              ) : (
                <>
                  Let&apos;s Get Started
                  <ArrowRight aria-hidden="true" className="size-[18px]" />
                </>
              )}
            </Button>
            <p className="text-[#515A65] text-sm leading-normal">
              This takes less than 2 minutes.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
