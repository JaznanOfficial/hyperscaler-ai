"use client";

import { SendHorizontal, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type ServiceValue =
  | "cold-email"
  | "paid-ads"
  | "social-media"
  | "cold-calling"
  | "branding"
  | "cold-linkedin";

type InsightsDrawerProps = {
  defaultService?: ServiceValue;
};

export function InsightsDrawer({
  defaultService = "cold-email",
}: InsightsDrawerProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedService, setSelectedService] =
    useState<ServiceValue>(defaultService);
  const observations = [
    "Open rates dropped 5% this week — likely due to subject line fatigue",
    "Best send time: Tuesday 10am EST shows 32% higher engagement",
    "45% of meetings came from follow-up sequence (2nd-3rd touchpoint)",
  ];

  const suggestions = [
    "What is affecting my conversion rate?",
    "Compare to last month",
    "Benchmark my performance",
  ];

  const services = useMemo(
    () =>
      [
        {
          label: "Cold Email Campaign",
          value: "cold-email",
          color: "bg-emerald-500",
        },
        { label: "Paid Ads", value: "paid-ads", color: "bg-sky-500" },
        {
          label: "Social Media Marketing",
          value: "social-media",
          color: "bg-orange-400",
        },
        {
          label: "Cold Calling",
          value: "cold-calling",
          color: "bg-fuchsia-500",
        },
        {
          label: "Branding & Content Creation",
          value: "branding",
          color: "bg-rose-500",
        },
        {
          label: "Cold LinkedIn Outreach",
          value: "cold-linkedin",
          color: "bg-indigo-500",
        },
      ] satisfies {
        label: string;
        value: ServiceValue;
        color: string;
      }[],
    []
  );

  const activeService = services.find(
    (service) => service.value === selectedService
  );

  const handleTriggerClick = () => {
    setSelectedService(defaultService);
  };

  const handleServiceChange = (value: string) => {
    setSelectedService(value as ServiceValue);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button onClick={handleTriggerClick} size="icon" variant={"gradient"}>
          <Sparkles className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="w-full max-w-md border-none bg-white p-0"
        side="right"
      >
        <div className="flex h-full flex-col">
          <SheetHeader className="items-start bg-purple-200 px-6 py-4 text-left">
            <SheetTitle className="font-semibold text-lg text-slate-900">
              Hyperscaler AI Insights
            </SheetTitle>
            <SheetDescription asChild>
              <div className="flex flex-wrap items-center gap-3">
                <Select
                  onValueChange={handleServiceChange}
                  value={selectedService}
                >
                  <SelectTrigger className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 font-medium text-slate-700 text-sm shadow-sm">
                    <SelectValue>
                      <span className="inline-flex items-center gap-2">
                        <span
                          className={`size-2.5 rounded-full ${activeService?.color ?? "bg-emerald-500"}`}
                        />
                        {activeService?.label ?? "Select service"}
                      </span>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent align="start">
                    {services.map((service) => (
                      <SelectItem key={service.value} value={service.value}>
                        <span className="inline-flex items-center gap-2">
                          <span
                            className={`size-2.5 rounded-full ${service.color}`}
                          />
                          {service.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
            <div className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
              <div className="inline-flex items-center gap-2 font-medium text-slate-500 text-sm">
                <span className="size-4 rounded-full border border-slate-400" />
                3 Key observations
              </div>
              <ul className="list-disc space-y-2 pl-5 text-slate-600 text-sm">
                {observations.map((observation) => (
                  <li key={observation}>{observation}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col items-end gap-1">
                <p className="text-right font-medium text-slate-500 text-xs">
                  You
                </p>
                <div className="max-w-[70%] rounded-2xl rounded-br-sm bg-linear-to-br from-violet-600 to-fuchsia-500 px-4 py-3 font-semibold text-sm text-white">
                  Why is my reply rate low?
                </div>
              </div>
              <div className="flex flex-col gap-2 text-slate-600 text-sm">
                <p className="font-medium text-slate-500 text-xs">
                  Hyperscaler AI Assistant
                </p>
                <div className="space-y-2 rounded-2xl rounded-bl-sm border border-slate-200 bg-slate-100 px-4 py-3">
                  <p>
                    Based on your data, I've identified 3 factors affecting your
                    reply rate:
                  </p>
                  <ul className="list-decimal space-y-2 pl-4">
                    <li>
                      <span className="font-semibold">
                        High bounce rate (32%)
                      </span>{" "}
                      — Many emails aren't reaching inboxes. Clean your list.
                    </li>
                    <li>
                      <span className="font-semibold">Generic messaging</span> —
                      Positive reply rate is 80%, but overall replies are 5.8%.
                      Add more personalization.
                    </li>
                    <li>
                      <span className="font-semibold">Timing</span> — 60% of
                      emails go out on Mondays when inboxes are saturated. Try
                      Tuesday/Wednesday.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="border-slate-100 border-t bg-slate-50 px-6 py-4">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2">
              <input
                aria-label="Ask about this service"
                className="flex-1 bg-transparent text-slate-700 text-sm outline-none placeholder:text-slate-400"
                placeholder="Ask about this service..."
              />
              <Button
                className="rounded-xl bg-linear-to-br from-violet-600 to-fuchsia-500 text-white"
                size="icon"
                type="button"
              >
                <SendHorizontal className="size-4" />
              </Button>
            </div>
            <button
              className="mt-3 font-medium text-sm text-violet-700 hover:text-violet-900"
              onClick={() => setShowSuggestions((prev) => !prev)}
              type="button"
            >
              Suggestions {showSuggestions ? "▾" : "▸"}
            </button>
          </div>
          {showSuggestions && (
            <div className="border-slate-100 border-t px-6 py-5">
              <p className="mb-3 font-medium text-slate-600 text-sm">
                Suggested questions
              </p>
              <div className="space-y-2">
                {suggestions.map((suggestion) => (
                  <button
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-left font-medium text-slate-600 text-xs hover:border-violet-200 hover:bg-violet-50"
                    key={suggestion}
                    type="button"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
