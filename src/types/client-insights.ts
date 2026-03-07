export type InsightSeverity = "info" | "success" | "warning";

export interface ClientInsightItem {
  title: string;
  detail: string;
  severity: InsightSeverity;
}

export interface ClientInsightsResponse {
  insights: ClientInsightItem[];
}
