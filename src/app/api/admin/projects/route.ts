import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/backend/config/auth";
import { prisma } from "@/backend/config/prisma";

const createProjectSchema = z.object({
  clientId: z.string(),
  services: z.array(
    z.object({
      serviceId: z.string(),
      serviceName: z.string(),
      fields: z.array(
        z.object({
          fieldName: z.string(),
          fieldType: z.string(),
          required: z.boolean().optional(),
          options: z.array(z.string()).optional(),
        })
      ),
    })
  ),
  assignedEmployees: z.array(z.string()).optional(),
});

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN" && session.user.role !== "MANAGER") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const validatedData = createProjectSchema.parse(body);

    const project = await prisma.project.create({
      data: {
        clientId: validatedData.clientId,
        assignedEmployees: validatedData.assignedEmployees || [],
        services: validatedData.services as any,
        status: "PENDING",
      },
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN" && session.user.role !== "MANAGER") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // Enrich projects with service names, client names, and employee names
    const enrichedProjects = await Promise.all(
      projects.map(async (project) => {
        // Get service names
        const services = Array.isArray(project.services)
          ? project.services
          : [];
        const serviceIds = services
          .map((s: any) => s.serviceId)
          .filter(Boolean);

        const fullServices = await prisma.service.findMany({
          where: { id: { in: serviceIds } },
          select: { id: true, serviceName: true },
        });

        const serviceMap = new Map(
          fullServices.map((s) => [s.id, s.serviceName])
        );
        const enrichedServices = services.map((service: any) => ({
          ...service,
          serviceName: serviceMap.get(service.serviceId) || service.serviceName,
        }));

        // Get client name
        const client = await prisma.user.findUnique({
          where: { id: project.clientId },
          select: { name: true, email: true },
        });

        // Get employee names
        const assignedEmployees = Array.isArray(project.assignedEmployees)
          ? (project.assignedEmployees as string[])
          : [];

        const employees =
          assignedEmployees.length > 0
            ? await prisma.user.findMany({
                where: { id: { in: assignedEmployees } },
                select: { id: true, name: true },
              })
            : [];

        return {
          ...project,
          services: enrichedServices,
          clientName: client?.name || "Unknown Client",
          clientEmail: client?.email,
          employeeNames: employees.map((e) => e.name),
        };
      })
    );

    return NextResponse.json({ projects: enrichedProjects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
