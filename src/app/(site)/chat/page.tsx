import type { ChatMessage } from "@/components/chat/types";
import { AgentGPanel } from "@/components/dashboard/chat/panel";

const agentGMessages: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    author: "Agent G",
    content:
      "Client workspace synced. Would you like me to call out churn risk this week?",
    timestamp: "10:05 AM",
  },
  {
    id: "2",
    role: "user",
    author: "Ops Lead",
    content:
      "Start with enterprise accounts. I only want risk if the flag is high confidence.",
    timestamp: "10:06 AM",
  },
];

export default function AgentGPage() {
  return (
    <AgentGPanel
      inputPlaceholder="Sync with Agent G"
      messages={agentGMessages}
    />
  );
}
