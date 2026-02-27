"use client";

import { Check, ChevronsUpDown, UserPlus, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface AssignEmployeesPopoverProps {
  serviceName: string;
  employees: Array<{ id: string; name: string }>;
  assignedEmployeeIds: string[];
  onAssign: (nextEmployeeIds: string[]) => Promise<boolean>;
}

export function AssignEmployeesPopover({
  serviceName,
  employees,
  assignedEmployeeIds,
  onAssign,
}: AssignEmployeesPopoverProps) {
  const [open, setOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedEmployeeIds, setSelectedEmployeeIds] =
    useState<string[]>(assignedEmployeeIds);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSelectedEmployeeIds(assignedEmployeeIds);
  }, [assignedEmployeeIds]);

  const employeesById = useMemo(() => {
    return new Map(employees.map((employee) => [employee.id, employee.name]));
  }, [employees]);

  const toggleEmployee = (employeeId: string) => {
    setSelectedEmployeeIds((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleRemoveChip = (
    event: React.MouseEvent<HTMLButtonElement>,
    employeeId: string
  ) => {
    event.stopPropagation();
    toggleEmployee(employeeId);
  };

  const handleAssign = async () => {
    if (employees.length === 0) {
      return;
    }

    setLoading(true);
    const success = await onAssign(selectedEmployeeIds);
    setLoading(false);

    if (success) {
      setOpen(false);
      setPickerOpen(false);
    }
  };

  const selectedEmployees = selectedEmployeeIds.map((employeeId) => ({
    id: employeeId,
    name: employeesById.get(employeeId) || "Unknown",
  }));

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button className="gap-2" size="sm" variant="outline">
          <UserPlus className="size-4" /> Assign employees
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-80 p-0" sideOffset={8}>
        <div className="space-y-4 p-4">
          <div>
            <p className="font-semibold text-slate-900 text-sm">
              Assign employees to {serviceName}
            </p>
            <p className="text-slate-500 text-xs">
              Select one or more employees to collaborate on this service.
            </p>
          </div>

          <button
            className={cn(
              "flex min-h-12 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-sm shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/50 disabled:opacity-60 dark:border-slate-800",
              !selectedEmployeeIds.length && "text-slate-500"
            )}
            disabled={!employees.length}
            onClick={() => setPickerOpen((prev) => !prev)}
            type="button"
          >
            {selectedEmployeeIds.length ? (
              <div className="flex flex-wrap gap-2">
                {selectedEmployees.map((employee) => (
                  <Badge
                    className="flex items-center gap-1 rounded-full px-3 py-1 text-xs"
                    key={employee.id}
                    variant="secondary"
                  >
                    {employee.name}
                    <button
                      aria-label="Remove employee"
                      className="text-slate-500 transition hover:text-slate-900"
                      disabled={loading}
                      onClick={(event) => handleRemoveChip(event, employee.id)}
                      type="button"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            ) : (
              <span>Select employees</span>
            )}
            <ChevronsUpDown className="ml-auto size-4 shrink-0 text-slate-400" />
          </button>

          {pickerOpen && (
            <div className="rounded-xl border border-slate-200">
              {employees.length === 0 ? (
                <p className="px-4 py-6 text-center text-slate-500 text-sm">
                  No employees found.
                </p>
              ) : (
                <Command>
                  <CommandInput placeholder="Search employees..." />
                  <CommandEmpty>No employees found.</CommandEmpty>
                  <CommandGroup>
                    {employees.map((employee) => {
                      const isSelected = selectedEmployeeIds.includes(
                        employee.id
                      );
                      return (
                        <CommandItem
                          key={employee.id}
                          onSelect={() => toggleEmployee(employee.id)}
                        >
                          <Check
                            className={cn(
                              "mr-2 size-4",
                              isSelected ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {employee.name}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </Command>
              )}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button
              onClick={() => {
                setOpen(false);
                setPickerOpen(false);
              }}
              size="sm"
              variant="ghost"
            >
              Cancel
            </Button>
            <Button
              disabled={loading || employees.length === 0}
              onClick={handleAssign}
              size="sm"
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
