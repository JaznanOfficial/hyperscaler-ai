"use client";

import {
  ArrowLeft,
  ArrowRight,
  CircleHelp,
  Facebook,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const anonId = searchParams.get("anonId");

  useEffect(() => {
    if (status === "loading") return;
    if (!(isAuthenticated || anonId)) {
      router.replace("/onboarding/business");
    }
  }, [anonId, isAuthenticated, router, status]);

  const [source, setSource] =
    useState<(typeof SOURCE_OPTIONS)[number]["id"]>("linkedin");
  const [isLoading, setIsLoading] = useState(false);

  async function onContinue() {
    if (isLoading) return;

    if (!(isAuthenticated || anonId)) {
      toast.error("Missing anonymous onboarding identifier", {
        richColors: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        isAuthenticated
          ? "/api/auth/onboarding/source"
          : "/api/onboarding/anon/source",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...(isAuthenticated ? {} : { anonId: anonId as string }),
            discoverySource: source,
          }),
        }
      );

      const data = (await response.json()) as {
        success: boolean;
        message?: string;
      };

      if (!(response.ok && data.success)) {
        throw new Error(data.message || "Failed to save discovery source");
      }

      if (isAuthenticated) {
        router.push("/onboarding/success");
        return;
      }

      if (!anonId) {
        throw new Error("Missing anonymous onboarding identifier");
      }

      router.push(
        `/onboarding/book-a-demo?anonId=${encodeURIComponent(anonId)}`
      );
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(message, { richColors: true });
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-svh w-full bg-white lg:flex">
      <section className="relative hidden w-1/2 overflow-hidden lg:block">
        <video
          autoPlay
          className="h-full w-full object-cover"
          loop
          muted
          playsInline
          src="/source.mp4"
        />
      </section>

      <section className="flex w-full items-center justify-center">
        <div className="flex w-full flex-col items-center gap-12 px-6 py-16 text-center sm:px-10 lg:px-16">
          <div className="mb-9 flex w-full items-center justify-between">
            <div className="w-[160px] text-left">
              <p className="mb-3 text-[#515A65] text-base">Step 3 of 3</p>
              <div className="flex items-center gap-[5px]">
                <span className="h-2 w-[53px] rounded bg-[#B9BDC1]" />
                <span className="h-2 w-[51px] rounded bg-[#B9BDC1]" />
                <span className="h-2 w-[51px] rounded bg-[#D8ADF1]" />
              </div>
            </div>

            <Link
              className="inline-flex items-center gap-1.5 font-medium text-[#515A65] text-base no-underline"
              href={
                isAuthenticated || !anonId
                  ? "/onboarding/services"
                  : `/onboarding/services?anonId=${encodeURIComponent(anonId ?? "")}`
              }
            >
              <ArrowLeft aria-hidden="true" className="size-5" />
              Back
            </Link>
          </div>

          <div className="space-y-4">
            <h1 className="font-['Outfit'] font-medium text-4xl text-[#1A1A1A] leading-[1.4] sm:text-[40px]">
              How did you discover Hyperscaler?
            </h1>
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

          <div className="flex items-center gap-3 self-start">
            <Button
              className="h-[45px] w-[155px]"
              disabled={isLoading}
              onClick={() =>
                router.push(
                  isAuthenticated || !anonId
                    ? "/onboarding/book-a-demo"
                    : `/onboarding/book-a-demo?anonId=${encodeURIComponent(anonId ?? "")}`
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
      </section>
    </main>
  );
}
