"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ArrowUp, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { mapAiMessagesToChatMessages } from "@/components/chat/ai-message-utils";
import { ClientAgentMessageItem } from "@/components/dashboard/client/message-item";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

type ServiceValue =
  | "cold-email"
  | "paid-ads"
  | "social-media"
  | "cold-calling"
  | "branding"
  | "cold-linkedin"
  | "software-development";

type InsightsDrawerProps = {
  defaultService?: ServiceValue;
};

export function InsightsDrawer({
  defaultService = "cold-email",
}: InsightsDrawerProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedService, setSelectedService] =
    useState<ServiceValue>(defaultService);
  const [draft, setDraft] = useState("");
  const conversationEndRef = useRef<HTMLDivElement | null>(null);

  const suggestions = [
    "Give me today's highlights",
    "How are conversions trending this week?",
    "What should I improve next?",
  ];

  const services = useMemo(
    () =>
      [
        {
          label: "Cold Email Campaign",
          value: "cold-email",
          color: "bg-emerald-500",
        },
        { label: "Paid Ads", value: "paid-ads", color: "bg-sky-500" },
        {
          label: "Social Media Marketing",
          value: "social-media",
          color: "bg-orange-400",
        },
        {
          label: "Cold Calling",
          value: "cold-calling",
          color: "bg-fuchsia-500",
        },
        {
          label: "Branding & Content Creation",
          value: "branding",
          color: "bg-rose-500",
        },
        {
          label: "Cold LinkedIn Outreach",
          value: "cold-linkedin",
          color: "bg-indigo-500",
        },
        {
          label: "Software Development",
          value: "software-development",
          color: "bg-violet-500",
        },
      ] satisfies {
        label: string;
        value: ServiceValue;
        color: string;
      }[],
    []
  );

  const activeService = services.find(
    (service) => service.value === selectedService
  );

  const handleTriggerClick = () => {
    setSelectedService(defaultService);
    setShowSuggestions(false);
  };

  const handleServiceChange = (value: string) => {
    setSelectedService(value as ServiceValue);
  };

  const {
    messages: aiMessages = [],
    sendMessage,
    status,
  } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/client-agent",
    }),
  });

  const mappedMessages = mapAiMessagesToChatMessages(aiMessages);
  const messageCount = aiMessages.length;

  useEffect(() => {
    if (messageCount === 0) {
      return;
    }
    if (conversationEndRef.current) {
      conversationEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageCount]);

  const buildPrompt = (content: string) => {
    const serviceLabel = services.find(
      (svc) => svc.value === selectedService
    )?.label;
    return serviceLabel
      ? `Focus on ${serviceLabel} metrics. ${content}`
      : content;
  };

  const stripServicePrefix = (content: string) => {
    if (!content.startsWith("Focus on ")) {
      return content;
    }

    const marker = " metrics. ";
    const markerIndex = content.indexOf(marker);
    if (markerIndex === -1) {
      return content;
    }

    return content.slice(markerIndex + marker.length);
  };

  const handleSend = async (value?: string) => {
    const content = (value ?? draft).trim();
    if (!content) {
      return;
    }
    setDraft("");
    await sendMessage({ text: buildPrompt(content) });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button onClick={handleTriggerClick} size="icon" variant={"gradient"}>
          <Sparkles className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="w-full max-w-[90%] border-none bg-white p-0 lg:max-w-4xl"
        side="right"
      >
        <div className="flex h-full flex-col">
          <SheetHeader className="items-start bg-purple-200 px-6 py-4 text-left">
            <SheetTitle className="font-semibold text-lg text-slate-900">
              Hyperscaler AI Insights
            </SheetTitle>
            <SheetDescription asChild>
              <div className="flex flex-wrap items-center gap-3">
                <Select
                  onValueChange={handleServiceChange}
                  value={selectedService}
                >
                  <SelectTrigger className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 font-medium text-slate-700 text-sm shadow-sm">
                    <SelectValue>
                      <span className="inline-flex items-center gap-2">
                        <span
                          className={`size-2.5 rounded-full ${activeService?.color ?? "bg-emerald-500"}`}
                        />
                        {activeService?.label ?? "Select service"}
                      </span>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent align="start">
                    {services.map((service) => (
                      <SelectItem key={service.value} value={service.value}>
                        <span className="inline-flex items-center gap-2">
                          <span
                            className={`size-2.5 rounded-full ${service.color}`}
                          />
                          {service.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            {mappedMessages.length > 0 ? (
              <div className="space-y-4">
                {mappedMessages.map((message) => (
                  <ClientAgentMessageItem
                    key={message.id}
                    message={
                      message.role === "user"
                        ? {
                          ...message,
                          content: stripServicePrefix(message.content),
                        }
                        : message
                    }
                  />
                ))}
                <div ref={conversationEndRef} />
              </div>
            ) : (
              <div className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-5 text-slate-600 text-sm">
                <p className="font-semibold text-base text-slate-900">
                  Ask Hyperscaler AI
                </p>
                <p>
                  Ask anything about your service metrics, KPIs, timelines, and
                  current trends. I’ll use real data from your workspace.
                </p>
                <p className="text-slate-500">
                  Tip: set the service dropdown to keep the conversation
                  focused.
                </p>
              </div>
            )}
          </div>

          <div className="border-slate-100 border-t bg-slate-50 px-6 py-4">
            <div className="flex items-end gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2">
              <Textarea
                aria-label="Ask about this service"
                className="min-h-20 flex-1 resize-none border-0 bg-transparent text-slate-700 text-sm outline-none placeholder:text-slate-400 focus-visible:ring-0"
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask about this service..."
                value={draft}
              />
              <Button
                aria-label="Send message"
                className="self-end rounded-xl bg-linear-to-br from-violet-600 to-fuchsia-500 text-white"
                disabled={status === "submitted" || status === "streaming"}
                onClick={async () => {
                  await handleSend();
                }}
                size="icon"
                type="button"
              >
                <ArrowUp className="size-4" />
              </Button>
            </div>
            <button
              className="mt-3 font-medium text-sm text-violet-700 hover:text-violet-900"
              onClick={() => setShowSuggestions((prev) => !prev)}
              type="button"
            >
              Suggestions {showSuggestions ? "▾" : "▸"}
            </button>
          </div>
          {showSuggestions && (
            <div className="border-slate-100 border-t px-6 py-5">
              <div className="space-y-2">
                {suggestions.map((suggestion) => (
                  <button
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-left font-medium text-slate-600 text-xs hover:border-violet-200 hover:bg-violet-50"
                    key={suggestion}
                    onClick={async () => {
                      await handleSend(suggestion);
                    }}
                    type="button"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
