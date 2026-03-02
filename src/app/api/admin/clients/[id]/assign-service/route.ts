import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/backend/config/auth";
import { prisma } from "@/backend/config/prisma";
import { FIXED_SERVICE_IDS, getFixedService } from "@/data/fixed-services";

const assignServiceSchema = z.object({
  serviceIds: z.array(z.enum(FIXED_SERVICE_IDS)).min(1),
});

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: clientId } = await params;
    const body = await request.json();
    const { serviceIds } = assignServiceSchema.parse(body);
    const uniqueServiceIds = [...new Set(serviceIds)];

    const client = await prisma.user.findUnique({
      where: { id: clientId, role: "CLIENT" },
    });

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    const services = uniqueServiceIds
      .map((serviceId) => getFixedService(serviceId))
      .filter((service): service is NonNullable<typeof service> =>
        Boolean(service)
      );

    if (services.length !== uniqueServiceIds.length) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const createdClientServices = await Promise.all(
      services.map((service) =>
        prisma.clientService.create({
          data: {
            clientId,
            status: "APPROVED",
            services: JSON.stringify([
              {
                serviceId: service.id,
                serviceName: service.title,
                serviceSlug: service.slug,
                description: service.description,
                sections: service.sections,
              },
            ]),
            assignedEmployees: [],
            read: false,
          },
        })
      )
    );

    return NextResponse.json({
      success: true,
      message: "Services assigned to client successfully",
      clientServices: createdClientServices.map((clientService) => ({
        id: clientService.id,
        status: clientService.status,
        services: clientService.services,
      })),
    });
  } catch (error) {
    console.error("Assign service error:", error);
    return NextResponse.json(
      { error: "Failed to assign service" },
      { status: 500 }
    );
  }
}
