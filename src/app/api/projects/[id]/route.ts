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

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (project.status === "CANCELLED") {
      return NextResponse.json(
        { error: "This project has been cancelled" },
        { status: 403 }
      );
    }

    const assignedEmployees = project.assignedEmployees as string[];
    if (!assignedEmployees.includes(userId)) {
      return NextResponse.json(
        { error: "You are not assigned to this project" },
        { status: 403 }
      );
    }

    // Enrich services with full service details - optimized with Promise.all
    const services = Array.isArray(project.services) ? project.services : [];
    const serviceIds = services.map((s: any) => s.serviceId).filter(Boolean);

    // Fetch all services in one query
    const fullServices = await prisma.service.findMany({
      where: { id: { in: serviceIds } },
      select: { id: true, serviceName: true, sections: true },
    });

    // Create a map for quick lookup
    const serviceMap = new Map(fullServices.map((s) => [s.id, s]));

    // Enrich services with sections from database
    const enrichedServices = services.map((service: any) => {
      const fullService = serviceMap.get(service.serviceId);
      if (fullService) {
        return {
          serviceId: service.serviceId,
          serviceName: fullService.serviceName,
          sections: fullService.sections, // Use sections from database
          updates: service.updates || {},
        };
      }
      return service;
    });

    return NextResponse.json({
      project: {
        ...project,
        services: enrichedServices,
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

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (project.status === "CANCELLED") {
      return NextResponse.json(
        { error: "This project has been cancelled" },
        { status: 403 }
      );
    }

    const assignedEmployees = project.assignedEmployees as string[];
    if (!assignedEmployees.includes(userId)) {
      return NextResponse.json(
        { error: "You are not assigned to this project" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validatedData = updateProjectServicesSchema.parse(body);

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        services: validatedData.services as any,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ project: updatedProject });
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
