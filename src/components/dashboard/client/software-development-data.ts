import {
  AlertTriangle,
  Brush,
  MonitorSmartphone,
  ServerCog,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export const completionPercent = 50;

export const teamStatuses = [
  {
    label: "UI/UX Design",
    status: "On Track",
    icon: Brush,
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-700",
  },
  {
    label: "Frontend",
    status: "Blocked",
    icon: MonitorSmartphone,
    badgeBg: "bg-rose-100",
    badgeText: "text-rose-700",
  },
  {
    label: "Backend",
    status: "At Risk",
    icon: ServerCog,
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-700",
  },
  {
    label: "QA & Testing",
    status: "On Track",
    icon: ShieldCheck,
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-700",
  },
] as const;

export const softwareClickRateData = [
  { name: "Clicked", value: 46, color: "#147638" },
  { name: "Not Clicked", value: 54, color: "#979CA3" },
] as const;

export const summaryMetrics = [
  { label: "Features This Week", value: "12" },
  { label: "Bugs Closed", value: "23" },
  { label: "Uptime", value: "99.8%" },
  { label: "Test Coverage", value: "87%" },
] as const;

export const featuresLegend = [
  { label: "Delivered", color: "#1E92FF" },
  { label: "Planned", color: "#A5D3FF" },
] as const;

export const bugLegend = [
  { label: "Opened", color: "#ef4444" },
  { label: "Closed", color: "#22c55e" },
] as const;

export const projectTimeline = [
  {
    phase: "Design Phase",
    date: "Jan 5",
    pillBg: "bg-emerald-50",
    pillDot: "bg-emerald-500",
    pillText: "text-emerald-700",
    label: "Completed",
  },
  {
    phase: "Development Phase",
    date: "Jan 12",
    pillBg: "bg-violet-50",
    pillDot: "bg-violet-500",
    pillText: "text-violet-700",
    label: "In Progress",
  },
  {
    phase: "Beta Testing",
    date: "Jan 21",
    pillBg: "bg-slate-100",
    pillDot: "bg-slate-300",
    pillText: "text-slate-500",
    label: "Upcoming",
  },
  {
    phase: "Production Deploy",
    date: "Jan 28",
    pillBg: "bg-slate-100",
    pillDot: "bg-slate-300",
    pillText: "text-slate-500",
    label: "Upcoming",
  },
] as const;

export const blockers = [
  {
    title: "Frontend Development",
    riskLabel: "Medium Risk",
    riskBg: "bg-amber-50",
    riskDot: "bg-amber-500",
    riskText: "text-amber-700",
    description: "Waiting for API specs",
    waitingOn: "Backend Team",
  },
  {
    title: "Design",
    riskLabel: "Low Risk",
    riskBg: "bg-emerald-50",
    riskDot: "bg-emerald-500",
    riskText: "text-emerald-700",
    description: "Content structuring pending",
    waitingOn: "Content Writer",
  },
] as const;

export const softwareInsights = [
  {
    label: "User engagement metrics",
    detail: "75% Active user retention rate",
    icon: TrendingUp,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    detailColor: "text-emerald-600",
  },
  {
    label: "Feature adoption rate",
    detail: "40% of users utilize new features",
    icon: AlertTriangle,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    detailColor: "text-amber-600",
  },
  {
    label: "Bug resolution time",
    detail: "Average of 3.5 days to resolve critical bugs",
    icon: ServerCog,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    detailColor: "text-emerald-600",
  },
  {
    label: "Customer satisfaction score",
    detail: "4.8 out of 5 average rating",
    icon: ShieldCheck,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
    detailColor: "text-sky-600",
  },
] as const;
