"use client"

import { useState } from "react"

import { ArrowUp } from "lucide-react"

import { ChatMessageItem } from "@/components/chat/message-item"
import type { ChatMessage } from "@/components/chat/types"
import { AgentEmptyState } from "@/components/dashboard/ai-agent/agent-empty-state"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function AiAgentPanel({
  messages,
  inputPlaceholder = "Type a message",
}: {
  messages: ChatMessage[]
  inputPlaceholder?: string
}) {
  const [draft, setDraft] = useState("")
  const [hasConversationStarted, setHasConversationStarted] = useState(false)
  const [conversation, setConversation] = useState<ChatMessage[]>(messages)

  const handleSend = () => {
    const content = draft.trim()
    if (!content) return

    const nextMessage: ChatMessage = {
      id: `local-${Date.now()}`,
      role: "user",
      author: "You",
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setConversation((prev) => [...prev, nextMessage])
    setDraft("")
    setHasConversationStarted(true)
  }

  const showConversation = hasConversationStarted && conversation.length > 0

  return (
    <section className="relative flex w-full flex-1 flex-col overflow-visible p-4 sm:p-6 lg:h-[calc(100vh)] lg:max-h-[calc(100vh)] lg:min-h-112 lg:overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-96 h-80 opacity-75 bg-linear-to-l from-fuchsia-500 to-violet-800 rounded-full blur-[350px]" />
      </div>
      <div className="flex h-full min-h-128 flex-1 flex-col overflow-visible lg:min-h-0 lg:overflow-hidden">
        <div
          className="flex-1 min-h-0 space-y-6 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          aria-live="polite"
          role="log"
        >
          {showConversation ? (
            conversation.map((message) => <ChatMessageItem key={message.id} message={message} />)
          ) : (
            <AgentEmptyState draft={draft} onDraftChange={setDraft} onSubmit={handleSend} />
          )}
        </div>

        {showConversation && (
          <div className="border-t border-slate-200 bg-white px-2 py-1 pt-4">
            <div className="relative rounded-3xl border border-slate-200 bg-white shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
              <Textarea
                placeholder={inputPlaceholder}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault()
                    handleSend()
                  }
                }}
                className="min-h-20 w-full resize-none rounded-3xl border-0 bg-transparent pr-16 text-base text-slate-900 focus-visible:ring-0"
              />
              <Button
                type="button"
                size="icon"
                className="absolute bottom-3 right-3 flex size-10 items-center justify-center rounded-xl bg-linear-to-l from-fuchsia-500 to-violet-800 text-white shadow-lg transition hover:opacity-90"
                onClick={handleSend}
              >
                <ArrowUp className="size-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
