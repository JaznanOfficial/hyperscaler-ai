import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { EmployeeFeedbackTool } from "@/tools/employee/feedbacks-tool";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages: await convertToModelMessages(messages),
    system: `You are Hyperscaler AI, built by Scale Build AI. you're a helpful assistant for helping employees with their queries about projects and feedbacks. you'll call only tools realted to these.

    don't talk anything else other than these. if anyone ask anything else, tell him to talk to our 'General Agent'. and give him a structured response like {"message": "", "buttons": [{"label": "Talk to General Agent", "url": ""}]}

    for getting reply of any other questions, our 'General Agent' url will be :- https://hyperscaler.scalebuild.ai/chat
    `,
    tools: {
      EmployeeFeedbackTool,
    },
    onError({ error }) {
      console.error(error); // log to your error tracking service
    },
  });

  return result.toUIMessageStreamResponse();
}
