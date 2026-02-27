import { ServiceInputShell } from "./service-input-shell";
import type { ServiceInputProps } from "./types";

export function BrandContentCreationStatisticsInput(props: ServiceInputProps) {
  return (
    <ServiceInputShell
      changeKey="brand_content_notes"
      description="Placeholder component for brand & content creation inputs. Wire content type, cadence, and assets fields later."
      title="Brand & Content Creation"
      {...props}
    />
  );
}
