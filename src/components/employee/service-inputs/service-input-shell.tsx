import { Card } from "@/components/ui/card";
import type { ServiceInputProps } from "./types";

interface ServiceInputShellProps extends ServiceInputProps {
  title: string;
  description: string;
  changeKey: string;
}

export function ServiceInputShell({
  title,
  description,
  defaultValues,
  onChange,
  changeKey,
}: ServiceInputShellProps) {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="space-y-4">
        <div>
          <p className="text-slate-400 text-xs uppercase tracking-[0.3em]">
            Service
          </p>
          <p className="font-semibold text-2xl text-slate-900">{title}</p>
          <p className="text-slate-500 text-sm">{description}</p>
        </div>
        <pre className="rounded-lg bg-slate-50 p-3 text-slate-500 text-xs">
          {JSON.stringify(defaultValues ?? {}, null, 2)}
        </pre>
        <button
          className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white"
          onClick={() => onChange?.(changeKey, "pending")}
          type="button"
        >
          Trigger sample change
        </button>
      </div>
    </Card>
  );
}
