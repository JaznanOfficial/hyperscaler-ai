"use client"

import { ArrowUpRight, Activity, CreditCard, LifeBuoy, Sparkles } from "lucide-react"

const quickActions = [
  {
    title: "Project Progress",
    description: "Get real-time updates and insights across all your services.",
    prompt: "Show me the overall progress of all my active services.",
    icon: Activity,
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
    icon: LifeBuoy,
  },
] as const

export function AgentEmptyState({
  onPromptSelect,
}: {
  onPromptSelect?: (prompt: string) => void
}) {
  return (
    <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-12 px-4 py-10 text-center">
      <div className="flex w-full max-w-3xl flex-col items-center gap-7">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-linear-to-r from-violet-800 to-fuchsia-500 p-3 shadow-lg shadow-fuchsia-500/40">
          <Sparkles className="size-8 text-white" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-3xl font-semibold leading-10 text-slate-900">Good morning, Jamie</p>
          <p className="text-base leading-6 text-slate-600">
            What would you like to know about your services today?
          </p>
        </div>
        <button
          type="button"
          onClick={() => onPromptSelect?.("")}
          className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-6 py-5 text-left text-base text-slate-400 shadow-[0px_2px_4px_rgba(0,0,0,0.04)]"
        >
          <span>How can I help you today?</span>
          <span className="flex size-10 items-center justify-center rounded-xl bg-linear-to-l from-fuchsia-500 to-violet-800 text-white">
            <ArrowUpRight className="size-5" />
          </span>
        </button>
      </div>

      <div className="flex w-full max-w-5xl flex-col gap-4 text-left">
        <p className="text-center text-lg text-slate-600 md:text-left">What I can help you with</p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <div
                key={action.title}
                className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-[0px_2px_4px_rgba(0,0,0,0.04)]"
              >
                <div className="space-y-4">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-linear-to-r from-violet-800/10 to-fuchsia-500/10 text-fuchsia-600">
                    <Icon className="size-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg font-semibold leading-6 text-slate-900">{action.title}</p>
                    <p className="text-sm leading-5 text-slate-600">{action.description}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onPromptSelect?.(action.prompt)}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-fuchsia-50/80 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-fuchsia-600"
                >
                  <ArrowUpRight className="size-4" />
                  <span className="text-left">{action.prompt}</span>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
