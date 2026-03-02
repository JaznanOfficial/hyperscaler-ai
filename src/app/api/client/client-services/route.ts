import { NextResponse } from "next/server";
import { auth } from "@/backend/config/auth";
import { prisma } from "@/backend/config/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "CLIENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const clientServices = await prisma.clientService.findMany({
      where: {
        clientId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ projects: clientServices });
  } catch (error) {
    console.error("Get client projects error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
