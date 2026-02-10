import { serviceRepository } from "@/backend/repositories/service.repository";

export class ServiceService {
  async createService(data: {
    serviceName: string;
    sections: Array<{
      id: string;
      name: string;
      type: "input" | "textarea" | "boolean";
    }>;
  }) {
    return serviceRepository.create({
      serviceName: data.serviceName,
      sections: data.sections as any,
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
    const updateData: any = {};

    if (data.serviceName) {
      updateData.serviceName = data.serviceName;
    }

    if (data.sections) {
      updateData.sections = data.sections;
    }

    return serviceRepository.update(id, updateData);
  }

  async deleteService(id: string) {
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

  async getServiceById(id: string) {
    return serviceRepository.findById(id);
  }
}

export const serviceService = new ServiceService();
