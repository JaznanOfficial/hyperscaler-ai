"use client";

import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { EmployeeItem } from "@/components/admin/employee-list";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

async function updateEmployee(id: string, data: any) {
  const response = await fetch(`/api/admin/employees/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update employee");
  }

  return response.json();
}

export type EditEmployeeDialogProps = {
  employee: EmployeeItem;
};

export function EditEmployeeDialog({ employee }: EditEmployeeDialogProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: employee.name,
    email: employee.email,
    password: "",
    role: employee.roleLevel === "manager" ? "MANAGER" : "EMPLOYEE",
    title: employee.title,
    expertise: employee.expertise,
    yearsExperience: employee.yearsExperience,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: any) => updateEmployee(employee.id, data),
    onSuccess: () => {
      toast.success("Employee updated successfully");
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updateData: any = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      generalInfo: {
        title: formData.title,
        expertise: formData.expertise,
        yearsExperience: formData.yearsExperience,
      },
    };

    if (formData.password) {
      updateData.password = formData.password;
    }

    mutation.mutate(updateData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" size="sm" variant="outline">
          Edit profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit employee profile</DialogTitle>
          <DialogDescription>
            Update profile details and access permissions.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`employee-name-${employee.id}`}>
                Employee name
              </Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                id={`employee-name-${employee.id}`}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`employee-email-${employee.id}`}>
                Employee email
              </Label>
              <Input
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                id={`employee-email-${employee.id}`}
                type="email"
                required
              />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`employee-password-${employee.id}`}>
                Reset password
              </Label>
              <div className="relative">
                <Input
                  className="pr-10"
                  id={`employee-password-${employee.id}`}
                  placeholder="New password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-2 flex cursor-pointer items-center text-slate-500 transition hover:text-slate-900"
                  onClick={() => setShowPassword((previous) => !previous)}
                  type="button"
                >
                  {showPassword ? (
                    <EyeClosed className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              <p className="text-slate-500 text-xs">
                Leave blank to keep the current password.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`employee-title-${employee.id}`}>
                Employee title
              </Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                id={`employee-title-${employee.id}`}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor={`employee-expertise-${employee.id}`}>
              Employee expertise lists
            </Label>
            <Textarea
              value={formData.expertise}
              onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
              id={`employee-expertise-${employee.id}`}
              placeholder="Summarize expertise areas"
              rows={3}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`employee-years-${employee.id}`}>
                Employee years of experiences
              </Label>
              <Input
                value={formData.yearsExperience}
                onChange={(e) => setFormData({ ...formData, yearsExperience: Number(e.target.value) })}
                id={`employee-years-${employee.id}`}
                min={0}
                placeholder="e.g. 6"
                type="number"
              />
            </div>
            <div className="space-y-2">
              <Label>Employee role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value as "EMPLOYEE" | "MANAGER" })}
              >
                <SelectTrigger className="cursor-pointer">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="cursor-pointer" value="MANAGER">
                    Manager
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="EMPLOYEE">
                    Employee
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button className="cursor-pointer" type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
