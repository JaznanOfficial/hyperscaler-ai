import type { ChatMessage } from "@/components/chat/types";
import { AiAgentPanel } from "@/components/dashboard/ai-agent/agent-panel";

const clientMessages: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    author: "Hyperscaler AI",
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

export default function ClientDashboardPage() {
  return (
    <AiAgentPanel
      inputPlaceholder="Sync with Hyperscaler AI"
      messages={clientMessages}
    />
  );
}
