import { NextResponse } from "next/server";
import { auth } from "@/backend/config/auth";
import { prisma } from "@/backend/config/prisma";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "EMPLOYEE") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { serviceId, entryDate, history } = await request.json();

    if (!(serviceId && entryDate && history)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const metricHistory = await prisma.metricHistory.create({
      data: {
        clientId: session.user.id,
        serviceId,
        history,
        entryDate: new Date(entryDate),
      },
    });

    return NextResponse.json({ metricHistory }, { status: 201 });
  } catch (error) {
    console.error("Save metrics error:", error);
    return NextResponse.json(
      { error: "Failed to save metrics" },
      { status: 500 }
    );
  }
}
