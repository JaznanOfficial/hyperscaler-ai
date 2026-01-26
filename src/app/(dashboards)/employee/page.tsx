"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { ChatMessageItem } from "@/components/chat/message-item"
import type { ChatMessage } from "@/components/chat/types"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const initialMessages: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    author: "Hyperscaler AI",
    content:
      "Morning! I finished indexing the latest invoices and can already see three workstreams where GenAI can save the team a few hours today.",
    timestamp: "09:12 AM",
  },
  {
    id: "2",
    role: "user",
    author: "Lana Zimmerman",
    content: "Great. Can you highlight the blockers for the Bangalore onboarding sprint?",
    timestamp: "09:13 AM",
  },
  {
    id: "3",
    role: "assistant",
    author: "Hyperscaler AI",
    content:
      "👀 Two blockers surfaced: missing access to the vendor sandbox and the HR policy pack waiting for final sign-off. I drafted the escalation note if you want to send it.",
    timestamp: "09:14 AM",
  },
  {
    id: "4",
    role: "user",
    author: "Lana Zimmerman",
    content: "Perfect. Queue up the escalation and prep a summary for the stand-up.",
    timestamp: "09:15 AM",
  },
]

const aiReplies = [
  "Looped in ops and drafted the escalations. Want me to send it now?",
  "Here’s a condensed summary with three immediate next steps. Need anything else?",
  "Logged that request and queued the automation for tonight’s run.",
]

const generateId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2)

const formatTime = () => {
  const now = new Date()
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export default function EmployeeDashboardPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [scrollToBottom])

  const sendMessage = useCallback(() => {
    const trimmed = inputValue.trim()
    if (!trimmed) return

    const userMessage: ChatMessage = {
      id: generateId(),
      role: "user",
      author: "You",
      content: trimmed,
      timestamp: formatTime(),
    }

    setMessages((prev) => [...prev, userMessage])
    requestAnimationFrame(scrollToBottom)
    setInputValue("")

    setTimeout(() => {
      const reply = aiReplies[Math.floor(Math.random() * aiReplies.length)]
      const aiMessage: ChatMessage = {
        id: generateId(),
        role: "assistant",
        author: "Hyperscaler AI",
        content: reply,
        timestamp: formatTime(),
      }
      setMessages((prev) => [...prev, aiMessage])
      requestAnimationFrame(scrollToBottom)
    }, 600)
  }, [inputValue, scrollToBottom])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  return (
    <section className="flex h-[calc(100vh-6rem)] max-h-[calc(100vh-7rem)] min-h-112 w-full flex-1 flex-col">
      <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
        <div className="flex-1 min-h-0 space-y-6 overflow-y-auto" aria-live="polite" role="log">
          {messages.map((message) => (
            <ChatMessageItem key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form
          className="sticky bottom-0 border-t border-slate-200 bg-white/90 backdrop-blur-sm pt-4"
          onSubmit={(event) => {
            event.preventDefault()
            sendMessage()
          }}
        >
          <div className="relative">
            <Textarea
              rows={3}
              placeholder="Type your message"
              className="min-h-16 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 pr-16 text-sm text-slate-900 shadow-none"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              aria-label="Send message"
              className="absolute bottom-3 right-3 rounded-full bg-primary text-white shadow-sm hover:bg-primary/90"
            >
              <Send className="size-4" />
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
