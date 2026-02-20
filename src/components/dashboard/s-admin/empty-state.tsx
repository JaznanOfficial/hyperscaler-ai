"use client";

import { ArrowUp, Compass, RefreshCw, Rocket, Sparkles } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

const superAdminQuickActions = [
  {
    title: "Review Operations",
    description:
      "Get a snapshot of automation performance, active escalations, and team updates.",
    prompt: "Summarize today's automation performance and escalations.",
    icon: Compass,
  },
  {
    title: "Strategic Decisions",
    description:
      "Surface the biggest risks, opportunities, and recommended actions for leadership.",
    prompt: "What strategic actions should I prioritize right now?",
    icon: RefreshCw,
  },
  {
    title: "Deployment Readiness",
    description:
      "Check upcoming launches, blockers, and stakeholder status in one place.",
    prompt: "Show deployment readiness across major initiatives.",
    icon: Rocket,
  },
] as const;

export function SuperAdminAgentEmptyState({
  draft,
  onDraftChange,
  onSubmit,
  textareaRef,
}: {
  draft: string;
  onDraftChange: (value: string) => void;
  onSubmit: () => void;
  textareaRef?: React.RefObject<HTMLTextAreaElement | null>;
}) {
  return (
    <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-12 px-0 py-10 text-center">
      <div className="flex w-full max-w-3xl flex-col items-center gap-7">
        <div className="flex items-center justify-center">
          <Image
            alt="Hyperscaler logo"
            className="h-14 w-24 object-contain"
            height={56}
            priority
            src="/logo-without-text.png"
            width={96}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-3xl text-slate-900 leading-10">
            Welcome back, Super Admin
          </p>
          <p className="text-base text-slate-600 leading-6">
            What executive insight or escalation should I prep for you?
          </p>
        </div>
        <form
          className="relative flex w-full items-stretch rounded-2xl border border-slate-200 bg-white px-2 py-2 shadow-[0px_2px_4px_rgba(0,0,0,0.04)]"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <textarea
            className="min-h-22 flex-1 resize-none rounded-2xl border-0 bg-transparent px-4 py-4 pr-16 text-base text-slate-900 outline-none focus:ring-0"
            onChange={(event) => onDraftChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                onSubmit();
              }
            }}
            placeholder="What should Hyperscaler AI prepare for you?"
            ref={textareaRef}
            rows={3}
            value={draft}
          />
          <Button
            className="absolute right-4 bottom-4 flex size-10 items-center justify-center rounded-xl bg-linear-to-l from-fuchsia-500 to-violet-800 text-white shadow-lg"
            size="icon"
            type="submit"
          >
            <ArrowUp className="size-5" />
          </Button>
        </form>
      </div>

      <div className="flex w-full max-w-5xl flex-col gap-4 text-left">
        <p className="text-center text-lg text-slate-600 md:text-left">
          Quick admin commands
        </p>

        <div className="flex flex-col gap-3 text-slate-600 text-sm lg:hidden">
          {superAdminQuickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                className="inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3 text-left shadow-sm"
                key={action.title}
                onClick={() => onDraftChange(action.prompt)}
                type="button"
              >
                <Icon className="size-5 text-violet-600" />
                <span className="font-medium text-base text-slate-800">
                  {action.prompt}
                </span>
              </button>
            );
          })}
        </div>

        <div className="hidden gap-4 lg:grid lg:grid-cols-3">
          {superAdminQuickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                className="flex h-full cursor-pointer flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-[0px_2px_4px_rgba(0,0,0,0.04)] transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500/40"
                key={action.title}
                onClick={() => onDraftChange(action.prompt)}
                type="button"
              >
                <div className="space-y-4">
                  <Icon className="size-6 text-violet-600" />
                  <div className="space-y-1">
                    <p className="font-semibold text-lg text-slate-900 leading-6">
                      {action.title}
                    </p>
                    <p className="text-slate-600 text-sm leading-5">
                      {action.description}
                    </p>
                  </div>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-fuchsia-50/80 px-3 py-2 font-semibold text-violet-800 text-xs uppercase tracking-wide">
                  <Sparkles className="size-4 shrink-0" />
                  <span className="bg-linear-to-r from-violet-800 to-fuchsia-500 bg-clip-text text-left text-transparent">
                    {action.prompt}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
