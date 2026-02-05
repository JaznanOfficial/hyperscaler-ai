"use client";

import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
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

export type EditEmployeeDialogProps = {
  employee: EmployeeItem;
};

export function EditEmployeeDialog({ employee }: EditEmployeeDialogProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Dialog>
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
        <form
          className="space-y-4"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`employee-name-${employee.id}`}>
                Employee name
              </Label>
              <Input
                defaultValue={employee.name}
                id={`employee-name-${employee.id}`}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`employee-email-${employee.id}`}>
                Employee email
              </Label>
              <Input
                defaultValue={employee.email}
                id={`employee-email-${employee.id}`}
                type="email"
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
                defaultValue={employee.title}
                id={`employee-title-${employee.id}`}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor={`employee-expertise-${employee.id}`}>
              Employee expertise lists
            </Label>
            <Textarea
              defaultValue={employee.expertise}
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
                defaultValue={employee.yearsExperience}
                id={`employee-years-${employee.id}`}
                min={0}
                placeholder="e.g. 6"
                type="number"
              />
            </div>
            <div className="space-y-2">
              <Label>Employee role</Label>
              <Select defaultValue={employee.roleLevel}>
                <SelectTrigger className="cursor-pointer">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="cursor-pointer" value="manager">
                    Manager
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="employee">
                    Employee
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button className="cursor-pointer" type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
