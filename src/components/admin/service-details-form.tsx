"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type ServiceSectionType = "input" | "textarea" | "boolean"

export type ServiceSection = {
  id: string
  name: string
  type: ServiceSectionType
}

export type ServiceDetailsFormProps = {
  initialServiceName: string
  initialSections: ServiceSection[]
}

const sectionTypeLabels: Record<ServiceSectionType, string> = {
  input: "Input",
  textarea: "Textarea",
  boolean: "Boolean toggle",
}

const generateSectionId = () => crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`

export function ServiceDetailsForm({ initialServiceName, initialSections }: ServiceDetailsFormProps) {
  const [serviceName, setServiceName] = useState(initialServiceName)
  const [sections, setSections] = useState<ServiceSection[]>(
    initialSections.length ? initialSections : [{ id: generateSectionId(), name: "", type: "input" }]
  )

  const handleSectionChange = (id: string, patch: Partial<ServiceSection>) => {
    setSections((previous) => previous.map((section) => (section.id === id ? { ...section, ...patch } : section)))
  }

  const handleAddSection = () => {
    setSections((previous) => [{ id: generateSectionId(), name: "", type: "input" }, ...previous])
  }

  const handleRemoveSection = (id: string) => {
    setSections((previous) => (previous.length === 1 ? previous : previous.filter((section) => section.id !== id)))
  }

  return (
    <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
      <div className="space-y-2">
        <Label htmlFor="service-name">Service name</Label>
        <Input
          id="service-name"
          value={serviceName}
          onChange={(event) => setServiceName(event.target.value)}
          placeholder="e.g. LinkedIn Outreach"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-900">Sections</p>
          <Button type="button" variant="outline" size="sm" className="cursor-pointer" onClick={handleAddSection}>
            Add section
          </Button>
        </div>

        <div className="space-y-3">
          {sections.map((section) => (
            <div
              key={section.id}
              className="relative rounded-xl border border-slate-200 p-4 pt-8"
            >
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2 cursor-pointer text-slate-500"
                onClick={() => handleRemoveSection(section.id)}
                disabled={sections.length === 1}
              >
                Remove
              </Button>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`section-name-${section.id}`}>Section name</Label>
                  <Input
                    id={`section-name-${section.id}`}
                    value={section.name}
                    onChange={(event) => handleSectionChange(section.id, { name: event.target.value })}
                    placeholder="e.g. Target audience"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Field type</Label>
                  <Select
                    value={section.type}
                    onValueChange={(value) => handleSectionChange(section.id, { type: value as ServiceSectionType })}
                  >
                    <SelectTrigger className="cursor-pointer">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(sectionTypeLabels).map(([type, label]) => (
                        <SelectItem key={type} value={type} className="cursor-pointer">
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="submit" className="cursor-pointer">
          Save changes
        </Button>
        <Button type="button" variant="outline" className="cursor-pointer">
          Cancel
        </Button>
      </div>
    </form>
  )
}
