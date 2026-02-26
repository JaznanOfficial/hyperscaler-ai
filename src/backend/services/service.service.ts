import type { Prisma } from "@prisma/client";

import { serviceRepository } from "@/backend/repositories/service.repository";
import { generateSlug } from "@/lib/generate-slug";

export class ServiceService {
  async createService(data: {
    serviceName: string;
    sections: Array<{
      id: string;
      name: string;
      type: "input" | "textarea" | "boolean";
    }>;
  }) {
    let slug = generateSlug();
    let attempts = 0;

    while (attempts < 10) {
      const existing = await serviceRepository.findBySlug(slug);
      if (!existing) break;
      slug = generateSlug();
      attempts++;
    }

    return serviceRepository.create({
      serviceName: data.serviceName,
      sections: data.sections as Prisma.InputJsonValue,
      slug,
    });
  }

  async updateService(
    id: string,
    data: {
      serviceName?: string;
      sections?: Array<{
        id: string;
        name: string;
        type: "input" | "textarea" | "boolean";
      }>;
    }
  ) {
    const updateData: Prisma.ServiceUpdateInput = {};

    if (data.serviceName) {
      updateData.serviceName = data.serviceName;
    }

    if (data.sections) {
      updateData.sections = data.sections as Prisma.InputJsonValue;
    }

    return serviceRepository.update(id, updateData);
  }

  deleteService(id: string) {
    return serviceRepository.delete(id);
  }

  async getServices(page: number, limit: number) {
    const { services, total } = await serviceRepository.findAll(page, limit);

    return {
      services,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  getServiceById(id: string) {
    return serviceRepository.findById(id);
  }

  getServiceBySlug(slug: string) {
    return serviceRepository.findBySlug(slug);
  }

  async getAllServices() {
    const { services } = await serviceRepository.findAll(1, 1000);

    return services;
  }
}

export const serviceService = new ServiceService();
