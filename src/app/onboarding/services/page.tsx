"use client";

import {
  ArrowLeft,
  ArrowRight,
  Code,
  Funnel,
  Loader2,
  Share2,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

const SERVICE_IMAGES = [
  {
    id: "paid-ads",
    clear: "/services/Paid Ads/Clear.svg",
    blurred: "/services/Paid Ads/Blurred.svg",
    alt: "Paid Ads",
  },
  {
    id: "social-media",
    clear: "/services/Social Media/Clear.svg",
    blurred: "/services/Social Media/Blurred.svg",
    alt: "Social Media",
  },
  {
    id: "software-dev",
    clear: "/services/Software Dev/Clear.svg",
    blurred: "/services/Software Dev/Blurred.svg",
    alt: "Content & Brand",
  },
  {
    id: "outbound-growth",
    clear: "/services/Outbound Growth/Clear.svg",
    blurred: "/services/Outbound Growth/Blurred.svg",
    alt: "Outbound Growth",
  },
];

const SERVICE_OPTIONS = [
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
];

export default function ServicesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const anonId = searchParams.get("anonId");

  useEffect(() => {
    if (status === "loading") {
      return;
    }
    if (!(isAuthenticated || anonId)) {
      router.replace("/onboarding/business");
    }
  }, [anonId, isAuthenticated, router, status]);

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function toggleService(id: string) {
    setSelectedServices((prev) =>
      prev.includes(id)
        ? prev.filter((serviceId) => serviceId !== id)
        : [...prev, id]
    );
  }

  async function saveSelectedServices(targetAnonId?: string) {
    const response = await fetch(
      isAuthenticated
        ? "/api/auth/onboarding/services"
        : "/api/onboarding/anon/services",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(isAuthenticated ? {} : { anonId: targetAnonId as string }),
          services: selectedServices,
        }),
      }
    );

    const data = (await response.json()) as {
      success: boolean;
      message?: string;
    };

    if (!(response.ok && data.success)) {
      throw new Error(data.message || "Failed to save services");
    }
  }

  async function onContinue() {
    if (isLoading) {
      return;
    }

    if (!(isAuthenticated || anonId)) {
      toast.error("Missing anonymous onboarding identifier", {
        richColors: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      await saveSelectedServices(anonId || undefined);

      if (isAuthenticated) {
        router.push("/onboarding/source");
        return;
      }

      router.push(
        `/onboarding/source?anonId=${encodeURIComponent(anonId ?? "")}`
      );
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(message, { richColors: true });
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-svh w-full bg-white lg:grid lg:grid-cols-[minmax(420px,40%)_1fr]">
      <section
        className="relative hidden overflow-hidden lg:flex lg:flex-col lg:items-center lg:justify-center"
        style={{
          backgroundImage: "url('/services/services-bg.svg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="mx-auto flex w-2/3 flex-col gap-5 px-8">
          {SERVICE_IMAGES.map((service, index) => {
            const isSelected = selectedServices.includes(service.id);
            const imageSize = isSelected ? 200 : 170;

            return (
              <div
                className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                key={service.id}
              >
                <div
                  className={`transition-transform duration-300 ${
                    isSelected ? "scale-103" : "scale-100"
                  }`}
                >
                  <Image
                    alt={service.alt}
                    className={`rounded-2xl transition-all duration-300 ${
                      isSelected ? "opacity-100 drop-shadow-xl" : "opacity-80"
                    }`}
                    height={imageSize}
                    src={isSelected ? service.clear : service.blurred}
                    width={imageSize}
                  />
                </div>
              </div>
            );
          })}
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
              href={
                isAuthenticated || !anonId
                  ? "/onboarding/business"
                  : `/onboarding/business?anonId=${encodeURIComponent(anonId)}`
              }
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
                disabled={isLoading}
                onClick={() =>
                  router.push(
                    isAuthenticated
                      ? "/onboarding/book-a-demo"
                      : `/onboarding/book-a-demo?anonId=${encodeURIComponent(
                          anonId ?? ""
                        )}`
                  )
                }
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
