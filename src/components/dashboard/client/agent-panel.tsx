"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ArrowUp } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import { mapAiMessagesToChatMessages } from "@/components/chat/ai-message-utils";
import type { ChatMessage } from "@/components/chat/types";
import { ClientAgentEmptyState } from "@/components/dashboard/client/empty-state";
import { ClientAgentMessageItem } from "@/components/dashboard/client/message-item";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  HERO_PROMPT_SEND_KEY,
  HERO_PROMPT_STORAGE_KEY,
} from "@/lib/chat-storage";

const DEFAULT_CLIENT_AGENT_ENDPOINT = "/api/client-agent" as const;

export function ClientAgentPanel({
  messages,
  inputPlaceholder = "Talk with Hyperscaler AI Assistant...",
  apiEndpoint = DEFAULT_CLIENT_AGENT_ENDPOINT,
}: {
  messages: ChatMessage[];
  inputPlaceholder?: string;
  apiEndpoint?: string;
}) {
  const [draft, setDraft] = useState("");
  const [hasConversationStarted, setHasConversationStarted] = useState(
    messages.length > 0
  );
  const { data: session } = useSession();
  const isAuthorizedUser = session?.user?.role === "CLIENT";
  const { messages: aiMessages = [], sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: apiEndpoint,
    }),
  });
  const emptyStateInputRef = useRef<HTMLTextAreaElement | null>(null);
  const conversationInputRef = useRef<HTMLTextAreaElement | null>(null);
  const conversationLogRef = useRef<HTMLDivElement | null>(null);
  const conversationEndRef = useRef<HTMLDivElement | null>(null);
  const heroPromptHandledRef = useRef(false);

  const liveMessages = useMemo<ChatMessage[]>(() => {
    return mapAiMessagesToChatMessages(aiMessages as any);
  }, [aiMessages]);

  useEffect(() => {
    if (liveMessages.length > 0) {
      setHasConversationStarted(true);
    }
  }, [liveMessages.length]);

  useEffect(() => {
    if (heroPromptHandledRef.current || !isAuthorizedUser) {
      return;
    }

    if (typeof window === "undefined") {
      return;
    }

    const shouldSend = window.localStorage.getItem(HERO_PROMPT_SEND_KEY);
    if (shouldSend !== "true") {
      heroPromptHandledRef.current = true;
      return;
    }

    const cachedPrompt = window.localStorage
      .getItem(HERO_PROMPT_STORAGE_KEY)
      ?.trim();

    window.localStorage.removeItem(HERO_PROMPT_SEND_KEY);

    if (!cachedPrompt) {
      window.localStorage.removeItem(HERO_PROMPT_STORAGE_KEY);
      heroPromptHandledRef.current = true;
      return;
    }

    setHasConversationStarted(true);
    sendMessage({ text: cachedPrompt });
    window.localStorage.removeItem(HERO_PROMPT_STORAGE_KEY);
    heroPromptHandledRef.current = true;
  }, [isAuthorizedUser, sendMessage]);

  const visibleMessages = liveMessages.length > 0 ? liveMessages : messages;
  const visibleMessageCount = visibleMessages.length;
  const latestMessageId =
    visibleMessageCount > 0
      ? (visibleMessages[visibleMessageCount - 1]?.id ?? null)
      : null;
  const latestMessageSignature = latestMessageId
    ? `${latestMessageId}:$$${
        visibleMessages[visibleMessageCount - 1]?.content.length ?? 0
      }`
    : null;
  const showConversation = hasConversationStarted && visibleMessageCount > 0;

  useEffect(() => {
    if (showConversation) {
      conversationInputRef.current?.focus();
    } else {
      emptyStateInputRef.current?.focus();
    }
  }, [showConversation]);

  useEffect(() => {
    if (!(showConversation && latestMessageSignature)) {
      return;
    }

    if (conversationEndRef.current) {
      conversationEndRef.current.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (conversationLogRef.current) {
      conversationLogRef.current.scrollTop =
        conversationLogRef.current.scrollHeight;
    }
  }, [showConversation, latestMessageSignature]);

  const handleSend = () => {
    const content = draft.trim();
    if (!content) {
      return;
    }

    if (!isAuthorizedUser) {
      toast.error("Only clients can send messages here.");
      return;
    }

    sendMessage({ text: content });
    setDraft("");
    setHasConversationStarted(true);
  };

  return (
    <section className="relative flex h-[calc(90vh)] w-full flex-1 flex-col overflow-visible p-4 sm:p-6 lg:overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-80 w-96 rounded-full bg-linear-to-l from-fuchsia-500 to-violet-800 opacity-75 blur-[350px]" />
      </div>
      <div className="mx-auto flex h-full min-h-128 w-full max-w-6xl flex-1 flex-col overflow-visible lg:min-h-0 lg:overflow-hidden">
        <div
          aria-live="polite"
          className="min-h-0 flex-1 space-y-6 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          ref={conversationLogRef}
          role="log"
        >
          {showConversation ? (
            visibleMessages.map((message) => (
              <ClientAgentMessageItem key={message.id} message={message} />
            ))
          ) : (
            <ClientAgentEmptyState
              draft={draft}
              onDraftChange={setDraft}
              onSubmit={handleSend}
              textareaRef={emptyStateInputRef}
            />
          )}
          <div ref={conversationEndRef} />
        </div>

        {showConversation && (
          <div className="border-slate-200 border-t px-2 py-1 pt-4">
            <div className="relative rounded-3xl border border-slate-200 shadow-sm">
              <Textarea
                className="min-h-20 w-full resize-none rounded-3xl border-0 pr-16 text-base text-slate-900 focus-visible:ring-0"
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={inputPlaceholder}
                ref={conversationInputRef}
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
