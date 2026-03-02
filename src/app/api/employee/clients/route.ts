import { NextResponse } from "next/server";
import { auth } from "@/backend/config/auth";
import { prisma } from "@/backend/config/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user || !["EMPLOYEE", "MANAGER"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all projects and filter by assigned employee
    const allProjects = await prisma.project.findMany({
      select: {
        clientId: true,
        assignedEmployees: true,
      },
    });

    // Filter projects assigned to this employee
    const projects = allProjects.filter((project) => {
      const assignedEmployees = project.assignedEmployees as string[];
      return assignedEmployees.includes(session.user.id);
    });

    // Get unique client IDs
    const clientIds = [...new Set(projects.map(p => p.clientId))];

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

    // Count projects per client
    const clientsWithProjectCount = clients.map(client => {
      const projectCount = projects.filter(p => p.clientId === client.id).length;
      return {
        ...client,
        projectCount,
      };
    });

    return NextResponse.json({ clients: clientsWithProjectCount });
  } catch (error) {
    console.error("Get employee clients error:", error);
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}
