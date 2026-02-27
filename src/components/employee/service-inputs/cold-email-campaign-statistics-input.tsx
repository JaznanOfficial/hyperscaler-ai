import { ServiceInputShell } from "./service-input-shell";
import type { ServiceInputProps } from "./types";

export function ColdEmailCampaignStatisticsInput(props: ServiceInputProps) {
  return (
    <ServiceInputShell
      changeKey="cold_email_notes"
      description="Placeholder component for cold email campaign inputs. Connect real fields once the final UX is approved."
      title="Cold Email Campaign"
      {...props}
    />
  );
}
