import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  TASK_STATUS_OPTIONS,
  YES_NO_OPTIONS,
} from "./software-development-config";

const SECTIONS: Array<{
  id: string;
  title: string;
  fields: Array<
    | {
        id: string;
        label: string;
        type?: "number" | "text";
        placeholder?: string;
        suffix?: string;
      }
    | {
        id: string;
        label: string;
        type: "select";
        options: string[];
        placeholder?: string;
      }
  >;
}> = [
  {
    id: "uiux",
    title: "UI/UX design",
    fields: [
      {
        id: "uiux_task_status",
        label: "Task status",
        type: "select",
        options: TASK_STATUS_OPTIONS,
        placeholder: "Select status",
      },
      {
        id: "uiux_screen_worked_on",
        label: "Screen worked on",
        placeholder: "eg. Onboarding flow",
      },
      {
        id: "uiux_screen_approved",
        label: "Screen approved",
        placeholder: "eg. Pricing v2",
      },
      {
        id: "uiux_time_spent",
        label: "Time spent (hrs)",
        type: "number",
        placeholder: "0",
      },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    fields: [
      {
        id: "frontend_task_status",
        label: "Task status",
        type: "select",
        options: TASK_STATUS_OPTIONS,
        placeholder: "Select status",
      },
      {
        id: "frontend_features_worked_on",
        label: "Features worked on",
        placeholder: "eg. Billing portal",
      },
      {
        id: "frontend_features_completed",
        label: "Features completed",
        type: "number",
        placeholder: "0",
      },
      {
        id: "frontend_bugs_found",
        label: "Bugs found",
        type: "number",
        placeholder: "0",
      },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    fields: [
      {
        id: "backend_task_status",
        label: "Task status",
        type: "select",
        options: TASK_STATUS_OPTIONS,
        placeholder: "Select status",
      },
      {
        id: "backend_apis_worked_on",
        label: "APIs worked on",
        placeholder: "eg. Subscription webhook",
      },
      {
        id: "backend_apis_completed",
        label: "APIs completed",
        type: "number",
        placeholder: "0",
      },
      {
        id: "backend_deployment_done",
        label: "Deployment done",
        type: "select",
        options: YES_NO_OPTIONS,
        placeholder: "Yes or No",
      },
      {
        id: "backend_time_spent",
        label: "Time spent (hrs)",
        type: "number",
        placeholder: "0",
      },
    ],
  },
  {
    id: "qa",
    title: "QA & testing",
    fields: [
      {
        id: "qa_test_cases_executed",
        label: "Test cases executed",
        type: "number",
        placeholder: "0",
      },
      {
        id: "qa_test_cases_passed",
        label: "Test cases passed",
        type: "number",
        placeholder: "0",
      },
      {
        id: "qa_new_bugs_logged",
        label: "New bugs logged",
        type: "number",
        placeholder: "0",
      },
      {
        id: "qa_bugs_closed",
        label: "Bugs closed",
        type: "number",
        placeholder: "0",
      },
    ],
  },
];

export function SoftwareDevelopmentDailyTeamUpdateCard({
  defaultValues,
  onChange,
}: ServiceInputComponentProps) {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="space-y-5">
        <div className="space-y-2">
          <p className="font-semibold text-slate-500 text-xs uppercase tracking-wide">
            Daily team update
          </p>
          <p className="text-slate-600 text-sm">
            Capture what each squad shipped today, plus blockers or extra
            effort.
          </p>
        </div>

        <div className="space-y-6">
          {SECTIONS.map((section) => (
            <section className="space-y-3" key={section.id}>
              <p className="font-semibold text-slate-800 text-sm">
                {section.title}
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {section.fields.map((field) => (
                  <div className="space-y-1.5" key={field.id}>
                    <Label className="font-medium text-slate-700 text-sm">
                      {field.label}
                    </Label>
                    {field.type === "select" && "options" in field ? (
                      <Select
                        onValueChange={(value) => onChange?.(field.id, value)}
                        value={
                          (defaultValues?.[field.id] as string | undefined) ??
                          ""
                        }
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={field.placeholder ?? "Select"}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        inputMode={
                          field.type === "number" ? "decimal" : undefined
                        }
                        onChange={(event) =>
                          onChange?.(field.id, event.target.value)
                        }
                        placeholder={field.placeholder}
                        value={
                          (defaultValues?.[field.id] as string | undefined) ??
                          ""
                        }
                      />
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Card>
  );
}
