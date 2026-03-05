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
    const serviceId = searchParams.get("serviceId");
    const metricId = searchParams.get("metricId");
    const date = searchParams.get("date");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const lastDays = searchParams.get("lastDays");

    if (!serviceId) {
      return NextResponse.json(
        { error: "Missing serviceId parameter" },
        { status: 400 }
      );
    }

    // If metricId is provided, query by serviceId matching metricId (for overall records)
    if (metricId) {
      const metricHistories = await prisma.metricHistory.findMany({
        where: {
          clientId: session.user.id,
          serviceId: metricId,
        },
      });

      return NextResponse.json({ metricHistories }, { status: 200 });
    }

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
        entryDate: "desc",
      },
    });

    return NextResponse.json({ metricHistories }, { status: 200 });
  } catch (error) {
    console.error("Get metrics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch metrics" },
      { status: 500 }
    );
  }
}
