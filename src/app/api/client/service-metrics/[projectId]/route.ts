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

    // Enrich services - optimized with single query
    const services = parseClientServiceServices(clientService.services);
    const serviceIds = services.map((s: any) => s.serviceId).filter(Boolean);

    const fullServices = await prisma.service.findMany({
      where: { id: { in: serviceIds } },
      select: { id: true, serviceName: true, sections: true },
    });

    const serviceMap = new Map(fullServices.map((s) => [s.id, s]));

    const enrichedServices = services.map((service: any) => {
      const fullService = serviceMap.get(service.serviceId);
      if (fullService) {
        return {
          ...service,
          sections: fullService.sections,
          serviceName: fullService.serviceName,
        };
      }
      return service;
    });

    return NextResponse.json({
      project: {
        id: project.id,
        status: project.status,
        services: enrichedServices,
        createdAt: project.createdAt,
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
