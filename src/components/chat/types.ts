export type ChatRole = "assistant" | "user" | "system";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  author: string;
  content: string;
  timestamp: string;
  parts?: Array<{ type: string; [key: string]: unknown }>;
}
