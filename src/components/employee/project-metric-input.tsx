import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export type ProjectMetricInputProps = {
  id: string;
  label: string;
  value?: string | boolean;
  type?: "input" | "textarea" | "boolean";
  onChange?: (value: string | boolean) => void;
};

export function ProjectMetricInput({
  id,
  label,
  value = "",
  type = "input",
  onChange,
}: ProjectMetricInputProps) {
  if (type === "boolean") {
    return (
      <label
        className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 p-4"
        htmlFor={id}
      >
        <span className="font-medium text-slate-900 text-sm">{label}</span>
        <Switch
          checked={value === true || value === "true"}
          id={id}
          onCheckedChange={(checked) => onChange?.(checked)}
        />
      </label>
    );
  }

  if (type === "textarea") {
    return (
      <label
        className="flex flex-col gap-2 text-slate-600 text-sm"
        htmlFor={id}
      >
        <span className="font-medium text-slate-900">{label}</span>
        <Textarea
          id={id}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="Enter value"
          rows={3}
          value={value as string}
        />
      </label>
    );
  }

  return (
    <label className="flex flex-col gap-2 text-slate-600 text-sm" htmlFor={id}>
      <span className="font-medium text-slate-900">{label}</span>
      <Input
        id={id}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="Enter value"
        value={value as string}
      />
    </label>
  );
}
