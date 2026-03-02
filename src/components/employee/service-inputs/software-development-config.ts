import type { ServiceInputProps } from "./types";

export const TEAM_STATUS_FIELDS: Array<{ id: string; label: string }> = [
  { id: "team_uiux_status", label: "UI/UX design" },
  { id: "team_frontend_status", label: "Frontend" },
  { id: "team_backend_status", label: "Backend" },
  { id: "team_qa_status", label: "QA & testing" },
];

export const TEAM_STATUS_OPTIONS = ["On track", "At risk", "Blocked"];

export const TASK_STATUS_OPTIONS = ["On-track", "Slightly Delayed", "Delayed"];
export const YES_NO_OPTIONS = ["Yes", "No"];

export const DAILY_UPDATE_FIELDS: Array<{
  id: string;
  label: string;
  suffix?: string;
}> = [
  { id: "features_implemented", label: "Features implemented" },
  { id: "bugs_opened", label: "Bugs opened" },
  { id: "bugs_closed", label: "Bugs closed" },
  { id: "uptime", label: "Uptime", suffix: "%" },
  { id: "test_coverage", label: "Test coverage", suffix: "%" },
];

export type ServiceInputComponentProps = ServiceInputProps;
