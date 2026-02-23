"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AssignServiceDialogProps {
  clientId: string;
  clientName: string;
}

interface Service {
  id: string;
  serviceName: string;
}

export function AssignServiceDialog({
  clientId,
  clientName,
}: AssignServiceDialogProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      fetch("/api/services")
        .then((res) => res.json())
        .then((data) => setServices(data.services || []))
        .catch(() => toast.error("Failed to load services"));
    }
  }, [open]);

  const handleAssign = async () => {
    if (!selectedServiceId) {
      toast.error("Please select a service");
      return;
    }

    setLoading(true);
    try {
      const url = `/api/admin/clients/${clientId}/assign-service`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId: selectedServiceId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to assign service");
      }

      toast.success("Service assigned successfully!");
      
      // Invalidate both admin client and client projects cache
      queryClient.invalidateQueries({ queryKey: ["admin-client", clientId] });
      queryClient.invalidateQueries({ queryKey: ["client-projects"] });
      
      setOpen(false);
      setSelectedServiceId("");
      router.refresh();
    } catch (error) {
      console.error("Assign error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to assign");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Assign Service
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Service to {clientName}</DialogTitle>
          <DialogDescription>
            Select a service to assign to this client. The service will appear
            in their subscriptions.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Service</Label>
            <Select
              onValueChange={setSelectedServiceId}
              value={selectedServiceId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.serviceName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            disabled={loading}
            onClick={() => setOpen(false)}
            variant="outline"
          >
            Cancel
          </Button>
          <Button disabled={loading} onClick={handleAssign}>
            {loading ? "Assigning..." : "Assign Service"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
