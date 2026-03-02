import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ServiceInputProps } from "./types";

const BASE_FIELDS: Array<{
  id: string;
  label: string;
  suffix?: string;
  prefix?: string;
}> = [
  { id: "impressions", label: "Impressions" },
  { id: "clicks", label: "Clicks" },
  { id: "reach", label: "Reach" },
  { id: "cpc", label: "Cost per click (CPC)", prefix: "$" },
  { id: "cpl", label: "Cost per lead (CPL)", prefix: "$" },
  { id: "ctr", label: "Click-through rate (CTR)", suffix: "%" },
  { id: "conversion_rate", label: "Conversion rate", suffix: "%" },
  { id: "costs", label: "Costs", prefix: "$" },
];

const CHANNELS = [
  { id: "meta", title: "Meta Ads" },
  { id: "google", title: "Google Ads" },
];

export function PaidAdsStatisticsInput({
  defaultValues,
  onChange,
}: ServiceInputProps) {
  const getValue = (channelId: string, fieldId: string) =>
    (defaultValues?.[`${channelId}_${fieldId}`] as string | undefined) ?? "";

  const handleChange =
    (channelId: string, fieldId: string) => (value: string) => {
      onChange?.(`${channelId}_${fieldId}`, value);
    };

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="space-y-8">
        <div className="space-y-1">
          <p className="text-slate-400 text-xs uppercase tracking-[0.3em]">
            Paid ads overview
          </p>
          <p className="font-semibold text-2xl text-slate-900">
            Meta & Google performance snapshot
          </p>
          <p className="text-slate-500 text-sm">
            Capture the latest acquisition metrics per channel before
            submitting.
          </p>
        </div>

        <div className="grid gap-6">
          {CHANNELS.map((channel) => (
            <div
              className="space-y-4 rounded-xl border border-slate-100 p-4"
              key={channel.id}
            >
              <div>
                <p className="font-semibold text-slate-900 text-sm">
                  {channel.title}
                </p>
                <p className="text-slate-500 text-xs">
                  Enter this week&apos;s delivery, engagement, and cost figures.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {BASE_FIELDS.map((field) => (
                  <div
                    className="space-y-1.5"
                    key={`${channel.id}_${field.id}`}
                  >
                    <Label className="font-medium text-slate-700 text-sm">
                      {field.label}
                    </Label>
                    <div className="relative">
                      {field.prefix && (
                        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center font-semibold text-slate-500 text-xs">
                          {field.prefix}
                        </span>
                      )}
                      <Input
                        className={(() => {
                          if (field.prefix && field.suffix) {
                            return "pr-10 pl-8";
                          }
                          if (field.prefix) {
                            return "pl-8";
                          }
                          if (field.suffix) {
                            return "pr-10";
                          }
                          return undefined;
                        })()}
                        inputMode="decimal"
                        onChange={(event) =>
                          handleChange(channel.id, field.id)(event.target.value)
                        }
                        placeholder={(() => {
                          if (field.prefix) {
                            return `${field.prefix}0`;
                          }
                          if (field.suffix) {
                            return `0${field.suffix}`;
                          }
                          return "0";
                        })()}
                        type="text"
                        value={getValue(channel.id, field.id)}
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
