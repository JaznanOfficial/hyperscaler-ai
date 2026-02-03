"use client"

import Image from "next/image"

import { ArrowUp, CreditCard, MessageSquare, Sparkles, Sunrise } from "lucide-react"

import { Button } from "@/components/ui/button"

const quickActions = [
  {
    title: "Project Progress",
    description: "Get real-time updates and insights across all your services.",
    prompt: "Show me the overall progress of all my active services.",
    icon: Sunrise,
  },
  {
    title: "Subscription",
    description: "View, manage, or upgrade your subscribed services.",
    prompt: "What services am I currently subscribed to?",
    icon: CreditCard,
  },
  {
    title: "Contact & Support",
    description: "Reach out to our team for help or requests.",
    prompt: "I'd like to contact the support team regarding my services.",
    icon: MessageSquare,
  },
] as const

export function AgentEmptyState({
  draft,
  onDraftChange,
  onSubmit,
}: {
  draft: string
  onDraftChange: (value: string) => void
  onSubmit: () => void
}) {
  return (
    <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-12 px-0 py-10 text-center">
      <div className="flex w-full max-w-3xl flex-col items-center gap-7">
        <div className="flex items-center justify-center">
          <Image
            src="/logo-without-text.png"
            alt="Hyperscaler logo"
            width={96}
            height={56}
            className="h-14 w-24 object-contain"
            priority
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-3xl font-semibold leading-10 text-slate-900">Good morning, Jamie</p>
          <p className="text-base leading-6 text-slate-600">
            What would you like to know about your services today?
          </p>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            onSubmit()
          }}
          className="relative flex w-full items-stretch rounded-2xl border border-slate-200 bg-white px-2 py-2 shadow-[0px_2px_4px_rgba(0,0,0,0.04)]"
        >
          <textarea
            value={draft}
            onChange={(event) => onDraftChange(event.target.value)}
            placeholder="How can I help you today?"
            rows={3}
            className="flex-1 resize-none rounded-2xl border-0 bg-transparent px-4 py-4 pr-16 text-base text-slate-900 outline-none focus:ring-0 min-h-22"
          />
          <Button
            type="submit"
            size="icon"
            className="absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-xl bg-linear-to-l from-fuchsia-500 to-violet-800 text-white shadow-lg"
          >
            <ArrowUp className="size-5" />
          </Button>
        </form>
      </div>

      <div className="flex w-full max-w-5xl flex-col gap-4 text-left">
        <p className="text-center text-lg text-slate-600 md:text-left">What I can help you with</p>

        <div className="flex flex-col gap-3 text-sm text-slate-600 lg:hidden">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <button
                key={action.title}
                type="button"
                onClick={() => onDraftChange(action.prompt)}
                className="inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3 text-left shadow-sm"
              >
                <Icon className="size-5 text-violet-600" />
                <span className="text-base font-medium text-slate-800">{action.prompt}</span>
              </button>
            )
          })}
        </div>

        <div className="hidden gap-4 lg:grid lg:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <button
                key={action.title}
                type="button"
                onClick={() => onDraftChange(action.prompt)}
                className="flex h-full cursor-pointer flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-[0px_2px_4px_rgba(0,0,0,0.04)] transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500/40"
              >
                <div className="space-y-4">
                  <Icon className="size-6 text-violet-600" />
                  <div className="space-y-1">
                    <p className="text-lg font-semibold leading-6 text-slate-900">{action.title}</p>
                    <p className="text-sm leading-5 text-slate-600">{action.description}</p>
                  </div>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-fuchsia-50/80 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-violet-800">
                  <Sparkles className="size-4 shrink-0" />
                  <span className="bg-linear-to-r from-violet-800 to-fuchsia-500 bg-clip-text text-left text-transparent">
                    {action.prompt}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
