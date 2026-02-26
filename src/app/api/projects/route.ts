import { NextResponse } from "next/server";
import { auth } from "@/backend/config/auth";
import { prisma } from "@/backend/config/prisma";

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

    const projects = await prisma.project.findMany({
      where: {
        status: {
          not: "CANCELLED",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const userProjects = projects.filter((project) => {
      const assignedEmployees = project.assignedEmployees as string[];
      return assignedEmployees.includes(userId);
    });

    // Enrich projects with service names
    const enrichedProjects = await Promise.all(
      userProjects.map(async (project) => {
        const services = Array.isArray(project.services)
          ? project.services
          : [];
        const serviceIds = services
          .map((s: any) => s.serviceId)
          .filter(Boolean);

        if (serviceIds.length > 0) {
          const fullServices = await prisma.service.findMany({
            where: { id: { in: serviceIds } },
            select: { id: true, serviceName: true },
          });

          const serviceMap = new Map(
            fullServices.map((s) => [s.id, s.serviceName])
          );

          const enrichedServices = services.map((service: any) => ({
            ...service,
            serviceName:
              serviceMap.get(service.serviceId) || service.serviceName,
          }));

          return {
            ...project,
            services: enrichedServices,
          };
        }

        return project;
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
