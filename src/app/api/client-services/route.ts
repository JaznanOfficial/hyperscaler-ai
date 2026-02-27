import { NextResponse } from "next/server";
import { auth } from "@/backend/config/auth";
import { prisma } from "@/backend/config/prisma";
import { parseClientServiceServices } from "@/backend/utils/client-service-helpers";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: userId, role } = session.user;

    if (role !== "EMPLOYEE" && role !== "MANAGER") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const projects = await prisma.clientService.findMany({
      where: {
        status: {
          not: "CANCELLED",
        },
        assignedEmployees: {
          array_contains: userId,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const clientIds = Array.from(
      new Set(projects.map((project) => project.clientId))
    );
    const clients = clientIds.length
      ? await prisma.user.findMany({
          where: { id: { in: clientIds } },
          select: { id: true, name: true },
        })
      : [];
    const clientMap = new Map(
      clients.map((client) => [client.id, client.name])
    );

    const formattedProjects = projects.map((project) => {
      const services = parseClientServiceServices(project.services);
      return {
        ...project,
        services,
        clientName: clientMap.get(project.clientId) || "Client",
      };
    });

    return NextResponse.json({ projects: formattedProjects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
