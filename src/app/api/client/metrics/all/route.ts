import { NextResponse } from "next/server";
import { auth } from "@/backend/config/auth";
import { prisma } from "@/backend/config/prisma";

export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "CLIENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const lastDays = searchParams.get("lastDays");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const date = searchParams.get("date");

    let queryStartDate: Date;
    let queryEndDate: Date;

    if (lastDays) {
      const days = Number.parseInt(lastDays, 10);
      if (Number.isNaN(days) || days < 1) {
        return NextResponse.json(
          { error: "lastDays must be a positive number" },
          { status: 400 }
        );
      }
      queryEndDate = new Date();
      queryEndDate.setHours(23, 59, 59, 999);
      queryStartDate = new Date();
      queryStartDate.setDate(queryStartDate.getDate() - (days - 1));
      queryStartDate.setHours(0, 0, 0, 0);
    } else if (startDate && endDate) {
      const [startYear, startMonth, startDay] = startDate
        .split("-")
        .map(Number);
      const [endYear, endMonth, endDay] = endDate.split("-").map(Number);
      queryStartDate = new Date(
        startYear,
        startMonth - 1,
        startDay,
        0,
        0,
        0,
        0
      );
      queryEndDate = new Date(endYear, endMonth - 1, endDay, 23, 59, 59, 999);
    } else if (date) {
      const [year, month, day] = date.split("-").map(Number);
      queryStartDate = new Date(year, month - 1, day, 0, 0, 0, 0);
      queryEndDate = new Date(year, month - 1, day, 23, 59, 59, 999);
    } else {
      return NextResponse.json(
        {
          error:
            "Missing date parameters. Provide either 'date', 'startDate+endDate', or 'lastDays'",
        },
        { status: 400 }
      );
    }

    // Get all active services for this client
    const clientServices = await prisma.clientService.findMany({
      where: {
        clientId: session.user.id,
        status: "APPROVED",
      },
    });

    // Fetch metrics for all services
    const allServicesMetrics = [];

    for (const clientService of clientServices) {
      const services = clientService.services
        ? JSON.parse(clientService.services)
        : [];

      for (const service of services) {
        const serviceId = service.serviceId || "";
        const serviceName = service.serviceName || "";

        const metricHistories = await prisma.metricHistory.findMany({
          where: {
            clientId: session.user.id,
            serviceId,
            entryDate: {
              gte: queryStartDate,
              lte: queryEndDate,
            },
          },
          orderBy: {
            entryDate: "asc",
          },
        });

        if (metricHistories.length > 0) {
          allServicesMetrics.push({
            serviceId,
            serviceName,
            metricHistories,
          });
        }
      }
    }

    return NextResponse.json({ data: allServicesMetrics }, { status: 200 });
  } catch (error) {
    console.error("Get all metrics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch metrics" },
      { status: 500 }
    );
  }
}
