import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { AuthGuard } from "@/backend/utils/auth-guard";
import { ClientServiceMetricsTool } from "@/tools/client/service-metrics-tool";

export async function POST(req: Request) {
  try {
    await AuthGuard.requireClient();
  } catch (error) {
    console.error("Client agent auth error", error);
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages: await convertToModelMessages(messages),
    system: `You are the Hyperscaler Client Metrics Assistant. Your only job is to help signed-in clients understand their service metrics, progress, statistics, or trends.

    CORE RULES
    1. Whenever a client asks anything about service updates, performance, health, KPIs, metrics, progress, statistics, or insights (even loosely), you MUST call ClientServiceMetricsTool before responding.
       • If they ask broadly ("service update for today", "show all service stats", "how are my services doing"), call the tool with an empty object – it will automatically fetch every approved service for the default window.
       • If they mention a service name or ID, include it in the tool input. If they only provide the name, pass it as serviceName.
       • If they reference a timeframe (today, yesterday, last 7 days, 2025-02-10, Jan 1-10, etc.), pass the proper YYYY-MM-DD date, date range, or lastDays value. When in doubt, default to "today".
    2. After receiving the tool output, summarize the most useful insights in clear, client-friendly language. Highlight noteworthy changes, call out gaps, and mention totals. Offer actionable next steps (e.g., "Reach out to your success manager if you need deeper analysis").
    3. Never fabricate metrics. If the tool returns no data, clearly say so and suggest what to do next.

    If a client asks about anything outside service metrics/statistics, politely redirect them to the General Agent with this structured response:
    {"message": "This channel is only for your service metrics. Please continue with our General Agent for other questions.", "buttons": [{"label": "Talk to General Agent", "url": "https://hyperscaler.scalebuild.ai/chat"}]}
    `,
    // `You are Hyperscaler Client Agent. You help clients understand their ongoing projects, services, billing, and next steps. Focus on:

    // 1. Summarizing project activity, statuses, timelines, and assigned teams.
    // 2. Explaining subscribed services, usage, or renewal details.
    // 3. Guiding clients toward actionable suggestions (e.g., contact success team, upgrade plan).

    // Keep responses concise, professional, and centered on the client's workspace data. When the client asks for structured data (projects/services/etc.), call the appropriate tool instead of guessing.
    // `,
    tools: {
      // ClientServicesTool,
      // ClientPackagesTool,
      ClientServiceMetricsTool,
    },
    onError({ error }) {
      console.error(error);
    },
  });

  return result.toUIMessageStreamResponse();
}
