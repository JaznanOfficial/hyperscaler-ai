import type { ChatMessage } from "@/components/chat/types";

type AIMultiPart =
  | { type: "text"; text?: string }
  | { type: "text-delta"; textDelta?: string }
  | {
      type: "tool-result";
      toolCallId?: string;
      toolName?: string;
      result?: unknown;
    }
  | { type: string; [key: string]: unknown };

interface AIMessageShape {
  id: string;
  role: "assistant" | "user" | "system";
  parts?: unknown[];
  content?: string;
}

interface ToolInvocation {
  toolCallId?: string;
  toolName?: string;
  result?: unknown;
  state?: string;
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

const formatToolResult = (toolName: string, result: unknown) => {
  let payload = "";
  try {
    payload = JSON.stringify(result ?? null, null, 2) ?? "";
  } catch {
    payload = String(result ?? "");
  }

  return `Tool ${toolName} result:\n\n\`\`\`json\n${payload}\n\`\`\``;
};

export const mapAiMessagesToChatMessages = (
  aiMessages: AIMessageShape[] = []
): ChatMessage[] => {
  const parsedMessages: ChatMessage[] = [];

  for (const message of aiMessages) {
    const parts = (message.parts ?? []) as AIMultiPart[];
    const toolInvocations =
      (message as AIMessageShape & { toolInvocations?: ToolInvocation[] })
        .toolInvocations ?? [];
    const textContent = parts.length
      ? getTextFromParts(parts)
      : (message.content ?? "");

    if (textContent) {
      parsedMessages.push({
        id: message.id,
        role: message.role === "assistant" ? "assistant" : "user",
        author: message.role === "assistant" ? "Agent G" : "You",
        content: textContent,
        timestamp: "",
      });
    }

    parts
      ?.filter((part) => part.type === "tool-result")
      .forEach((part, index) => {
        const toolPart = part as Extract<AIMultiPart, { type: "tool-result" }>;
        parsedMessages.push({
          id: `${message.id}-tool-${toolPart.toolCallId ?? "unknown"}-${index}`,
          role: "assistant",
          author: "Tool",
          content: formatToolResult(
            toolPart.toolName ?? "Tool",
            toolPart.result
          ),
          timestamp: "",
          toolName: toolPart.toolName ?? "Tool",
          toolResult: toolPart.result,
        });
      });

    toolInvocations
      .filter(
        (invocation) =>
          invocation.state === "result" || invocation.result !== undefined
      )
      .forEach((invocation, index) => {
        parsedMessages.push({
          id: `${message.id}-tool-invocation-${invocation.toolCallId ?? "unknown"}-${index}`,
          role: "assistant",
          author: "Tool",
          content: formatToolResult(
            invocation.toolName ?? "Tool",
            invocation.result
          ),
          timestamp: "",
          toolName: invocation.toolName ?? "Tool",
          toolResult: invocation.result,
        });
      });
  }

  return parsedMessages;
};
