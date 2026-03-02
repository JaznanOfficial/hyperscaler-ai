import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ServiceInputProps } from "./types";

const FIELDS: Array<{ id: string; label: string; suffix?: string }> = [
  { id: "emails_sent", label: "Emails sent" },
  { id: "open_rate", label: "Open rate", suffix: "%" },
  { id: "reply_rate", label: "Reply rate", suffix: "%" },
  { id: "positive_response_rate", label: "Positive response", suffix: "%" },
  { id: "negative_response_rate", label: "Negative response", suffix: "%" },
  { id: "bounce_rate", label: "Bounce rate", suffix: "%" },
  { id: "conversion_rate", label: "Conversion rate", suffix: "%" },
  { id: "spam_rate", label: "Spam rate", suffix: "%" },
];

export function ColdEmailCampaignStatisticsInput({
  defaultValues,
  onChange,
}: ServiceInputProps) {
  const handleChange = (fieldId: string) => (value: string) => {
    onChange?.(fieldId, value);
  };

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          {FIELDS.map((field) => (
            <div className="space-y-1.5" key={field.id}>
              <Label className="font-medium text-slate-700 text-sm">
                {field.label}
              </Label>
              <div className="relative">
                <Input
                  className={field.suffix ? "pr-10" : undefined}
                  inputMode="decimal"
                  onChange={(event) =>
                    handleChange(field.id)(event.target.value)
                  }
                  placeholder={field.suffix ? `0${field.suffix}` : "0"}
                  type="text"
                  value={
                    (defaultValues?.[field.id] as string | undefined) ?? ""
                  }
                />
                {field.suffix && (
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center font-semibold text-slate-500 text-xs">
                    {field.suffix}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <Button className="min-w-[140px]" size="lg" type="button">
            Save metrics
          </Button>
        </div>
      </div>
    </Card>
  );
}
