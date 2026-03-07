type MetricHistoryRecord = {
  entryDate?: string;
  history?: Record<string, unknown> | null;
};

const WINDOW_SAMPLE_SIZE = 10;

const toComparableDate = (value?: string) => {
  if (!value) {
    return 0;
  }

  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? 0 : timestamp;
};

const normalizeHistory = (history?: Record<string, unknown> | null) => {
  if (!history || typeof history !== "object") {
    return {} as Record<string, unknown>;
  }

  return history;
};

const extractNumericMetrics = (history: Record<string, unknown>) => {
  const result: Record<string, number> = {};

  for (const [key, value] of Object.entries(history)) {
    if (typeof value === "number" && Number.isFinite(value)) {
      result[key] = value;
      continue;
    }

    if (typeof value === "string") {
      const parsed = Number.parseFloat(value);
      if (!Number.isNaN(parsed)) {
        result[key] = parsed;
      }
    }
  }

  return result;
};

const summarizeWindow = (records: MetricHistoryRecord[]) => {
  if (!records.length) {
    return null;
  }

  const sorted = [...records].sort(
    (a, b) => toComparableDate(b.entryDate) - toComparableDate(a.entryDate)
  );

  const normalized = sorted.map((record) => ({
    entryDate: record.entryDate ?? null,
    history: normalizeHistory(record.history),
  }));

  const totals: Record<string, number> = {};
  const counts: Record<string, number> = {};
  const latestValues: Record<string, number> = {};
  const earliestValues: Record<string, number> = {};

  normalized.forEach((record, index) => {
    const numericMetrics = extractNumericMetrics(
      record.history as Record<string, unknown>
    );

    for (const [key, value] of Object.entries(numericMetrics)) {
      totals[key] = (totals[key] ?? 0) + value;
      counts[key] = (counts[key] ?? 0) + 1;

      if (index === 0) {
        latestValues[key] = value;
      }

      if (index === normalized.length - 1) {
        earliestValues[key] = value;
      }
    }
  });

  const averages: Record<string, number> = {};
  const deltas: Record<string, number> = {};

  for (const [key, sum] of Object.entries(totals)) {
    const count = counts[key] ?? 1;
    averages[key] = Number.parseFloat((sum / count).toFixed(2));

    if (key in latestValues && key in earliestValues) {
      deltas[key] = Number.parseFloat(
        (latestValues[key] - earliestValues[key]).toFixed(2)
      );
    }
  }

  return {
    windowSize: normalized.length,
    startDate: normalized.at(-1)?.entryDate ?? null,
    endDate: normalized[0]?.entryDate ?? null,
    latestEntry: normalized[0]?.history ?? {},
    earliestEntry: normalized.at(-1)?.history ?? {},
    aggregates: {
      totals,
      averages,
      deltas,
    },
    sample: normalized.slice(0, WINDOW_SAMPLE_SIZE),
  } as Record<string, unknown>;
};

export const buildServiceInsightPayload = (
  records: MetricHistoryRecord[] | undefined,
  windowDays = 30
) => {
  if (!(records && records.length)) {
    return {
      summary: null,
      comparisonSummary: undefined,
    };
  }

  const sorted = [...records].sort(
    (a, b) => toComparableDate(b.entryDate) - toComparableDate(a.entryDate)
  );

  const currentWindow = sorted.slice(0, windowDays);
  const previousWindow = sorted.slice(windowDays, windowDays * 2);

  const summary = summarizeWindow(currentWindow);
  const comparisonSummary = summarizeWindow(previousWindow) ?? undefined;

  return {
    summary,
    comparisonSummary,
  };
};
