"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const GENERAL_SERVICE_ID = "GENERAL";

const initialForm = {
  overallProgress: "",
  activeServices: "",
  onTrackServices: "",
  needsAttentionServices: "",
  timeSaved: "",
};

const mapHistoryToForm = (history?: Record<string, string>) => ({
  overallProgress: history?.overall_progress || "",
  activeServices: history?.active_services || "",
  onTrackServices: history?.on_track_services || "",
  needsAttentionServices: history?.needs_attention_services || "",
  timeSaved: history?.time_saved_due_to_ai || "",
});

const buildHistoryPayload = (form: typeof initialForm) => ({
  overall_progress: form.overallProgress || null,
  active_services: form.activeServices || null,
  on_track_services: form.onTrackServices || null,
  needs_attention_services: form.needsAttentionServices || null,
  time_saved_due_to_ai: form.timeSaved || null,
});

async function fetchGeneralMetrics(
  clientId: string,
  signal: AbortSignal
): Promise<{
  id: string;
  history: Record<string, string> | undefined;
} | null> {
  const response = await fetch(
    `/api/employee/metrics/get?clientId=${clientId}&serviceId=${GENERAL_SERVICE_ID}&metricId=${GENERAL_SERVICE_ID}`,
    { signal }
  );

  if (!response.ok) {
    throw new Error("Failed to load general metrics");
  }

  const data = await response.json();
  const historyRecord = data.metricHistories?.[0];

  if (!historyRecord) {
    return null;
  }

  return {
    id: historyRecord.id as string,
    history: (historyRecord.history || {}) as Record<string, string>,
  };
}

type FormKey = keyof typeof initialForm;

interface GeneralMetricsDialogProps {
  clientId: string;
}

export function GeneralMetricsDialog({ clientId }: GeneralMetricsDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [metricId, setMetricId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!(open && clientId)) {
      return undefined;
    }

    const controller = new AbortController();
    setIsLoading(true);

    fetchGeneralMetrics(clientId, controller.signal)
      .then((result) => {
        if (controller.signal.aborted) {
          return;
        }

        if (!result) {
          setMetricId(null);
          setFormData({ ...initialForm });
          return;
        }

        setMetricId(result.id);
        setFormData(mapHistoryToForm(result.history));
      })
      .catch((error) => {
        if (controller.signal.aborted) {
          return;
        }
        console.error(error);
        toast.error("Unable to load general metrics");
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [open, clientId]);

  const handleChange =
    (field: FormKey) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const method = metricId ? "PUT" : "POST";
      const url = metricId
        ? `/api/employee/metrics/${metricId}`
        : "/api/employee/metrics";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId,
          serviceId: GENERAL_SERVICE_ID,
          entryDate: new Date().toISOString(),
          history: buildHistoryPayload(formData),
          ...(metricId ? {} : { id: GENERAL_SERVICE_ID }),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save metrics");
      }

      const data = await response.json();
      if (!metricId && data.metricHistory) {
        setMetricId(data.metricHistory.id);
      }

      toast.success(
        metricId ? "General metrics updated" : "General metrics saved"
      );
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Unable to save metrics");
    } finally {
      setIsSaving(false);
    }
  };

  let primaryLabel = "Save";
  if (metricId) {
    primaryLabel = "Update";
  }
  if (isSaving) {
    primaryLabel = "Saving...";
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button className={"rounded-full px-4"} size="sm" variant={"gradient"}>
          General
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>General Metrics</DialogTitle>
          <DialogDescription>
            Capture high-level stats like the overall progress and service
            breakdown.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="overall-progress">Overall progress</Label>
            <Input
              disabled={isLoading}
              id="overall-progress"
              onChange={handleChange("overallProgress")}
              placeholder="e.g. 73%"
              value={formData.overallProgress}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="active-services">Active services</Label>
              <Input
                disabled={isLoading}
                id="active-services"
                onChange={handleChange("activeServices")}
                placeholder="e.g. 3"
                value={formData.activeServices}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="on-track">On-track services</Label>
              <Input
                disabled={isLoading}
                id="on-track"
                onChange={handleChange("onTrackServices")}
                placeholder="e.g. 1"
                value={formData.onTrackServices}
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="needs-attention">Needs attention services</Label>
              <Input
                disabled={isLoading}
                id="needs-attention"
                onChange={handleChange("needsAttentionServices")}
                placeholder="e.g. 2"
                value={formData.needsAttentionServices}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time-saved">Time saved due to AI</Label>
              <Input
                disabled={isLoading}
                id="time-saved"
                onChange={handleChange("timeSaved")}
                placeholder="e.g. 28 hrs/week"
                value={formData.timeSaved}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button onClick={() => setOpen(false)} type="button" variant="ghost">
            Cancel
          </Button>
          <Button
            className="bg-slate-900 text-white hover:bg-slate-800"
            disabled={isSaving || isLoading}
            onClick={handleSave}
            type="button"
          >
            {primaryLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
