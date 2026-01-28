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

export function CreateEmployeeDialog() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Create employee profile</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Create employee profile</DialogTitle>
          <DialogDescription>Provide initial credentials and context for the new teammate.</DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="employee-name">Employee name</Label>
              <Input id="employee-name" placeholder="e.g. Nia Alvarez" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employee-email">Employee email</Label>
              <Input id="employee-email" type="email" placeholder="name@company.com" />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="employee-password">Employee password</Label>
              <div className="relative">
                <Input
                  id="employee-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
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
              <p className="text-xs text-amber-600">
                Remember this password—once encrypted, it can’t be viewed again.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="employee-title">Employee title</Label>
              <Input id="employee-title" placeholder="e.g. Automation Architect" />
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
              <Label htmlFor="employee-years">Employee years of experiences</Label>
              <Input id="employee-years" type="number" min={0} placeholder="e.g. 6" />
            </div>
            <div className="space-y-2">
              <Label>Employee role</Label>
              <Select defaultValue="employee">
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
              Create profile
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
