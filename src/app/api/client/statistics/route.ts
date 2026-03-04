import { NextResponse } from "next/server";
import { auth } from "@/backend/config/auth";
import { prisma } from "@/backend/config/prisma";
import { parseClientServiceServices } from "@/backend/utils/client-service-helpers";

const SERVICE_NAMES: Record<string, string> = {
  PAID_ADS: "Paid Ads",
  COLD_EMAIL: "Cold Email",
  COLD_CALLING: "Cold Calling",
  SOCIAL_MEDIA: "Social Media Marketing",
  LINKEDIN_OUTREACH: "LinkedIn Outreach",
  BRAND_CONTENT: "Branding Content",
  SOFTWARE_DEVELOPMENT: "Software Development",
};

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "CLIENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const clientServices = await prisma.clientService.findMany({
      where: {
        clientId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const allServices: Array<{
      serviceId: string;
      serviceName: string;
      metrics: Record<string, unknown>;
      history: unknown[];
    }> = [];

    for (const clientService of clientServices) {
      const parsedServices = parseClientServiceServices(clientService.services);

      for (const service of parsedServices) {
        const serviceId = service.serviceId || "";
        // Always use SERVICE_NAMES mapping for consistency, fallback to serviceName from data
        const serviceName =
          SERVICE_NAMES[serviceId] || service.serviceName || "Unknown Service";

        // Only include APPROVED services in statistics
        if (clientService.status === "APPROVED") {
          allServices.push({
            serviceId,
            serviceName,
            metrics: {},
            history: [],
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: allServices,
    });
  } catch (error) {
    console.error("Get statistics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
