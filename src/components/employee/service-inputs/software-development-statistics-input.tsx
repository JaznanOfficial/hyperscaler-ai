import { ServiceInputShell } from "./service-input-shell";
import type { ServiceInputProps } from "./types";

export function SoftwareDevelopmentStatisticsInput(props: ServiceInputProps) {
  return (
    <ServiceInputShell
      changeKey="software_development_notes"
      description="Placeholder component for software development inputs. Wire scope, tech stack, and milestone fields later."
      title="Software Development"
      {...props}
    />
  );
}
