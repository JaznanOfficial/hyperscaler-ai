"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

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
  serviceId?: string;
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
  serviceId,
}: ServiceDetailsFormProps) {
  const router = useRouter();
  const [serviceName, setServiceName] = useState(initialServiceName);
  const [sections, setSections] = useState<ServiceSection[]>(
    initialSections.length
      ? initialSections
      : [{ id: generateSectionId(), name: "", type: "input" }]
  );
  const [saving, setSaving] = useState(false);

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!serviceName.trim()) {
      toast.error("Please enter a service name");
      return;
    }

    if (sections.some((s) => !s.name.trim())) {
      toast.error("Please fill in all section names");
      return;
    }

    setSaving(true);

    try {
      const url = serviceId
        ? `/api/admin/services/${serviceId}`
        : "/api/admin/services";
      const method = serviceId ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceName,
          sections,
        }),
      });

      if (response.ok) {
        toast.success("Service saved successfully!");
        router.push("/s-admin/services");
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to save service");
      }
    } catch (error) {
      toast.error("Failed to save service");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="service-name">Service name</Label>
        <Input
          id="service-name"
          onChange={(event) => setServiceName(event.target.value)}
          placeholder="e.g. LinkedIn Outreach"
          required
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
                    required
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
        <Button className="cursor-pointer" disabled={saving} type="submit">
          {saving ? "Saving..." : "Save changes"}
        </Button>
        <Button
          className="cursor-pointer"
          onClick={() => router.back()}
          type="button"
          variant="outline"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
