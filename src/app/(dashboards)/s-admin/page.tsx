import { Send } from "lucide-react"

import { ChatMessageItem } from "@/components/chat/message-item"
import type { ChatMessage } from "@/components/chat/types"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const adminMessages: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    author: "Hyperscaler AI",
    content: "Super admin room is live. Would you like me to summarize org-wide automation health?",
    timestamp: "08:42 AM",
  },
  {
    id: "2",
    role: "user",
    author: "A. Rahman",
    content: "Queue the report instead. I’m reviewing escalations first.",
    timestamp: "08:43 AM",
  },
]

export default function SuperAdminPage() {
  return (
    <section className="flex h-[calc(100vh-6rem)] max-h-[calc(100vh-7rem)] min-h-112 w-full flex-1 flex-col">
      <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
        <div
          className="flex-1 min-h-0 space-y-6 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          aria-live="polite"
          role="log"
        >
          {adminMessages.map((message) => (
            <ChatMessageItem key={message.id} message={message} />
          ))}
        </div>

        <div className="border-t border-slate-200 bg-white px-2 py-1 pt-4">
          <div className="relative rounded-3xl border border-slate-200 bg-white shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
            <Textarea
              placeholder="Type a message"
              className="min-h-20 w-full resize-none rounded-3xl border-0 bg-transparent pr-16 text-base text-slate-900 focus-visible:ring-0"
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="absolute bottom-3 right-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Send className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
