import type { ChatMessage } from "@/components/chat/types";

export type AIMultiPart =
  | { type: "text"; text?: string }
  | { type: "text-delta"; textDelta?: string }
  | {
      type: "tool-result";
      toolCallId?: string;
      toolName?: string;
      result?: unknown;
    }
  | { type: string; [key: string]: unknown };

export interface AIMessageShape {
  id: string;
  role: "assistant" | "user" | "system";
  parts?: unknown[];
  content?: string;
}

const getTextFromParts = (parts: AIMultiPart[] = []) =>
  parts
    .map((part) => {
      if (part.type === "text") {
        return part.text ?? "";
      }
      if (part.type === "text-delta") {
        return part.textDelta ?? "";
      }
      return "";
    })
    .join("")
    .trim();

export const mapAiMessagesToChatMessages = (
  aiMessages: AIMessageShape[] = []
): ChatMessage[] => {
  const parsedMessages: ChatMessage[] = [];

  for (const message of aiMessages) {
    const parts = (message.parts ?? []) as AIMultiPart[];
    const textContent = parts.length
      ? getTextFromParts(parts)
      : (message.content ?? "");

    if (textContent || parts.length > 0) {
      parsedMessages.push({
        id: message.id,
        role: message.role === "assistant" ? "assistant" : "user",
        author: message.role === "assistant" ? "Agent G" : "You",
        content: textContent,
        timestamp: "",
        parts: message.parts as Array<{ type: string; [key: string]: unknown }>,
      });
    }
  }

  return parsedMessages;
};
