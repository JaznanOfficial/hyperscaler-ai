import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/backend/config/auth";
import { prisma } from "@/backend/config/prisma";
import {
  parseClientServiceServices,
  serializeClientServiceServices,
} from "@/backend/utils/client-service-helpers";

const createClientServiceSchema = z.object({
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
    const validatedData = createClientServiceSchema.parse(body);

    const clientService = await prisma.clientService.create({
      data: {
        clientId: validatedData.clientId,
        assignedEmployees: validatedData.assignedEmployees || [],
        services: serializeClientServiceServices(validatedData.services),
        status: "PENDING",
      },
    });

    return NextResponse.json({ clientService }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Error creating client service:", error);
    return NextResponse.json(
      { error: "Failed to create client service" },
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

    const clientServices = await prisma.clientService.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // Enrich client services with client names and employee names
    const enrichedClientServices = await Promise.all(
      clientServices.map(async (clientService) => {
        // Get service names from stored JSON
        const services = parseClientServiceServices(clientService.services);

        // Get client name
        const client = await prisma.user.findUnique({
          where: { id: clientService.clientId },
          select: { name: true, email: true },
        });

        // Get employee names
        const assignedEmployees = Array.isArray(clientService.assignedEmployees)
          ? (clientService.assignedEmployees as string[])
          : [];

        const employees =
          assignedEmployees.length > 0
            ? await prisma.user.findMany({
                where: { id: { in: assignedEmployees } },
                select: { id: true, name: true },
              })
            : [];

        return {
          ...clientService,
          services,
          clientName: client?.name || "Unknown Client",
          clientEmail: client?.email,
          employeeNames: employees.map((e) => e.name),
        };
      })
    );

    return NextResponse.json({ clientServices: enrichedClientServices });
  } catch (error) {
    console.error("Error fetching client services:", error);
    return NextResponse.json(
      { error: "Failed to fetch client services" },
      { status: 500 }
    );
  }
}
