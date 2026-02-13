import { NextResponse } from "next/server";
import { auth } from "@/backend/config/auth";
import { prisma } from "@/backend/config/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (
      !session?.user ||
      (session.user.role !== "ADMIN" && session.user.role !== "MANAGER")
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const client = await prisma.user.findUnique({
      where: {
        id,
        role: "CLIENT",
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    const projects = await prisma.project.findMany({
      where: {
        clientId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const allEmployeeIds = projects.flatMap(
      (p) => (p.assignedEmployees || []) as string[]
    );
    const uniqueEmployeeIds = [...new Set(allEmployeeIds)].filter(
      (id): id is string => typeof id === "string"
    );

    const employees =
      uniqueEmployeeIds.length > 0
        ? await prisma.user.findMany({
            where: {
              id: { in: uniqueEmployeeIds },
            },
            select: {
              id: true,
              name: true,
            },
          })
        : [];

    const employeeMap = new Map(employees.map((e) => [e.id, e.name]));

    const requestedServices = projects.flatMap((project) => {
      const services = Array.isArray(project.services) ? project.services : [];
      const assignedEmps = Array.isArray(project.assignedEmployees)
        ? project.assignedEmployees
        : [];
      return services.map((service: any) => ({
        id: project.id,
        name: service.serviceName || "Service",
        description: `Project created on ${new Date(project.createdAt).toLocaleDateString()}`,
        status:
          project.status === "APPROVED"
            ? "Approved"
            : project.status === "CANCELLED"
              ? "Cancelled"
              : "Pending",
        assignedEmployees: assignedEmps.filter(
          (id): id is string => typeof id === "string"
        ),
        renewal: `Created ${new Date(project.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`,
      }));
    });

    const clientDetail = {
      id: `CL-${client.id.slice(0, 4).toUpperCase()}`,
      name: client.name,
      email: client.email,
      subscriptionId: `SUB-${client.id.slice(0, 4)}`,
      accountStatus: projects.some((p) => p.status === "APPROVED")
        ? "Approved"
        : projects.some((p) => p.status === "PENDING")
          ? "Pending"
          : "Cancelled",
      requestedServices,
    };

    return NextResponse.json({ client: clientDetail });
  } catch (error) {
    console.error("Get client detail error:", error);
    return NextResponse.json(
      { error: "Failed to fetch client" },
      { status: 500 }
    );
  }
}
