import type { ChatMessage } from "@/components/chat/types"
import { AiAgentPanel } from "@/components/dashboard/ai-agent/agent-panel"

const adminMessages: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    author: "Hyperscaler AI",
    content: "Super admin room is live. Would you like me to summarize org-wide automation health?",
    timestamp: "08:42 AM",
  },
  {
    id: "2",
    role: "user",
    author: "A. Rahman",
    content: "Queue the report instead. I’m reviewing escalations first.",
    timestamp: "08:43 AM",
  },
]

export default function SuperAdminPage() {
  return <AiAgentPanel messages={adminMessages} inputPlaceholder="Send a command" />
}
