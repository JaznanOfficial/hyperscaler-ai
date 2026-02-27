import { ServiceInputShell } from "./service-input-shell";
import type { ServiceInputProps } from "./types";

export function SocialMediaMarketingStatisticsInput(props: ServiceInputProps) {
  return (
    <ServiceInputShell
      changeKey="social_media_notes"
      description="Placeholder component for social media marketing inputs. Hook up real editorial calendar fields later."
      title="Social Media Marketing"
      {...props}
    />
  );
}
