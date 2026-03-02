import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ServiceInputProps } from "./types";

const COMPLETION_OPTIONS = [
  "10%",
  "20%",
  "30%",
  "40%",
  "50%",
  "60%",
  "70%",
  "80%",
  "90%",
  "100%",
];

export function SoftwareDevelopmentGeneralCard({
  defaultValues,
  onChange,
}: ServiceInputProps) {
  const handleChange = (value: string) => {
    onChange?.("project_completion", value);
  };

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="font-semibold text-slate-500 text-xs uppercase tracking-wide">
            General
          </p>
          <p className="text-slate-600 text-sm">
            Quick snapshot of overall project progress.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="font-medium text-slate-700 text-sm">
              Overall project completion
            </Label>
            <div className="relative">
              <Input
                className="pr-10"
                inputMode="decimal"
                list="sd-completion-options"
                onChange={(event) => handleChange(event.target.value)}
                placeholder="0%"
                type="text"
                value={
                  (defaultValues?.project_completion as string | undefined) ??
                  ""
                }
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center font-semibold text-slate-500 text-xs">
                %
              </span>
              <datalist id="sd-completion-options">
                {COMPLETION_OPTIONS.map((option) => (
                  <option key={option} value={option} />
                ))}
              </datalist>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
