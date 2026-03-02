import { NextResponse } from "next/server";
import { auth } from "@/backend/config/auth";
import { prisma } from "@/backend/config/prisma";
import {
  type ClientServiceEntry,
  parseClientServiceServices,
} from "@/backend/utils/client-service-helpers";

export async function GET(
  _request: Request,
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

    const clientServices = await prisma.clientService.findMany({
      where: {
        clientId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const requestedServices = clientServices.flatMap((serviceRecord) => {
      const services = parseClientServiceServices(serviceRecord.services);
      const assignedEmps = Array.isArray(serviceRecord.assignedEmployees)
        ? serviceRecord.assignedEmployees
        : [];
      return services.map((service: ClientServiceEntry) => {
        const assignedEmployees = assignedEmps.filter(
          (assignedId): assignedId is string => typeof assignedId === "string"
        );

        let statusLabel = "Pending";
        if (serviceRecord.status === "APPROVED") {
          statusLabel = "Approved";
        } else if (serviceRecord.status === "CANCELLED") {
          statusLabel = "Cancelled";
        }

        return {
          id: serviceRecord.id,
          serviceId: service.serviceId ?? serviceRecord.id,
          name:
            service.serviceName ||
            service.serviceSlug ||
            service.serviceId ||
            "Service",
          description: `Project created on ${new Date(serviceRecord.createdAt).toLocaleDateString()}`,
          status: statusLabel,
          assignedEmployees,
          renewal: `Created ${new Date(
            serviceRecord.createdAt
          ).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`,
        };
      });
    });

    const clientDetail = {
      id: client.id,
      displayId: `CL-${client.id.slice(0, 4).toUpperCase()}`,
      name: client.name,
      email: client.email,
      subscriptionId: `SUB-${client.id.slice(0, 4)}`,
      accountStatus: (() => {
        if (clientServices.some((p) => p.status === "APPROVED")) {
          return "Approved";
        }
        if (clientServices.some((p) => p.status === "PENDING")) {
          return "Pending";
        }
        return "Cancelled";
      })(),
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
