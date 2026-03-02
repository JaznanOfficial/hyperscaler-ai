import type { ClientServiceStatus } from "@prisma/client";
import { clientServiceRepository } from "@/backend/repositories/client-service.repository";

export class ClientService {
  async createProject(data: {
    clientId: string;
    assignedEmployees?: string[];
    services?: Record<string, unknown>[];
    status?: ClientServiceStatus;
  }) {
    return clientServiceRepository.create({
      clientId: data.clientId,
      assignedEmployees: data.assignedEmployees || [],
      services: JSON.stringify(data.services || []),
      status: data.status || "PENDING",
    });
  }

  async updateProject(
    id: string,
    data: {
      assignedEmployees?: string[];
      services?: Record<string, unknown>[];
      status?: ClientServiceStatus;
      read?: boolean;
    }
  ) {
    const updateData: Record<string, unknown> = {};

    if (data.assignedEmployees !== undefined) {
      updateData.assignedEmployees = data.assignedEmployees;
    }

    if (data.services !== undefined) {
      updateData.services = JSON.stringify(data.services);
    }

    if (data.status !== undefined) {
      updateData.status = data.status;
    }

    if (data.read !== undefined) {
      updateData.read = data.read;
    }

    return clientServiceRepository.update(id, updateData);
  }

  async deleteProject(id: string) {
    return clientServiceRepository.delete(id);
  }

  async getAllProjects() {
    return clientServiceRepository.findAll();
  }

  async getProjectById(id: string) {
    return clientServiceRepository.findById(id);
  }

  async getEmployeeServices(employeeId: string) {
    return clientServiceRepository.findByEmployeeId(employeeId);
  }

  async getClientServices(clientId: string) {
    return clientServiceRepository.findByClientId(clientId);
  }

  async assignEmployees(id: string, employeeIds: string[]) {
    return clientServiceRepository.update(id, {
      assignedEmployees: employeeIds,
    });
  }
}

export const clientService = new ClientService();
