import { tool } from "ai";
import z from "zod";

import { serviceService } from "@/backend/services/service.service";
import { AuthGuard } from "@/backend/utils/auth-guard";

interface NormalizedService {
  id: string;
  name: string;
  sectionsCount: number;
  sectionsPreview: string[];
  createdAt?: string;
}

interface ServiceSection {
  id?: string;
  name?: string;
  type?: string;
}

const toIsoString = (value?: Date | string | null) => {
  if (!value) {
    return undefined;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
};

const toSectionsArray = (value: unknown): ServiceSection[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((section): section is ServiceSection => {
    return section !== null && typeof section === "object";
  });
};

const toSectionName = (section: ServiceSection, index: number) => {
  if (section.name && section.name.trim().length > 0) {
    return section.name.trim();
  }

  if (section.type) {
    return `${section.type.toString().toUpperCase()} section`;
  }

  return `Section ${index + 1}`;
};

export const SuperAdminServicesTool = tool({
  description:
    "List every service template for super admins, including sections count and recency.",
  inputSchema: z.object({}),
  execute: async () => {
    await AuthGuard.requireAdmin();

    const services = await serviceService.getAllServices();

    const normalizedServices: NormalizedService[] = services.map((service) => {
      const sections = toSectionsArray(service.sections);

      return {
        id: service.id,
        name: service.serviceName ?? "Untitled service",
        sectionsCount: sections.length,
        sectionsPreview: sections
          .slice(0, 3)
          .map((section, index) => toSectionName(section, index)),
        createdAt: toIsoString(service.createdAt),
      };
    });

    const totalSections = normalizedServices.reduce((total, service) => {
      return total + service.sectionsCount;
    }, 0);

    const averageSections =
      normalizedServices.length > 0
        ? Number((totalSections / normalizedServices.length).toFixed(1))
        : 0;

    return {
      success: true,
      total: normalizedServices.length,
      totalSections,
      averageSections,
      data: normalizedServices,
    };
  },
});
