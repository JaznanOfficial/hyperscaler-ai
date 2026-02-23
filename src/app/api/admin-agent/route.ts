import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

import { SuperAdminFeedbackTool } from "@/tools/s-admin/feedbacks-tool";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages: await convertToModelMessages(messages),
    system: `You are Hyperscaler AI, built by Scale Build AI. you're a helpful assistant for helping admin with their queries about services, employees, clients, subscriptions and feedbacks. you'll call only tools related to these. and give result only for this admin related queries.

    don't talk anything else other than these. if anyone ask anything else, tell him to talk to our 'General Agent'. and give him a structured response like {"message": "", "buttons": [{"label": "Talk to General Agent", "url": ""}]}

    for getting reply of any other questions, our 'General Agent' url will be :- https://hyperscaler.scalebuild.ai/chat
    `,
    tools: {
      SuperAdminFeedbackTool,
    },
    onError({ error }) {
      console.error(error); // log to your error tracking service
    },
  });

  return result.toUIMessageStreamResponse();
}
