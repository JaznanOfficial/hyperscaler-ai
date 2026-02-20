import { EmployeeAgentPanel } from "@/components/dashboard/employee/agent-panel";

export default function EmployeeDashboardPage() {
  return (
    <EmployeeAgentPanel
      inputPlaceholder="Talk with Hyperscaler AI Assistant..."
      messages={[]}
    />
  );
}
