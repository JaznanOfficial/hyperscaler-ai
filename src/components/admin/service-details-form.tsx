"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type ServiceSectionType = "input" | "textarea" | "boolean";

export type ServiceSection = {
  id: string;
  name: string;
  type: ServiceSectionType;
};

export type ServiceDetailsFormProps = {
  initialServiceName: string;
  initialSections: ServiceSection[];
};

const sectionTypeLabels: Record<ServiceSectionType, string> = {
  input: "Input",
  textarea: "Textarea",
  boolean: "Boolean toggle",
};

const generateSectionId = () =>
  crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

export function ServiceDetailsForm({
  initialServiceName,
  initialSections,
}: ServiceDetailsFormProps) {
  const [serviceName, setServiceName] = useState(initialServiceName);
  const [sections, setSections] = useState<ServiceSection[]>(
    initialSections.length
      ? initialSections
      : [{ id: generateSectionId(), name: "", type: "input" }]
  );

  const handleSectionChange = (id: string, patch: Partial<ServiceSection>) => {
    setSections((previous) =>
      previous.map((section) =>
        section.id === id ? { ...section, ...patch } : section
      )
    );
  };

  const handleAddSection = () => {
    setSections((previous) => [
      { id: generateSectionId(), name: "", type: "input" },
      ...previous,
    ]);
  };

  const handleRemoveSection = (id: string) => {
    setSections((previous) =>
      previous.length === 1
        ? previous
        : previous.filter((section) => section.id !== id)
    );
  };

  return (
    <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
      <div className="space-y-2">
        <Label htmlFor="service-name">Service name</Label>
        <Input
          id="service-name"
          onChange={(event) => setServiceName(event.target.value)}
          placeholder="e.g. LinkedIn Outreach"
          value={serviceName}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="font-medium text-slate-900 text-sm">Sections</p>
          <Button
            className="cursor-pointer"
            onClick={handleAddSection}
            size="sm"
            type="button"
            variant="outline"
          >
            Add section
          </Button>
        </div>

        <div className="space-y-3">
          {sections.map((section) => (
            <div
              className="relative rounded-xl border border-slate-200 p-4 pt-8"
              key={section.id}
            >
              <Button
                className="absolute top-2 right-2 cursor-pointer text-slate-500"
                disabled={sections.length === 1}
                onClick={() => handleRemoveSection(section.id)}
                size="sm"
                type="button"
                variant="ghost"
              >
                Remove
              </Button>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`section-name-${section.id}`}>
                    Section name
                  </Label>
                  <Input
                    id={`section-name-${section.id}`}
                    onChange={(event) =>
                      handleSectionChange(section.id, {
                        name: event.target.value,
                      })
                    }
                    placeholder="e.g. Target audience"
                    value={section.name}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Field type</Label>
                  <Select
                    onValueChange={(value) =>
                      handleSectionChange(section.id, {
                        type: value as ServiceSectionType,
                      })
                    }
                    value={section.type}
                  >
                    <SelectTrigger className="cursor-pointer">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(sectionTypeLabels).map(
                        ([type, label]) => (
                          <SelectItem
                            className="cursor-pointer"
                            key={type}
                            value={type}
                          >
                            {label}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button className="cursor-pointer" type="submit">
          Save changes
        </Button>
        <Button className="cursor-pointer" type="button" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  );
}
