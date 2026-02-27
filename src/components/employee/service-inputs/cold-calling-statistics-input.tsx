import { ServiceInputShell } from "./service-input-shell";
import type { ServiceInputProps } from "./types";

export function ColdCallingStatisticsInput(props: ServiceInputProps) {
  return (
    <ServiceInputShell
      changeKey="cold_calling_notes"
      description="Placeholder component for cold calling inputs. Wire scripts, targets, and recordings toggles later."
      title="Cold Calling"
      {...props}
    />
  );
}
