"use client";

import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

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

export function CreateEmployeeDialog() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Dialog>
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
        <form
          className="space-y-4"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="employee-name">Employee name</Label>
              <Input id="employee-name" placeholder="e.g. Nia Alvarez" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employee-email">Employee email</Label>
              <Input
                id="employee-email"
                placeholder="name@company.com"
                type="email"
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
                />
                <button
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-2 flex items-center text-slate-500 transition hover:text-slate-900"
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
                Remember this password—once encrypted, it can’t be viewed again.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="employee-title">Employee title</Label>
              <Input
                id="employee-title"
                placeholder="e.g. Automation Architect"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="employee-expertise">Employee expertise lists</Label>
            <Textarea
              id="employee-expertise"
              placeholder="LinkedIn outreach, SDR enablement, pipeline ops"
              rows={3}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="employee-years">
                Employee years of experiences
              </Label>
              <Input
                id="employee-years"
                min={0}
                placeholder="e.g. 6"
                type="number"
              />
            </div>
            <div className="space-y-2">
              <Label>Employee role</Label>
              <Select defaultValue="employee">
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
              Create profile
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
