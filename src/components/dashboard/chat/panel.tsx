"use client";

import { useChat } from "@ai-sdk/react";
import { ArrowUp } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import type { ChatMessage } from "@/components/chat/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { GeneralAgentEmptyState } from "./empty-state";
import { GeneralAgentMessageItem } from "./message-item";

type AIMultiPart =
  | { type: "text"; text: string }
  | { type: "text-delta"; textDelta: string };

interface AIMessageShape {
  id: string;
  role: "assistant" | "user" | "system";
  parts?: AIMultiPart[];
  content?: string;
}

export function AgentGPanel({
  messages,
  inputPlaceholder = "Type a message",
  initialPrompt,
}: {
  messages: ChatMessage[];
  inputPlaceholder?: string;
  initialPrompt?: string;
}) {
  const [draft, setDraft] = useState("");
  const [hasConversationStarted, setHasConversationStarted] = useState(
    messages.length > 0
  );
  const [hasUsedInitialPrompt, setHasUsedInitialPrompt] = useState(false);
  const { messages: aiMessages = [], sendMessage } = useChat();
  const emptyStateInputRef = useRef<HTMLTextAreaElement | null>(null);
  const conversationInputRef = useRef<HTMLTextAreaElement | null>(null);
  const conversationLogRef = useRef<HTMLDivElement | null>(null);
  const conversationEndRef = useRef<HTMLDivElement | null>(null);

  const liveMessages = useMemo<ChatMessage[]>(() => {
    if (!aiMessages.length) {
      return [];
    }

    const parsedMessages: ChatMessage[] = [];

    for (const message of aiMessages) {
      const typedMessage = message as AIMessageShape;
      const textContent = typedMessage.parts?.length
        ? typedMessage.parts
            .map((part) => {
              if (part.type === "text" && part.text) {
                return part.text;
              }
              if (part.type === "text-delta" && "textDelta" in part) {
                return part.textDelta ?? "";
              }
              return "";
            })
            .join("")
            .trim()
        : (typedMessage.content ?? "");

      if (!textContent) {
        continue;
      }

      parsedMessages.push({
        id: typedMessage.id,
        role: typedMessage.role === "assistant" ? "assistant" : "user",
        author: typedMessage.role === "assistant" ? "Agent G" : "You",
        content: textContent,
        timestamp: "",
      });
    }

    return parsedMessages;
  }, [aiMessages]);

  useEffect(() => {
    if (liveMessages.length > 0) {
      setHasConversationStarted(true);
    }
  }, [liveMessages.length]);

  useEffect(() => {
    const content = initialPrompt?.trim();
    if (!content || hasUsedInitialPrompt) {
      return;
    }

    sendMessage({ text: content });
    setHasConversationStarted(true);
    setHasUsedInitialPrompt(true);
  }, [hasUsedInitialPrompt, initialPrompt, sendMessage]);

  const visibleMessages = liveMessages.length > 0 ? liveMessages : messages;
  const visibleMessageCount = visibleMessages.length;
  const latestMessageId =
    visibleMessageCount > 0
      ? (visibleMessages[visibleMessageCount - 1]?.id ?? null)
      : null;
  const latestMessageSignature = latestMessageId
    ? `${latestMessageId}:$${
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
              <GeneralAgentMessageItem key={message.id} message={message} />
            ))
          ) : (
            <GeneralAgentEmptyState
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
