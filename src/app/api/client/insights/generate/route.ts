import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";

import { AuthGuard } from "@/backend/utils/auth-guard";

export const runtime = "nodejs";

const requestSchema = z.object({
  serviceId: z.string().min(1, "serviceId is required"),
  summary: z.record(z.string(), z.any()),
  comparisonSummary: z.record(z.string(), z.any()).optional(),
});

const insightItemSchema = z.object({
  title: z.string().min(1),
  detail: z.string().min(1),
  severity: z.enum(["info", "success", "warning"]),
});

const insightsSchema = z.object({
  insights: z.array(insightItemSchema).max(4),
});

const severityGuidance = `Use severity to indicate urgency:
- "success" for clearly positive improvements.
- "warning" for regressions, risks, or negative deltas.
- "info" for neutral or informational observations.
If there are no meaningful changes, return a single insight with title "No noteworthy changes" and severity "info".`;

export async function POST(request: Request) {
  try {
    await AuthGuard.requireClient();
    const rawBody = await request.json();
    const { serviceId, summary, comparisonSummary } =
      requestSchema.parse(rawBody);

    const prompt = `You are Hyperscaler AI, generating concise insights for clients about their ${serviceId} performance.
Use only the provided JSON metrics and do not fabricate data. ${severityGuidance}

Summary JSON:
${JSON.stringify(summary)}

Comparison Summary JSON (may be empty):
${JSON.stringify(comparisonSummary ?? {})}

Return up to 4 insights. Each insight must reference a concrete data point or trend from the JSON. Avoid repeating the same fact. Provide actionable wording.`;

    const result = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: insightsSchema,
      prompt,
    });

    const parsed = insightsSchema.parse(result.object);

    return NextResponse.json(parsed, { status: 200 });
  } catch (error) {
    console.error("client insights generation error", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request", details: error.flatten() },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate insights" },
      { status: 500 }
    );
  }
}
