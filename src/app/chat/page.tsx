import { GeneralAgentPanel } from "@/components/dashboard/chat/panel";
import { HomeNavbar } from "@/components/shared/home-navbar";

export default function AgentGPage() {
  return (
    <>
      <HomeNavbar />
      <GeneralAgentPanel inputPlaceholder="Talk with Eva AI..." messages={[]} />
    </>
  );
}
