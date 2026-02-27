import { ServiceInputShell } from "./service-input-shell";
import type { ServiceInputProps } from "./types";

export function LinkedinOutreachStatisticsInput(props: ServiceInputProps) {
  return (
    <ServiceInputShell
      changeKey="linkedin_outreach_notes"
      description="Placeholder component for LinkedIn outreach inputs. Hook primary persona, connection goals, and scripts later."
      title="Cold LinkedIn Outreach"
      {...props}
    />
  );
}
