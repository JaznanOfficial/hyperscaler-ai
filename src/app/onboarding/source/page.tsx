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

const logoLinkedIn =
  "https://www.figma.com/api/mcp/asset/eb37de3a-9208-4f6c-9577-075920b97d6e";
const logoGoogle =
  "https://www.figma.com/api/mcp/asset/65ed1871-a951-406d-bc68-2679560cafc7";
const logoInstagram =
  "https://www.figma.com/api/mcp/asset/b1aa4fe3-3dcd-4938-a711-c1dd04a87136";
const logoFacebook =
  "https://www.figma.com/api/mcp/asset/04980a44-371a-4694-a959-b0f93940d706";
const logoGmail =
  "https://www.figma.com/api/mcp/asset/bb565eec-e2ea-4df3-bd48-538a45a5b8e8";

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
    <main className="min-h-svh w-full bg-white lg:grid lg:grid-cols-[minmax(420px,40%)_1fr]">
      <section className="relative hidden overflow-hidden bg-[#EBDDFA] lg:block">
        <div className="absolute -top-[350px] -left-[520px] h-[980px] w-[980px] rounded-full border border-[#DDC4F8]" />
        <div className="absolute -top-[190px] -left-[360px] h-[760px] w-[760px] rounded-full border border-[#DDC4F8]" />
        <div className="absolute -top-[60px] -left-[220px] h-[540px] w-[540px] rounded-full border border-[#DDC4F8]" />
        <div className="absolute top-[90px] -left-[80px] h-[320px] w-[320px] rounded-full border border-[#DDC4F8]" />

        <div className="absolute top-[110px] left-[72px] rounded-xl bg-[#D8ADF1]/40 p-2">
          <img
            alt="LinkedIn"
            className="h-[72px] w-[72px] rounded-[7px] object-cover"
            src={logoLinkedIn}
          />
        </div>
        <div className="absolute top-[199px] left-[289px] rounded-xl bg-[#D8ADF1]/40 p-2">
          <img
            alt="Google"
            className="h-[72px] w-[72px] rounded-[7px] object-cover"
            src={logoGoogle}
          />
        </div>
        <div className="absolute top-[397px] left-[109px] rounded-xl bg-[#D8ADF1]/40 p-2">
          <img
            alt="Instagram"
            className="h-[72px] w-[72px] rounded-[7px] object-cover"
            src={logoInstagram}
          />
        </div>
        <div className="absolute top-[460px] left-[324px] rounded-xl bg-[#D8ADF1]/40 p-2">
          <img
            alt="Facebook"
            className="h-[72px] w-[72px] rounded-[7px] object-cover"
            src={logoFacebook}
          />
        </div>
        <div className="absolute top-[647px] left-[145px] rounded-xl bg-[#D8ADF1]/40 p-2">
          <img
            alt="Gmail"
            className="h-[72px] w-[72px] rounded-[7px] object-cover"
            src={logoGmail}
          />
        </div>

        <div className="absolute inset-y-0 right-0 w-[56%] bg-linear-to-r from-[#EBDDFA]/0 to-white/85" />
      </section>

      <section className="flex min-h-svh justify-center px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
        <div className="w-full max-w-[760px]">
          <div className="mb-9 flex items-center justify-between">
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
              href={
                isAuthenticated || !anonId
                  ? "/onboarding/services"
                  : `/onboarding/services?anonId=${encodeURIComponent(anonId)}`
              }
            >
              <ArrowLeft aria-hidden="true" className="size-5" />
              Back
            </Link>
          </div>

          <div className="mb-10">
            <h1 className="font-['Outfit'] font-medium text-3xl text-[#1A1A1A] leading-normal sm:text-[32px]">
              How did you discover Hyperscaler?
            </h1>
          </div>

          <div className="space-y-[22px]">
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

          <div className="mt-7">
            <div className="flex items-center gap-3">
              <Button
                className="h-[45px] w-[155px]"
                onClick={() =>
                  router.push(
                    isAuthenticated || !anonId
                      ? "/onboarding/book-a-demo"
                      : `/onboarding/book-a-demo?anonId=${encodeURIComponent(anonId)}`
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