import { NextResponse } from "next/server";
import { auth } from "@/backend/config/auth";
import { prisma } from "@/backend/config/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all projects for this client
    const projects = await prisma.project.findMany({
      where: {
        clientId: session.user.id,
      },
      select: {
        id: true,
        services: true,
      },
    });

    const projectIds = projects.map((p) => p.id);

    // Get metric history for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const metricHistory = await prisma.metricHistory.findMany({
      where: {
        projectId: { in: projectIds },
        recordedAt: { gte: thirtyDaysAgo },
      },
      orderBy: {
        recordedAt: "asc",
      },
    });

    // Aggregate current metrics by service ID (latest values)
    const serviceMetrics: Record<string, any> = {};

    for (const project of projects) {
      const services = Array.isArray(project.services) ? project.services : [];

      for (const service of services as any[]) {
        const serviceId = service.serviceId;
        const serviceName = service.serviceName;
        const updates = service.updates || {};

        if (!serviceMetrics[serviceId]) {
          serviceMetrics[serviceId] = {
            serviceName,
            metrics: {},
            history: [],
          };
        }

        // Merge updates - take the latest value for each metric
        for (const [key, value] of Object.entries(updates)) {
          serviceMetrics[serviceId].metrics[key] = value;
        }
      }
    }

    // Add historical data to each service and calculate totals
    for (const record of metricHistory) {
      if (serviceMetrics[record.serviceId]) {
        serviceMetrics[record.serviceId].history.push({
          date: record.recordedAt,
          metrics: record.metrics,
        });

        // Add to totals
        const recordMetrics = record.metrics as Record<string, any>;
        for (const [key, value] of Object.entries(recordMetrics)) {
          // Try to parse as number and add to total
          const numValue = Number.parseFloat(
            String(value).replace(/[^0-9.-]/g, "")
          );
          if (!isNaN(numValue)) {
            if (!serviceMetrics[record.serviceId].totals) {
              serviceMetrics[record.serviceId].totals = {};
            }
            if (!serviceMetrics[record.serviceId].totals[key]) {
              serviceMetrics[record.serviceId].totals[key] = 0;
            }
            serviceMetrics[record.serviceId].totals[key] += numValue;
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: Object.entries(serviceMetrics).map(
        ([serviceId, data]: [string, any]) => ({
          serviceId,
          serviceName: data.serviceName,
          metrics: data.totals || data.metrics, // Use totals if available, otherwise latest
          history: data.history,
        })
      ),
    });
  } catch (error) {
    console.error("Error fetching client statistics:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
