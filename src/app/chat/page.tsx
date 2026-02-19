import type { ChatMessage } from "@/components/chat/types";
import { AgentGPanel } from "@/components/dashboard/chat/panel";
import { HomeNavbar } from "@/components/shared/home-navbar";

export default function AgentGPage({
  searchParams,
}: {
  searchParams: { prompt?: string };
}) {
  const initialPrompt = searchParams?.prompt?.trim();
  const initialMessages: ChatMessage[] = initialPrompt
    ? [
        {
          id: `initial-${Date.now()}`,
          role: "user",
          author: "You",
          content: initialPrompt,
          timestamp: new Date().toISOString(),
        },
      ]
    : [];

  return (
    <>
      <HomeNavbar />
      <AgentGPanel
        initialPrompt={initialPrompt}
        inputPlaceholder="Talk with Hyperscaler AI Assistant..."
        messages={initialMessages}
      />
    </>
  );
}
