import { Input } from "@/components/ui/input";

export type ProjectMetricInputProps = {
  id: string;
  label: string;
};

export function ProjectMetricInput({ id, label }: ProjectMetricInputProps) {
  return (
    <label className="flex flex-col gap-2 text-slate-600 text-sm" htmlFor={id}>
      <span className="font-medium text-slate-900">{label}</span>
      <Input id={id} placeholder="Enter value" />
    </label>
  );
}
