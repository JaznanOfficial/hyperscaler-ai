import { NextResponse } from "next/server";

import { auth } from "@/backend/config/auth";
import { prisma } from "@/backend/config/prisma";

const GENERAL_METRIC_ID = "GENERAL";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "CLIENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const metricHistory = await prisma.metricHistory.findFirst({
      where: {
        clientId: session.user.id,
        serviceId: GENERAL_METRIC_ID,
      },
      orderBy: {
        entryDate: "desc",
      },
    });

    const history = (metricHistory?.history || {}) as Record<
      string,
      string | null
    >;

    return NextResponse.json({
      success: true,
      data: {
        overallProgress: history.overall_progress ?? null,
        activeServices: history.active_services ?? null,
        onTrackServices: history.on_track_services ?? null,
        needsAttentionServices: history.needs_attention_services ?? null,
        timeSaved: history.time_saved_due_to_ai ?? null,
      },
    });
  } catch (error) {
    console.error("Client overall progress error:", error);
    return NextResponse.json(
      { error: "Failed to fetch overall progress" },
      { status: 500 }
    );
  }
}
