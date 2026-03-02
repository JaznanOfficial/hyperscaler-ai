import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type ServiceInputComponentProps,
  TEAM_STATUS_FIELDS,
  TEAM_STATUS_OPTIONS,
} from "./software-development-config";

export function SoftwareDevelopmentTeamStatusCard({
  defaultValues,
  onChange,
}: ServiceInputComponentProps) {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="font-semibold text-slate-500 text-xs uppercase tracking-wide">
            Team status overview
          </p>
          <p className="text-slate-600 text-sm">
            Track how each pod is performing so blockers are visible early.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {TEAM_STATUS_FIELDS.map((team) => (
            <div className="space-y-1.5" key={team.id}>
              <Label className="font-medium text-slate-700 text-sm">
                {team.label} status
              </Label>
              <Select
                onValueChange={(value) => onChange?.(team.id, value)}
                value={(defaultValues?.[team.id] as string | undefined) ?? ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {TEAM_STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
