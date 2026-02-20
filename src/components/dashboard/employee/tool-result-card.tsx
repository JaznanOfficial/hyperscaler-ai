import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formatToolPayload = (result: unknown) => {
  try {
    return JSON.stringify(result ?? null, null, 2) ?? "";
  } catch {
    return String(result ?? "");
  }
};

export function EmployeeToolResultCard({
  toolName,
  result,
}: {
  toolName: string;
  result: unknown;
}) {
  const payload = formatToolPayload(result);

  return (
    <Card className="border border-slate-200/70 bg-white/80 shadow-none">
      <CardHeader className="border-slate-100 border-b py-3">
        <CardTitle className="font-semibold text-slate-500 text-xs uppercase tracking-wide">
          Tool result: {toolName}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-3">
        <pre className="wrap-break-word whitespace-pre-wrap text-slate-700 text-xs leading-relaxed">
          {payload}
        </pre>
      </CardContent>
    </Card>
  );
}
