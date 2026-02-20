import { SuperAdminAgentPanel } from "@/components/dashboard/s-admin/agent-panel";

export default function SuperAdminPage() {
  return (
    <SuperAdminAgentPanel
      inputPlaceholder="Talk with Hyperscaler AI Assistant..."
      messages={[]}
    />
  );
}
