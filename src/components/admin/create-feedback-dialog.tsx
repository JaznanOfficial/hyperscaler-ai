"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

async function fetchEmployees() {
  const response = await fetch("/api/admin/employees");
  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }
  return response.json();
}

async function createFeedback(data: any) {
  const response = await fetch("/api/admin/feedbacks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create feedback");
  }

  return response.json();
}

export function CreateFeedbackDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    heading: "",
    details: "",
    employeeId: "",
    projectId: "default-project",
  });

  const queryClient = useQueryClient();

  const { data: employeesData } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  const mutation = useMutation({
    mutationFn: createFeedback,
    onSuccess: () => {
      toast.success("Feedback created successfully");
      setFormData({ heading: "", details: "", employeeId: "", projectId: "default-project" });
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["admin-feedbacks"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!formData.heading || !formData.details || !formData.employeeId) {
      toast.error("Please fill in all fields");
      return;
    }

    mutation.mutate(formData);
  };

  const employees = employeesData?.employees || [];

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Create feedback</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Create Feedback</DialogTitle>
          <DialogDescription>
            Send feedback to an employee about their work.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="feedback-heading">Heading</Label>
            <Input
              id="feedback-heading"
              onChange={(event) => setFormData({ ...formData, heading: event.target.value })}
              placeholder="e.g. Great work on the project"
              value={formData.heading}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="feedback-details">Details</Label>
            <Textarea
              id="feedback-details"
              onChange={(event) => setFormData({ ...formData, details: event.target.value })}
              placeholder="Add detailed feedback..."
              rows={4}
              value={formData.details}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Select Employee</Label>
            <Select
              value={formData.employeeId}
              onValueChange={(value) => setFormData({ ...formData, employeeId: value })}
            >
              <SelectTrigger className="cursor-pointer">
                <SelectValue placeholder="Choose an employee" />
              </SelectTrigger>
              <SelectContent>
                {employees.map((emp: any) => (
                  <SelectItem key={emp.id} value={emp.id} className="cursor-pointer">
                    {emp.name} ({emp.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              className="cursor-pointer"
              disabled={mutation.isPending}
              type="submit"
            >
              {mutation.isPending ? "Creating..." : "Create Feedback"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
