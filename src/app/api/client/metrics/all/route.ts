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

    const parseIsoDate = (value: string, endOfDay: boolean) => {
      const [year, month, day] = value.split("-").map(Number);
      return new Date(
        Date.UTC(
          year,
          (month ?? 1) - 1,
          day ?? 1,
          endOfDay ? 23 : 0,
          endOfDay ? 59 : 0,
          endOfDay ? 59 : 0,
          endOfDay ? 999 : 0
        )
      );
    };

    if (lastDays) {
      const days = Number.parseInt(lastDays, 10);
      if (Number.isNaN(days) || days < 1) {
        return NextResponse.json(
          { error: "lastDays must be a positive number" },
          { status: 400 }
        );
      }
      queryEndDate = new Date();
      queryEndDate.setUTCHours(23, 59, 59, 999);
      queryStartDate = new Date(queryEndDate);
      queryStartDate.setUTCDate(queryStartDate.getUTCDate() - (days - 1));
      queryStartDate.setUTCHours(0, 0, 0, 0);
    } else if (startDate && endDate) {
      queryStartDate = parseIsoDate(startDate, false);
      queryEndDate = parseIsoDate(endDate, true);
    } else if (date) {
      queryStartDate = parseIsoDate(date, false);
      queryEndDate = parseIsoDate(date, true);
    } else {
      return NextResponse.json(
        {
          error:
            "Missing date parameters. Provide either 'date', 'startDate+endDate', or 'lastDays'",
        },
        { status: 400 }
      );
    }

    const clientServices = await prisma.clientService.findMany({
      where: {
        clientId: session.user.id,
        status: "APPROVED",
      },
    });

    const serviceNameMap = new Map<string, string>();
    for (const clientService of clientServices) {
      if (!clientService.services) {
        continue;
      }

      try {
        const services = JSON.parse(clientService.services) as Array<
          Record<string, unknown>
        >;

        for (const service of services) {
          const serviceId =
            typeof service.serviceId === "string"
              ? service.serviceId
              : undefined;
          const serviceName =
            typeof service.serviceName === "string"
              ? service.serviceName
              : undefined;

          if (serviceId && serviceName && !serviceNameMap.has(serviceId)) {
            serviceNameMap.set(serviceId, serviceName);
          }
        }
      } catch (error) {
        console.error("Failed to parse client services", error);
      }
    }

    const metricHistories = await prisma.metricHistory.findMany({
      where: {
        clientId: session.user.id,
        entryDate: {
          gte: queryStartDate,
          lte: queryEndDate,
        },
      },
      orderBy: {
        entryDate: "asc",
      },
    });

    const groupedMetrics = new Map<
      string,
      {
        serviceId: string;
        serviceName: string;
        metricHistories: typeof metricHistories;
      }
    >();

    for (const history of metricHistories) {
      const serviceId = history.serviceId || "GENERAL";
      const serviceName = serviceNameMap.get(serviceId) ?? serviceId;
      const bucket = groupedMetrics.get(serviceId);

      if (bucket) {
        bucket.metricHistories.push(history);
      } else {
        groupedMetrics.set(serviceId, {
          serviceId,
          serviceName,
          metricHistories: [history],
        });
      }
    }

    return NextResponse.json(
      { data: Array.from(groupedMetrics.values()) },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get all metrics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch metrics" },
      { status: 500 }
    );
  }
}
