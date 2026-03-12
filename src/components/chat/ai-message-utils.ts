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

const decodeEscapedJsonText = (value: string) =>
  value
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\r")
    .replace(/\\t/g, "\t")
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, "\\")
    .replace(/\\\//g, "/");

const getStreamingAssistantDisplayText = (raw: string): string => {
  const text = raw.trim();
  if (!text) {
    return "";
  }

  const messageField = /["']message["']\s*:\s*(["'])/.exec(text);
  if (!messageField || messageField.index === undefined) {
    return text;
  }

  const quote = messageField[1];
  const start = messageField.index + messageField[0].length;
  let escaped = false;
  let extracted = "";
  let hasClosedQuote = false;

  for (let index = start; index < text.length; index += 1) {
    const char = text[index];

    if (escaped) {
      extracted += `\\${char}`;
      escaped = false;
      continue;
    }

    if (char === "\\") {
      escaped = true;
      continue;
    }

    if (char === quote) {
      hasClosedQuote = true;
      break;
    }

    extracted += char;
  }

  if (!hasClosedQuote && extracted.includes('"buttons"')) {
    extracted = extracted.split('"buttons"')[0] ?? extracted;
  }

  const decoded = decodeEscapedJsonText(extracted)
    .replace(/[,{]\s*$/, "")
    .trim();

  return decoded || text;
};

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
      const isAssistant = message.role === "assistant";
      const displayContent = isAssistant
        ? getStreamingAssistantDisplayText(textContent)
        : textContent;

      parsedMessages.push({
        id: message.id,
        role: isAssistant ? "assistant" : "user",
        author: isAssistant ? "Agent G" : "You",
        content: displayContent,
        rawContent: textContent,
        timestamp: "",
        parts: message.parts as Array<{ type: string; [key: string]: unknown }>,
      });
    }
  }

  return parsedMessages;
};
