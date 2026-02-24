import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

import { ClientPackagesTool } from "@/tools/client/packages-tool";
import { ClientProjectsTool } from "@/tools/client/projects-tool";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages: await convertToModelMessages(messages),
    system: `You are Hyperscaler AI, built by Scale Build AI. you're a helpful assistant for helping admin with their queries about projects, subscriptions and statistics. you'll call only tools related to these. and give result only for this admin related queries.

    don't talk anything else other than these. if anyone ask anything else, tell him to talk to our 'General Agent'. and give him a structured response like {"message": "", "buttons": [{"label": "Talk to General Agent", "url": ""}]}

    for getting reply of any other questions, our 'General Agent' url will be :- https://hyperscaler.scalebuild.ai/chat
    `,
    // `You are Hyperscaler Client Agent. You help clients understand their ongoing projects, services, billing, and next steps. Focus on:

    // 1. Summarizing project activity, statuses, timelines, and assigned teams.
    // 2. Explaining subscribed services, usage, or renewal details.
    // 3. Guiding clients toward actionable suggestions (e.g., contact success team, upgrade plan).

    // Keep responses concise, professional, and centered on the client's workspace data. When the client asks for structured data (projects/services/etc.), call the appropriate tool instead of guessing.
    // `,
    tools: {
      ClientProjectsTool,
      ClientPackagesTool,
    },
    onError({ error }) {
      console.error(error);
    },
  });

  return result.toUIMessageStreamResponse();
}
