"use client";

import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

async function createEmployee(data: any) {
  const response = await fetch("/api/admin/employees", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create employee");
  }

  return response.json();
}

export function CreateEmployeeDialog() {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "EMPLOYEE" as "EMPLOYEE" | "MANAGER",
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      toast.success("Employee created successfully");
      setFormData({ name: "", email: "", password: "", role: "EMPLOYEE" });
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    mutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Create employee profile</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Create employee profile</DialogTitle>
          <DialogDescription>
            Provide initial credentials and context for the new teammate.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="employee-name">Employee name</Label>
              <Input
                id="employee-name"
                placeholder="e.g. Nia Alvarez"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employee-email">Employee email</Label>
              <Input
                id="employee-email"
                placeholder="name@company.com"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="employee-password">Employee password</Label>
              <div className="relative">
                <Input
                  className="pr-10"
                  id="employee-password"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
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
              <p className="text-amber-600 text-xs">
                Remember this password—once encrypted, it can't be viewed again.
              </p>
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
              {mutation.isPending ? "Creating..." : "Create profile"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
