import { ClientAgentPanel } from "@/components/dashboard/client/agent-panel";

export default function ClientDashboardPage() {
  return (
    <ClientAgentPanel
      inputPlaceholder="Talk with Hyperscaler AI Assistant..."
      messages={[]}
    />
  );
}
