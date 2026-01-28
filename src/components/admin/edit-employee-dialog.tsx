"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { EmployeeItem } from "@/components/admin/employee-list"

export type EditEmployeeDialogProps = {
  employee: EmployeeItem
}

export function EditEmployeeDialog({ employee }: EditEmployeeDialogProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="cursor-pointer">
          Edit profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit employee profile</DialogTitle>
          <DialogDescription>Update profile details and access permissions.</DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`employee-name-${employee.id}`}>Employee name</Label>
              <Input id={`employee-name-${employee.id}`} defaultValue={employee.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`employee-email-${employee.id}`}>Employee email</Label>
              <Input id={`employee-email-${employee.id}`} type="email" defaultValue={employee.email} />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`employee-password-${employee.id}`}>Reset password</Label>
              <div className="relative">
                <Input
                  id={`employee-password-${employee.id}`}
                  type={showPassword ? "text" : "password"}
                  placeholder="New password"
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-2 flex items-center text-slate-500 transition hover:text-slate-900"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              <p className="text-xs text-slate-500">Leave blank to keep the current password.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`employee-title-${employee.id}`}>Employee title</Label>
              <Input id={`employee-title-${employee.id}`} defaultValue={employee.title} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor={`employee-expertise-${employee.id}`}>Employee expertise lists</Label>
            <Textarea
              id={`employee-expertise-${employee.id}`}
              placeholder="Summarize expertise areas"
              rows={3}
              defaultValue={employee.expertise}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`employee-years-${employee.id}`}>Employee years of experiences</Label>
              <Input
                id={`employee-years-${employee.id}`}
                type="number"
                min={0}
                placeholder="e.g. 6"
                defaultValue={employee.yearsExperience}
              />
            </div>
            <div className="space-y-2">
              <Label>Employee role</Label>
              <Select defaultValue={employee.roleLevel}>
                <SelectTrigger className="cursor-pointer">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager" className="cursor-pointer">
                    Manager
                  </SelectItem>
                  <SelectItem value="employee" className="cursor-pointer">
                    Employee
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="cursor-pointer">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
