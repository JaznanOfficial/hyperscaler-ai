"use client";

import { Check, Users2, X } from "lucide-react";
import { useMemo, useState } from "react";
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { employeeDirectory } from "@/data/clients";
import { cn } from "@/lib/utils";

export function CreateFeedbackDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const employees = useMemo(
    () => [...employeeDirectory].sort((a, b) => a.localeCompare(b)),
    []
  );

  const toggleEmployee = (employee: string) => {
    setSelectedEmployees((previous) =>
      previous.includes(employee)
        ? previous.filter((name) => name !== employee)
        : [...previous, employee]
    );
  };

  const removeEmployee = (employee: string) => {
    setSelectedEmployees((previous) =>
      previous.filter((name) => name !== employee)
    );
  };

  const resetForm = () => {
    setTitle("");
    setDetails("");
    setSelectedEmployees([]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Feedback logged", {
      description: "We captured your notes for the selected teammates.",
    });
    resetForm();
    setOpen(false);
  };

  const selectedLabel = selectedEmployees.length
    ? `${selectedEmployees.length} teammate${selectedEmployees.length > 1 ? "s" : ""} selected`
    : "Select employees";

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Create feedback</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Log pod feedback</DialogTitle>
          <DialogDescription>
            Capture escalations or kudos and notify the right Hyperscaler crew.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="feedback-title">Title</Label>
            <Input
              id="feedback-title"
              onChange={(event) => setTitle(event.currentTarget.value)}
              placeholder="e.g. Async standups unlocked blockers"
              value={title}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="feedback-details">Feedback details</Label>
            <Textarea
              id="feedback-details"
              onChange={(event) => setDetails(event.currentTarget.value)}
              placeholder="Add context, links, or requests for this feedback"
              rows={4}
              value={details}
            />
          </div>
          <div className="space-y-3">
            <Label>Assign employees</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="w-full justify-between gap-2 truncate border border-slate-200 bg-white text-left font-normal text-slate-600 hover:bg-slate-50"
                  type="button"
                  variant="outline"
                >
                  <span className="flex items-center gap-2 truncate">
                    <Users2 className="size-4 text-slate-400" />
                    <span className="truncate">{selectedLabel}</span>
                  </span>
                  <Check aria-hidden className="invisible size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-72">
                <DropdownMenuLabel>Available teammates</DropdownMenuLabel>
                <DropdownMenuGroup className="max-h-64 overflow-y-auto">
                  {employees.map((employee) => (
                    <DropdownMenuCheckboxItem
                      checked={selectedEmployees.includes(employee)}
                      className="cursor-pointer"
                      key={employee}
                      onCheckedChange={() => toggleEmployee(employee)}
                      onSelect={(event) => event.preventDefault()}
                    >
                      {employee}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <div className="px-2 py-1 text-muted-foreground text-xs">
                  You can assign multiple employees at once.
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            {selectedEmployees.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedEmployees.map((employee) => (
                  <button
                    className={cn(
                      "flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700 text-xs",
                      "transition hover:bg-slate-200"
                    )}
                    key={employee}
                    onClick={() => removeEmployee(employee)}
                    type="button"
                  >
                    {employee}
                    <X aria-hidden className="size-3.5" />
                    <span className="sr-only">Remove {employee}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              className="cursor-pointer"
              disabled={
                !(title.trim() && details.trim()) ||
                selectedEmployees.length === 0
              }
              type="submit"
            >
              Submit feedback
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
