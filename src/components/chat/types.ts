export type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  author: string;
  content: string;
  timestamp: string;
};
