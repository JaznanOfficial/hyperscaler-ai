"use client";

import {
  ArrowUp,
  ChartSpline,
  Lightbulb,
  Package,
  Rocket,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  HERO_PROMPT_SEND_KEY,
  HERO_PROMPT_STORAGE_KEY,
} from "@/lib/chat-storage";
import { cn } from "@/lib/utils";

const InputSuggestions = [
  {
    id: 1,
    icon: <Rocket className="size-2 sm:size-3" />,
    label: "I'm launching a startup",
  },
  {
    id: 2,
    icon: <ChartSpline className="size-2 sm:size-3" />,
    label: "I need to scale my marketing",
  },
  {
    id: 3,
    icon: <Lightbulb className="size-2 sm:size-3" />,
    label: "I need to build a product",
  },
];

export function Hero() {
  const [selectedSuggestionId, setSelectedSuggestionId] = useState<
    number | null
  >(null);
  const [prompt, setPrompt] = useState("");
  const router = useRouter();

  const handlePromptSubmit = useCallback(() => {
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt) {
      return;
    }

    try {
      localStorage.setItem(HERO_PROMPT_STORAGE_KEY, trimmedPrompt);
      localStorage.setItem(HERO_PROMPT_SEND_KEY, "true");
    } catch (error) {
      console.error("Failed to cache hero prompt", error);
    }

    router.push("/chat");
  }, [prompt, router]);

  return (
    <section className="relative">
      <Image alt="Hero" className="h-full w-full" fill src="/hero-bg.png" />
      <div className="relative z-10 mx-auto my-container flex min-h-[85vh] flex-col items-center justify-center gap-8 px-4 py-12 text-center sm:px-6 sm:py-20 md:gap-13">
        <div className="max-w-5xl space-y-4">
          <div className="inline-flex items-center rounded-full border border-purple-600 bg-white px-4 py-1.5 font-medium text-[#9E32DD] text-sm">
            <Sparkles className="mr-2 size-4" /> AI-Powered Growth & Development
            Platform
          </div>
          <h1
            className={cn(
              "font-['Outfit']",
              "mx-auto max-w-2xl font-medium text-[#1A1A1A] text-[28px] leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
            )}
          >
            Stop being the
            <span className="bg-linear-to-r from-[#6B46C1] to-[#9E32DD] bg-clip-text text-transparent">
              {" "}
              bottleneck{" "}
            </span>
            in your own company&apos;s growth.
          </h1>
          <p className="text-[#515A65] text-sm sm:text-base md:text-lg">
            Hyperscaler pairs AI agents with human experts to run your
            marketing, build your product, and scale your business — while you
            focus on what matters. Tell our AI what you need, and we handle the
            rest
          </p>
        </div>

        <div className="relative w-full max-w-[800px] text-left">
          <Textarea
            className={cn(
              "max-h-32 min-h-24 w-full rounded-lg border border-[#D1D1D1] bg-white p-2 shadow focus-visible:border-gray-300 focus-visible:ring-2 focus-visible:ring-purple-400 max-sm:placeholder:text-sm md:p-4 md:pr-8",
              ""
            )}
            maxLength={500}
            onChange={(event) => {
              setPrompt(event.target.value);
              if (selectedSuggestionId !== null) {
                setSelectedSuggestionId(null);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handlePromptSubmit();
              }
            }}
            placeholder="What are you trying to grow?"
            rows={5}
            value={prompt}
          />
          <div className="absolute right-2 bottom-2">
            <Button
              className="rounded-lg"
              onClick={handlePromptSubmit}
              size="icon-sm"
              variant={"gradient"}
            >
              <ArrowUp className="size-5 font-bold" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {InputSuggestions.map((suggestion) => (
            <button
              className="flex cursor-pointer items-center gap-2 rounded-md border border-purple-400 bg-white px-2 py-1 text-purple-600 text-xs transition-colors hover:bg-gray-50 sm:text-sm"
              key={suggestion.id}
              onClick={() =>
                setSelectedSuggestionId((prev) => {
                  const nextId = prev === suggestion.id ? null : suggestion.id;
                  setPrompt(suggestion.label);
                  return nextId;
                })
              }
              type="button"
            >
              {suggestion.icon}
              {suggestion.label}
            </button>
          ))}
        </div>
        <Link href={"/services"}>
          <Button className="w-full sm:w-fit" variant={"gradient"}>
            <Package className="size-4" /> Browse Services
          </Button>
        </Link>
      </div>
    </section>
  );
}
