export interface SiteServiceMetric {
  title: string;
  description: string;
}

export const siteServiceMetrics: Record<string, SiteServiceMetric[]> = {
  "paid-ads": [
    { title: "Impressions", description: "Total times ads were shown" },
    { title: "Reach", description: "Unique users who saw your ads" },
    { title: "Clicks", description: "Total number of clicks" },
    {
      title: "Click-Through Rate (CTR)",
      description: "Clicks divided by impressions",
    },
    {
      title: "Cost per Click (CPC)",
      description: "Average cost you pay per click",
    },
    { title: "Ad Spend", description: "Total campaign spend" },
  ],
  "cold-email": [
    {
      title: "Deliverability Rate",
      description: "Percent of emails that reach inboxes",
    },
    {
      title: "Open Rate",
      description: "Share of recipients who read the email",
    },
    { title: "Reply Rate", description: "Prospects who respond to a sequence" },
    {
      title: "Meetings Booked",
      description: "Conversations that turn into meetings",
    },
    { title: "Warm Leads", description: "Opportunities nurtured per week" },
    {
      title: "Bounce Rate",
      description: "Failed deliveries to monitor list health",
    },
  ],
  "social-media": [
    { title: "Reach", description: "People who see your content" },
    { title: "Engagement Rate", description: "Interactions per post" },
    { title: "Follower Growth", description: "Net new followers each month" },
    { title: "Click-Through Rate", description: "Traffic driven per campaign" },
    { title: "Share of Voice", description: "Brand mentions across channels" },
    { title: "Content Output", description: "Approved assets published" },
  ],
  "brand-content": [
    { title: "Content Velocity", description: "Assets shipped per sprint" },
    { title: "Approval Cycle", description: "Average hours to sign off" },
    {
      title: "Engagement Lift",
      description: "Increase in content interactions",
    },
    { title: "Brand Consistency", description: "Guideline adherence score" },
    {
      title: "Campaign Coverage",
      description: "Channels equipped with assets",
    },
    { title: "Audience Sentiment", description: "Positive reactions captured" },
  ],
  "linkedin-outreach": [
    {
      title: "Connection Accept Rate",
      description: "Invites that become connections",
    },
    { title: "Response Rate", description: "Prospects replying to sequences" },
    { title: "Meetings Set", description: "Discovery calls booked" },
    {
      title: "Pipeline Influenced",
      description: "Deals sourced from LinkedIn",
    },
    { title: "Persona Coverage", description: "Ideal buyer segments engaged" },
    { title: "InMail Deliverability", description: "Successful InMail sends" },
  ],
  "cold-calling": [
    { title: "Dials per Rep", description: "Average calls completed daily" },
    { title: "Connect Rate", description: "Live conversations per dial" },
    { title: "Qualified Meetings", description: "Sales-ready handoffs" },
    { title: "Voicemail Callbacks", description: "Responses from drops" },
    { title: "Objection Win Rate", description: "Blocks turned into advances" },
    { title: "Pipeline Added", description: "New opportunities sourced" },
  ],
  "ai-automation": [
    {
      title: "Automations Live",
      description: "Workflows deployed to production",
    },
    { title: "Manual Hours Saved", description: "Time removed from processes" },
    {
      title: "System Coverage",
      description: "Teams connected to orchestration",
    },
    { title: "Error Rate", description: "Failures per thousand runs" },
    {
      title: "SLA Compliance",
      description: "Automations meeting response targets",
    },
    { title: "User Adoption", description: "Teams actively using the bots" },
  ],
  "data-pipeline": [
    { title: "Pipelines Deployed", description: "Data jobs maintained" },
    { title: "Latency", description: "Minutes from source to warehouse" },
    { title: "Data Freshness", description: "Refresh cadence achieved" },
    { title: "Incident Rate", description: "Break-fix events per month" },
    {
      title: "Schema Coverage",
      description: "Systems modeled in the lakehouse",
    },
    { title: "Query Cost", description: "Spend per analytics workload" },
  ],
  "custom-dashboards": [
    { title: "Dashboards Published", description: "Live boards maintained" },
    { title: "Active Viewers", description: "Stakeholders using insights" },
    { title: "Alert Accuracy", description: "Signal-to-noise ratio" },
    {
      title: "Narrative Summaries",
      description: "AI-written briefs generated",
    },
    { title: "Exports Run", description: "PDF or CSV downloads" },
    {
      title: "Stakeholder Satisfaction",
      description: "Feedback from business teams",
    },
  ],
  "integration-lab": [
    { title: "Connectors Launched", description: "Integrations shipped" },
    {
      title: "Integration Success Rate",
      description: "Jobs completed without errors",
    },
    { title: "Security Reviews Passed", description: "Assessments cleared" },
    { title: "Change Requests", description: "Enhancements delivered" },
    { title: "Mean Time to Deploy", description: "Idea to production speed" },
    { title: "Support Tickets", description: "Issues resolved per month" },
  ],
  "devops-guard": [
    {
      title: "Policy Coverage",
      description: "Workflows protected by guardrails",
    },
    { title: "Drift Incidents", description: "Detected configuration drifts" },
    { title: "Rollback Time", description: "Minutes to recover services" },
    { title: "Resilience Tests", description: "Chaos or load tests executed" },
    { title: "On-call Alerts", description: "Actionable alerts per week" },
    { title: "Compliance Checks", description: "Controls validated" },
  ],
  "app-modernization": [
    { title: "Services Modernized", description: "Apps moved to modern stack" },
    { title: "Performance Gain", description: "Latency improvement" },
    { title: "Release Frequency", description: "Deploys per sprint" },
    { title: "Error Budget", description: "Availability consumed" },
    { title: "Security Findings", description: "Issues remediated" },
    { title: "User Satisfaction", description: "Product experience rating" },
  ],
};

export const fallbackServiceMetrics: SiteServiceMetric[] = [
  { title: "Milestones", description: "Key deliverables achieved" },
  { title: "Stakeholders", description: "Teams supported by the service" },
  { title: "Quality", description: "Defect or error rate observed" },
];
