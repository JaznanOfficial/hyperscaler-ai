import { ClientAgentPanel } from "@/components/dashboard/client/agent-panel";

export default function ClientDashboardPage() {
  return (
    <ClientAgentPanel
      inputPlaceholder="Talk to Hyperscaler AI Assistant..."
      messages={[]}
    />
  );
}
