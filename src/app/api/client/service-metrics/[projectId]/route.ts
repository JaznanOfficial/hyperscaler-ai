import { NextResponse } from "next/server";
import { auth } from "@/backend/config/auth";
import { prisma } from "@/backend/config/prisma";
import { parseClientServiceServices } from "@/backend/utils/client-service-helpers";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "CLIENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { projectId } = await params;

    const clientService = await prisma.clientService.findUnique({
      where: {
        id: projectId,
        clientId: session.user.id,
      },
    });

    if (!clientService) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (clientService.status === "CANCELLED") {
      return NextResponse.json(
        { error: "This service has been cancelled" },
        { status: 403 }
      );
    }

    // Parse services from stored JSON
    const services = parseClientServiceServices(clientService.services);

    return NextResponse.json({
      project: {
        id: clientService.id,
        status: clientService.status,
        services,
        createdAt: clientService.createdAt,
      },
    });
  } catch (error) {
    console.error("Get service metrics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch service metrics" },
      { status: 500 }
    );
  }
}
