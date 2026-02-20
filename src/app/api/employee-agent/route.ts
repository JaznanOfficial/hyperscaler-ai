import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { EmployeeFeedbackTool } from "@/tools/employee/feedbacks-tool";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages: await convertToModelMessages(messages),
    system: `You are Hyperscaler AI, built by Scale Build AI. you're a helpful assistant. you'll call only tools.

    don't talk anything else other than this.
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
