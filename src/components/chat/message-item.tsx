import type { ChatMessage } from "@/components/chat/types"
import { cn } from "@/lib/utils"

export function ChatMessageItem({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user"

  return (
    <article className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <p
        className={cn(
          "rounded-2xl px-4 py-2 text-sm leading-relaxed",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-slate-100 text-slate-900 rounded-bl-sm"
        )}
      >
        {message.content}
      </p>
    </article>
  )
}
