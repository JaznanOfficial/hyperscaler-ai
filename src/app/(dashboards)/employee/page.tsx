import type { ChatMessage } from "@/components/chat/types"
import { AiAgentPanel } from "@/components/dashboard/ai-agent/agent-panel"

const employeeMessages: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    author: "Hyperscaler AI",
    content:
      "Morning! I finished indexing the latest invoices and can already see three workstreams where GenAI can save the team a few hours today.",
    timestamp: "09:12 AM",
  },
  {
    id: "2",
    role: "user",
    author: "Lana Zimmerman",
    content: "Great. Can you highlight the blockers for the Bangalore onboarding sprint?",
    timestamp: "09:13 AM",
  },
  {
    id: "3",
    role: "assistant",
    author: "Hyperscaler AI",
    content:
      "👀 Two blockers surfaced: missing access to the vendor sandbox and the HR policy pack waiting for final sign-off. I drafted the escalation note if you want to send it.",
    timestamp: "09:14 AM",
  },
  {
    id: "4",
    role: "user",
    author: "Lana Zimmerman",
    content: "Perfect. Queue up the escalation and prep a summary for the stand-up.",
    timestamp: "09:15 AM",
  },
]

export default function EmployeeDashboardPage() {
  return <AiAgentPanel messages={employeeMessages} inputPlaceholder="Ask Hyperscaler AI" />
}
