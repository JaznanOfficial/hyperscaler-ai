import { NextResponse } from "next/server";

export async function GET() {
  // Mock data for UI design - API integration to be implemented later
  const mockServiceData = {
    cmm2b4i9v000010kjjn8gnunc: {
      serviceName: "Paid Ads",
      metrics: {
        "Conversion Rate": "12.5%",
        "Click-Through Rate": "3.2%",
        "Cost Per Click": "$0.85",
        "Total Spend": "$2,450",
      },
      history: [
        {
          date: new Date("2025-02-01"),
          metrics: { "Conversion Rate": "10.2%" },
        },
        {
          date: new Date("2025-02-05"),
          metrics: { "Conversion Rate": "11.8%" },
        },
        {
          date: new Date("2025-02-10"),
          metrics: { "Conversion Rate": "12.1%" },
        },
        {
          date: new Date("2025-02-15"),
          metrics: { "Conversion Rate": "12.5%" },
        },
      ],
    },
    cmm2b4j58000110kj3fouc7wr: {
      serviceName: "Social Media Marketing",
      metrics: {
        "Engagement Rate": "8.3%",
        "Follower Growth": "245",
        Impressions: "12,500",
        Reach: "8,900",
      },
      history: [
        {
          date: new Date("2025-02-01"),
          metrics: { "Engagement Rate": "6.5%" },
        },
        {
          date: new Date("2025-02-05"),
          metrics: { "Engagement Rate": "7.2%" },
        },
        {
          date: new Date("2025-02-10"),
          metrics: { "Engagement Rate": "7.8%" },
        },
        {
          date: new Date("2025-02-15"),
          metrics: { "Engagement Rate": "8.3%" },
        },
      ],
    },
    cmm2b4jrx000210kjr0wxdk7s: {
      serviceName: "Cold Calling",
      metrics: {
        "Call Duration": "4.2 min",
        "Conversion Rate": "18.5%",
        "Total Calls": "156",
        "Successful Calls": "29",
      },
      history: [
        {
          date: new Date("2025-02-01"),
          metrics: { "Conversion Rate": "15.2%" },
        },
        {
          date: new Date("2025-02-05"),
          metrics: { "Conversion Rate": "16.8%" },
        },
        {
          date: new Date("2025-02-10"),
          metrics: { "Conversion Rate": "17.5%" },
        },
        {
          date: new Date("2025-02-15"),
          metrics: { "Conversion Rate": "18.5%" },
        },
      ],
    },
  };

  return NextResponse.json({
    success: true,
    data: Object.entries(mockServiceData).map(([serviceId, data]) => ({
      serviceId,
      serviceName: data.serviceName,
      metrics: data.metrics,
      history: data.history,
    })),
  });
}
