import { NextResponse } from "next/server";
import { auth } from "@/backend/config/auth";
import { prisma } from "@/backend/config/prisma";
import { updateProjectServicesSchema } from "@/backend/schemas/project.schema";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: userId, role } = session.user;

    if (role !== "EMPLOYEE" && role !== "MANAGER") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const clientService = await prisma.clientService.findUnique({
      where: { id },
    });

    if (!clientService) {
      return NextResponse.json(
        { error: "Client service not found" },
        { status: 404 }
      );
    }

    if (clientService.status === "CANCELLED") {
      return NextResponse.json(
        { error: "This service has been cancelled" },
        { status: 403 }
      );
    }

    const assignedEmployees = Array.isArray(clientService.assignedEmployees)
      ? (clientService.assignedEmployees as string[])
      : [];
    if (!assignedEmployees.includes(userId)) {
      return NextResponse.json(
        { error: "You are not assigned to this service" },
        { status: 403 }
      );
    }

    // Parse services from JSON storage
    const services = JSON.parse(clientService.services || "[]");

    return NextResponse.json({
      clientService: {
        ...clientService,
        services,
      },
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: userId, role } = session.user;

    if (role !== "EMPLOYEE" && role !== "MANAGER") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const clientService = await prisma.clientService.findUnique({
      where: { id },
    });

    if (!clientService) {
      return NextResponse.json(
        { error: "Client service not found" },
        { status: 404 }
      );
    }

    if (clientService.status === "CANCELLED") {
      return NextResponse.json(
        { error: "This service has been cancelled" },
        { status: 403 }
      );
    }

    const assignedEmployees = Array.isArray(clientService.assignedEmployees)
      ? (clientService.assignedEmployees as string[])
      : [];
    if (!assignedEmployees.includes(userId)) {
      return NextResponse.json(
        { error: "You are not assigned to this service" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validatedData = updateProjectServicesSchema.parse(body);

    // Update client service with new services data
    const updatedClientService = await prisma.clientService.update({
      where: { id },
      data: {
        services: JSON.stringify(validatedData.services),
        updatedAt: new Date(),
      },
    });

    // Create metric history records for each service
    const historyRecords = validatedData.services.map(
      (service: Record<string, unknown>) => ({
        clientId: clientService.clientId,
        projectId: id,
        serviceId: String(service.serviceId),
        serviceName: String(service.serviceName),
        metrics: service.updates || {},
        recordedAt: new Date(),
      })
    );

    // Bulk create history records
    await prisma.metricHistory.createMany({
      data: historyRecords,
      skipDuplicates: true,
    });

    return NextResponse.json({ clientService: updatedClientService });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid request data", details: error },
        { status: 400 }
      );
    }
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}
