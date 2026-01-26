import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { ChatMessage } from "@/components/chat/types"

function getInitials(name: string) {
  const [first = "", second = ""] = name.split(" ")
  return `${first.charAt(0)}${second.charAt(0)}`.toUpperCase()
}

export function ChatMessageItem({ message }: { message: ChatMessage }) {
  return (
    <article className="flex gap-3">
      <Avatar size="sm" className={message.role === "assistant" ? "bg-primary/10" : "bg-muted"}>
        <AvatarFallback>{getInitials(message.author)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-medium text-slate-900">{message.author}</span>
          <span>&middot;</span>
          <time dateTime={message.timestamp}>{message.timestamp}</time>
        </div>
        <p className="text-sm leading-relaxed text-slate-600">{message.content}</p>
      </div>
    </article>
  )
}
