"use client";
import { ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Button } from "@/components/ui/button";

export default function WelcomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <main className="min-h-svh w-full bg-white lg:grid lg:grid-cols-[minmax(420px,40%)_1fr]">
      <section className="relative hidden min-h-screen overflow-hidden bg-[#EBDDFA] lg:block">
        <video
          autoPlay
          className="h-screen w-full object-cover"
          loop
          muted
          src="/welcome-page-video.mp4"
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
                Welcome, Jamie
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
                if (isLoading) {
                  return;
                }
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
