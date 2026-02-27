import { ServiceInputShell } from "./service-input-shell";
import type { ServiceInputProps } from "./types";

export function PaidAdsStatisticsInput(props: ServiceInputProps) {
  return (
    <ServiceInputShell
      changeKey="paid_ads_notes"
      description="Placeholder component for paid ads inputs. Connect real KPI, budget, and channel fields later."
      title="Paid Ads"
      {...props}
    />
  );
}
