"use client";

import { ArrowUp } from "lucide-react";
import { useState } from "react";

import { ChatMessageItem } from "@/components/chat/message-item";
import type { ChatMessage } from "@/components/chat/types";
import { AgentEmptyState } from "@/components/dashboard/ai-agent/agent-empty-state";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function AiAgentPanel({
  messages,
  inputPlaceholder = "Type a message",
}: {
  messages: ChatMessage[];
  inputPlaceholder?: string;
}) {
  const [draft, setDraft] = useState("");
  const [hasConversationStarted, setHasConversationStarted] = useState(false);
  const [conversation, setConversation] = useState<ChatMessage[]>(messages);

  const handleSend = () => {
    const content = draft.trim();
    if (!content) return;

    const nextMessage: ChatMessage = {
      id: `local-${Date.now()}`,
      role: "user",
      author: "You",
      content,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setConversation((prev) => [...prev, nextMessage]);
    setDraft("");
    setHasConversationStarted(true);
  };

  const showConversation = hasConversationStarted && conversation.length > 0;

  return (
    <section className="relative flex w-full flex-1 flex-col overflow-visible p-4 sm:p-6 lg:h-[calc(100vh)] lg:max-h-[calc(100vh)] lg:min-h-112 lg:overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-80 w-96 rounded-full bg-linear-to-l from-fuchsia-500 to-violet-800 opacity-75 blur-[350px]" />
      </div>
      <div className="flex h-full min-h-128 flex-1 flex-col overflow-visible lg:min-h-0 lg:overflow-hidden">
        <div
          aria-live="polite"
          className="min-h-0 flex-1 space-y-6 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="log"
        >
          {showConversation ? (
            conversation.map((message) => (
              <ChatMessageItem key={message.id} message={message} />
            ))
          ) : (
            <AgentEmptyState
              draft={draft}
              onDraftChange={setDraft}
              onSubmit={handleSend}
            />
          )}
        </div>

        {showConversation && (
          <div className="border-slate-200 border-t bg-white px-2 py-1 pt-4">
            <div className="relative rounded-3xl border border-slate-200 bg-white shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
              <Textarea
                className="min-h-20 w-full resize-none rounded-3xl border-0 bg-transparent pr-16 text-base text-slate-900 focus-visible:ring-0"
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={inputPlaceholder}
                value={draft}
              />
              <Button
                className="absolute right-3 bottom-3 flex size-10 items-center justify-center rounded-xl bg-linear-to-l from-fuchsia-500 to-violet-800 text-white shadow-lg transition hover:opacity-90"
                onClick={handleSend}
                size="icon"
                type="button"
              >
                <ArrowUp className="size-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
