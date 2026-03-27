"use client";

import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

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

const sidebarSurfaceImage = "/onboarding/bg-business.png";

export default function BusinessPage() {
  const router = useRouter();
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState(INDUSTRIES[0]);
  const [selectedStage, setSelectedStage] = useState("Startup");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [monthlyRevenueRange, setMonthlyRevenueRange] = useState(
    REVENUE_RANGES[0]
  );

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        isAuthenticated
          ? "/api/auth/onboarding/business"
          : "/api/onboarding/anon/business",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            phone,
            businessName,
            industry,
            businessStage: selectedStage,
            websiteUrl,
            monthlyRevenueRange,
          }),
        }
      );

      const data = (await response.json()) as {
        success: boolean;
        message?: string;
        data?: {
          anonId?: string;
        };
      };

      if (!(response.ok && data.success)) {
        throw new Error(data.message || "Failed to save onboarding data");
      }

      if (isAuthenticated) {
        router.push("/onboarding/services");
        return;
      }

      const anonId = data.data?.anonId;
      if (!anonId) {
        throw new Error("Failed to create anonymous onboarding profile");
      }

      router.push(`/onboarding/services?anonId=${encodeURIComponent(anonId)}`);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(message, { richColors: true });
      setIsLoading(false);
    }
  }

  return (
    <main className="h-svh w-full overflow-hidden bg-white lg:grid lg:grid-cols-[minmax(420px,40%)_1fr]">
      <section className="relative hidden h-svh overflow-hidden bg-[#EBDDFA] lg:block">
        <img
          alt="Hyperscaler assistant preview"
          className="absolute inset-0 h-full w-full object-cover object-top opacity-90"
          src={sidebarSurfaceImage}
        />
      </section>

      <section className="flex h-svh justify-center overflow-y-auto px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
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
          </div>

          <div className="mb-10 space-y-2">
            <h1 className="font-['Outfit'] font-medium text-3xl text-[#1A1A1A] leading-[1.5] sm:text-[32px]">
              Tell us about your business
            </h1>
            <p className="text-[#515A65] text-base leading-6">
              Help us shape Hyperscaler around how you build and grow.
            </p>
          </div>

          <form className="space-y-7" onSubmit={onSubmit}>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-3">
                <label
                  className="font-normal text-[#1A1A1A] text-base"
                  htmlFor="full-name"
                >
                  Full name
                </label>
                <Input
                  className="h-10 border-[#E4E4E7] bg-[#F5F5F5] placeholder:text-[#71717A]"
                  disabled={isLoading}
                  id="full-name"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ada Lovelace"
                  required
                  value={name}
                />
              </div>

              <div className="space-y-3">
                <label
                  className="font-normal text-[#1A1A1A] text-base"
                  htmlFor="phone"
                >
                  Phone number
                </label>
                <Input
                  className="h-10 border-[#E4E4E7] bg-[#F5F5F5] placeholder:text-[#71717A]"
                  disabled={isLoading}
                  id="phone"
                  inputMode="tel"
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 555 123 4567"
                  required
                  type="tel"
                  value={phone}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label
                className="font-normal text-[#1A1A1A] text-base"
                htmlFor="business-name"
              >
                Business Name
              </label>
              <Input
                className="h-10 border-[#E4E4E7] bg-[#F5F5F5] placeholder:text-[#71717A]"
                disabled={isLoading}
                id="business-name"
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Acme Inc"
                required
                value={businessName}
              />
            </div>

            <div className="space-y-3">
              <label
                className="font-normal text-[#1A1A1A] text-base"
                htmlFor="industry"
              >
                Industry/ Niche
              </label>
              <Select
                defaultValue={industry}
                onValueChange={(value) => setIndustry(value)}
              >
                <SelectTrigger
                  className="h-10 w-full border-[#E4E4E7] bg-[#F5F5F5] text-[#414851] shadow-none"
                  disabled={isLoading}
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
                      disabled={isLoading}
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
                disabled={isLoading}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://example.com"
                type="text"
                value={websiteUrl}
              />
            </div>

            <div className="space-y-3">
              <p className="font-normal text-[#1A1A1A] text-base">
                Monthly Revenue Range{" "}
                <span className="opacity-60">(optional)</span>
              </p>
              <Select
                defaultValue={monthlyRevenueRange}
                onValueChange={(value) => setMonthlyRevenueRange(value)}
              >
                <SelectTrigger
                  className="h-10 w-full border-[#E4E4E7] bg-[#F5F5F5] text-[#414851] shadow-none"
                  disabled={isLoading}
                >
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
              className="mb-10 h-[45px] w-[155px]"
              disabled={isLoading}
              type="submit"
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
          </form>
        </div>
      </section>
    </main>
  );
}