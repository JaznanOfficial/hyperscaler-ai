import { NextResponse } from "next/server";
import { auth } from "@/backend/config/auth";
import { prisma } from "@/backend/config/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (
      !(session?.user && ["EMPLOYEE", "MANAGER"].includes(session.user.role))
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all client services and filter by assigned employee
    const allClientServices = await prisma.clientService.findMany({
      select: {
        clientId: true,
        assignedEmployees: true,
      },
    });

    // Filter client services assigned to this employee
    const clientServices = allClientServices.filter((clientService) => {
      const assignedEmployees = clientService.assignedEmployees as string[];
      return assignedEmployees.includes(session.user.id);
    });

    // Get unique client IDs
    const clientIds = [...new Set(clientServices.map((p) => p.clientId))];

    // Get client details
    const clients = await prisma.user.findMany({
      where: {
        id: { in: clientIds },
        role: "CLIENT",
      },
      select: {
        id: true,
        name: true,
        email: true,
        displayId: true,
        createdAt: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    // Count client services per client
    const clientsWithServiceCount = clients.map((client) => {
      const serviceCount = clientServices.filter(
        (p) => p.clientId === client.id
      ).length;
      return {
        ...client,
        serviceCount,
      };
    });

    return NextResponse.json({ clients: clientsWithServiceCount });
  } catch (error) {
    console.error("Get employee clients error:", error);
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}
