"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { type FixedServiceId, listFixedServices } from "@/data/fixed-services";
import { cn } from "@/lib/utils";

interface AssignServiceDialogProps {
  clientId: string;
  clientName: string;
  assignedServiceIds?: FixedServiceId[];
}

export function AssignServiceDialog({
  clientId,
  clientName,
  assignedServiceIds = [],
}: AssignServiceDialogProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const services = useMemo(() => listFixedServices(), []);
  const [selectedServiceIds, setSelectedServiceIds] = useState<
    FixedServiceId[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [servicePickerOpen, setServicePickerOpen] = useState(false);

  const assignedIdSet = useMemo(
    () => new Set<FixedServiceId>(assignedServiceIds),
    [assignedServiceIds]
  );

  const availableServices = useMemo(
    () =>
      services.map((service) => ({
        ...service,
        isAssigned: assignedIdSet.has(service.id),
      })),
    [services, assignedIdSet]
  );

  const toggleService = (serviceId: FixedServiceId) => {
    if (assignedIdSet.has(serviceId)) {
      return;
    }
    setSelectedServiceIds((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleRemoveChip = (
    event: React.MouseEvent<HTMLButtonElement>,
    serviceId: FixedServiceId
  ) => {
    event.stopPropagation();
    toggleService(serviceId);
  };

  const handleAssign = async () => {
    if (!selectedServiceIds.length) {
      toast.error("Please select at least one service");
      return;
    }

    setLoading(true);
    try {
      const url = `/api/admin/clients/${clientId}/assign-service`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceIds: selectedServiceIds }),
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
      setServicePickerOpen(false);
      setSelectedServiceIds([]);
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
            <Label>Services</Label>
            <Popover
              onOpenChange={setServicePickerOpen}
              open={servicePickerOpen}
            >
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    "flex min-h-12 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-sm shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/50 dark:border-slate-700 dark:bg-slate-900/40",
                    !selectedServiceIds.length && "text-slate-500"
                  )}
                  type="button"
                >
                  {selectedServiceIds.length ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedServiceIds.map((serviceId) => {
                        const service = services.find(
                          (s) => s.id === serviceId
                        );
                        return (
                          <Badge
                            className="flex items-center gap-1 rounded-full px-3 py-1 text-xs"
                            key={serviceId}
                            variant="secondary"
                          >
                            {service?.title}
                            <button
                              aria-label="Remove service"
                              className="text-slate-500 transition hover:text-slate-900"
                              onClick={(event) =>
                                handleRemoveChip(event, serviceId)
                              }
                              type="button"
                            >
                              <X className="size-3" />
                            </button>
                          </Badge>
                        );
                      })}
                    </div>
                  ) : (
                    <span>Select services</span>
                  )}
                  <ChevronsUpDown className="ml-auto size-4 shrink-0 text-slate-400" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="w-[--radix-popover-trigger-width] p-0"
              >
                <Command>
                  <CommandInput placeholder="Search services..." />
                  <CommandEmpty>No services found.</CommandEmpty>
                  <CommandGroup>
                    {availableServices.map((service) => {
                      const isSelected = selectedServiceIds.includes(
                        service.id
                      );
                      const isAssigned = service.isAssigned;
                      const showCheck = isSelected || isAssigned;
                      return (
                        <CommandItem
                          aria-disabled={isAssigned}
                          data-state={isAssigned ? "assigned" : undefined}
                          disabled={isAssigned}
                          key={service.id}
                          onSelect={() => toggleService(service.id)}
                          value={service.title}
                        >
                          <Check
                            className={cn(
                              "mr-2 size-4",
                              showCheck ? "opacity-100" : "opacity-0",
                              isAssigned ? "text-emerald-600" : undefined
                            )}
                          />
                          <span className="flex flex-1 items-center justify-between gap-2">
                            {service.title}
                            {isAssigned && (
                              <Badge
                                className="rounded-full bg-emerald-100 text-emerald-700 text-xs"
                                variant="outline"
                              >
                                Assigned
                              </Badge>
                            )}
                          </span>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
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
