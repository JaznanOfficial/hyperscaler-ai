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
