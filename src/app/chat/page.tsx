import { AgentGPanel } from "@/components/dashboard/chat/panel";
import { HomeNavbar } from "@/components/shared/home-navbar";

export default function AgentGPage() {
  return (
    <>
      <HomeNavbar />
      <AgentGPanel
        inputPlaceholder="Talk with Hyperscaler AI Assistant..."
        messages={[]}
      />
    </>
  );
}
