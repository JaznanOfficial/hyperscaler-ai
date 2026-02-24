import type { Prisma } from "@prisma/client";

import { serviceRepository } from "@/backend/repositories/service.repository";

export class ServiceService {
  createService(data: {
    serviceName: string;
    sections: Array<{
      id: string;
      name: string;
      type: "input" | "textarea" | "boolean";
    }>;
  }) {
    return serviceRepository.create({
      serviceName: data.serviceName,
      sections: data.sections as Prisma.JsonValue,
    });
  }

  updateService(
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
      updateData.sections = data.sections as Prisma.JsonValue;
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

  async getAllServices() {
    const { services } = await serviceRepository.findAll(1, 1000);

    return services;
  }
}

export const serviceService = new ServiceService();
