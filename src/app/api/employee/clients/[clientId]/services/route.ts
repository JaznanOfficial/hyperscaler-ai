import { NextResponse } from "next/server";
import { auth } from "@/backend/config/auth";
import { prisma } from "@/backend/config/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ clientId: string }> }
) {
  try {
    const session = await auth();

    if (
      !(session?.user && ["EMPLOYEE", "MANAGER"].includes(session.user.role))
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { clientId } = await params;

    // Get client details
    const client = await prisma.user.findUnique({
      where: { id: clientId },
      select: {
        id: true,
        name: true,
        email: true,
        displayId: true,
      },
    });

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Get client services for this client and filter by assigned employee
    const allClientServices = await prisma.clientService.findMany({
      where: {
        clientId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Filter client services assigned to this employee
    const clientServices = allClientServices.filter((clientService) => {
      const assignedEmployees = clientService.assignedEmployees as string[];
      return assignedEmployees.includes(session.user.id);
    });

    return NextResponse.json({ client, clientServices });
  } catch (error) {
    console.error("Get client services error:", error);
    return NextResponse.json(
      { error: "Failed to fetch client services" },
      { status: 500 }
    );
  }
}
