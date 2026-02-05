import type { ChatMessage } from "@/components/chat/types";
import { cn } from "@/lib/utils";

export function ChatMessageItem({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <article className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <p
        className={cn(
          "max-w-[88%] rounded-2xl px-4 py-2 text-sm leading-relaxed sm:max-w-[70%]",
          isUser
            ? "rounded-br-sm bg-linear-to-r from-violet-900 to-fuchsia-600 text-white"
            : "rounded-bl-sm bg-slate-100 text-slate-900"
        )}
      >
        {message.content}
      </p>
    </article>
  );
}
