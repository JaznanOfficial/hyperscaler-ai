const PERIOD_BUCKETS = [
  { label: "Day 5", maxDay: 5 },
  { label: "Day 10", maxDay: 10 },
  { label: "Day 15", maxDay: 15 },
  { label: "Day 20", maxDay: 20 },
  { label: "Day 25", maxDay: 25 },
  { label: "Day 30", maxDay: 31 },
] as const;

const SERVICE_COLOR_MAP: Record<string, string> = {
  PAID_ADS: "#0ea5e9",
  SOCIAL_MEDIA: "#f97316",
  COLD_CALLING: "#22c55e",
  BRAND_CONTENT: "#a855f7",
  LINKEDIN_OUTREACH: "#ec4899",
  COLD_EMAIL: "#06b6d4",
  SOFTWARE_DEVELOPMENT: "#14b8a6",
};

export const PERIOD_LABELS = PERIOD_BUCKETS.map((bucket) => bucket.label);

export interface ServiceSeries {
  serviceId: string;
  name: string;
  data: number[];
}

interface MetricHistoryRecord {
  entryDate: string;
  history?: unknown;
}

interface ServiceMetric {
  serviceId: string;
  serviceName: string;
  metricHistories?: MetricHistoryRecord[];
}

const parseHistory = (history: unknown): Record<string, unknown> => {
  if (typeof history === "string") {
    try {
      return JSON.parse(history) as Record<string, unknown>;
    } catch {
      return {};
    }
  }

  return (history as Record<string, unknown>) ?? {};
};

const determinePeriodIndex = (dayOfMonth: number): number => {
  for (let index = 0; index < PERIOD_BUCKETS.length; index++) {
    if (dayOfMonth <= PERIOD_BUCKETS[index].maxDay) {
      return index;
    }
  }

  return PERIOD_BUCKETS.length - 1;
};

const calculatePaidAdsRate = (history: Record<string, unknown>): number => {
  const metaData = (history.meta as Record<string, unknown>) ?? {};
  const googleData = (history.google as Record<string, unknown>) ?? {};

  const totalClicks =
    (Number(metaData.clicks) || 0) + (Number(googleData.clicks) || 0);
  const totalConversions =
    (Number(metaData.conversion_rate) || 0) +
    (Number(googleData.conversion_rate) || 0);

  if (totalClicks <= 0) {
    return 0;
  }

  return (totalConversions / totalClicks) * 100;
};

const calculateConversionRate = (
  serviceId: string,
  history: Record<string, unknown>
): number => {
  switch (serviceId) {
    case "PAID_ADS":
      return calculatePaidAdsRate(history);
    case "SOCIAL_MEDIA": {
      const impressions = Number(history.impressions) || 0;
      const clicks = Number(history.links_clicked) || 0;
      return impressions > 0 ? (clicks / impressions) * 100 : 0;
    }
    case "COLD_EMAIL": {
      const replyRate = Number(history.reply_rate) || 0;
      const emailsSent = Number(history.emails_sent) || 0;
      return emailsSent > 0 ? replyRate : 0;
    }
    case "COLD_CALLING": {
      const calls = Number(history.calls_made) || 0;
      const pickedUp = Number(history.calls_picked_up) || 0;
      return calls > 0 ? (pickedUp / calls) * 100 : 0;
    }
    case "LINKEDIN_OUTREACH": {
      const replyRate =
        Number(history.positive_reply_rate) || Number(history.reply_rate) || 0;
      const messagesSent = Number(history.messages_sent) || 0;
      return messagesSent > 0 ? replyRate : 0;
    }
    case "BRAND_CONTENT":
      return Number(history.content_engagement_rate) || 0;
    default:
      return Number(history.conversion_rate) || 0;
  }
};

export function summarizeConversionRates(
  metrics: ServiceMetric[] = []
): ServiceSeries[] {
  const periodCount = PERIOD_BUCKETS.length;
  const serviceBuckets: Record<
    string,
    { sums: number[]; counts: number[]; name: string }
  > = {};

  for (const metric of metrics) {
    const histories = metric.metricHistories ?? [];
    if (histories.length === 0) {
      continue;
    }

    if (!serviceBuckets[metric.serviceId]) {
      serviceBuckets[metric.serviceId] = {
        sums: new Array(periodCount).fill(0),
        counts: new Array(periodCount).fill(0),
        name: metric.serviceName,
      };
    }

    const bucket = serviceBuckets[metric.serviceId];

    for (const record of histories) {
      const date = new Date(record.entryDate);
      if (Number.isNaN(date.getTime())) {
        continue;
      }

      const periodIndex = determinePeriodIndex(date.getDate());
      const history = parseHistory(record.history);
      const conversionRate = calculateConversionRate(metric.serviceId, history);

      if (Number.isFinite(conversionRate)) {
        bucket.sums[periodIndex] += conversionRate;
        bucket.counts[periodIndex] += 1;
      }
    }
  }

  return Object.entries(serviceBuckets).map(([serviceId, bucket]) => {
    const data = bucket.sums.map((sum, index) => {
      const count = bucket.counts[index];
      if (!count) {
        return 0;
      }
      return Math.round((sum / count) * 10) / 10;
    });

    return {
      serviceId,
      name: bucket.name,
      data,
    } satisfies ServiceSeries;
  });
}

export function buildChartColors(series: ServiceSeries[]): string[] {
  if (series.length === 0) {
    return [];
  }

  return series.map((item) => SERVICE_COLOR_MAP[item.serviceId] ?? "#94a3b8");
}

export function buildLegendItems(
  series: ServiceSeries[],
  colors: string[]
): { label: string; color: string }[] {
  if (series.length === 0) {
    return [];
  }

  return series.map((item, index) => ({
    label: item.name,
    color: colors[index] ?? "#94a3b8",
  }));
}
