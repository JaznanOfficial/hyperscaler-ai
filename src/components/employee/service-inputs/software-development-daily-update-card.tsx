import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DAILY_UPDATE_FIELDS,
  type ServiceInputComponentProps,
} from "./software-development-config";

export function SoftwareDevelopmentDailyUpdateCard({
  defaultValues,
  onChange,
}: ServiceInputComponentProps) {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="font-semibold text-slate-500 text-xs uppercase tracking-wide">
            Daily update
          </p>
          <p className="text-slate-600 text-sm">
            Log today's shipped work, incidents, and coverage metrics.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {DAILY_UPDATE_FIELDS.map((field) => (
            <div className="space-y-1.5" key={field.id}>
              <Label className="font-medium text-slate-700 text-sm">
                {field.label}
              </Label>
              <div className="relative">
                <Input
                  className={field.suffix ? "pr-10" : undefined}
                  inputMode="decimal"
                  onChange={(event) => onChange?.(field.id, event.target.value)}
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
      </div>
    </Card>
  );
}
