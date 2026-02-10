import { projectRepository } from "@/backend/repositories/project.repository";
import type { ProjectStatus } from "@prisma/client";

export class ProjectService {
  async createProject(data: {
    clientId: string;
    assignedEmployees?: string[];
    services?: any[];
    status?: ProjectStatus;
  }) {
    return projectRepository.create({
      clientId: data.clientId,
      assignedEmployees: data.assignedEmployees || [],
      services: data.services || [],
      status: data.status || "PENDING",
    });
  }

  async updateProject(
    id: string,
    data: {
      assignedEmployees?: string[];
      services?: any[];
      status?: ProjectStatus;
      read?: boolean;
    }
  ) {
    const updateData: any = {};

    if (data.assignedEmployees !== undefined) {
      updateData.assignedEmployees = data.assignedEmployees;
    }

    if (data.services !== undefined) {
      updateData.services = data.services;
    }

    if (data.status !== undefined) {
      updateData.status = data.status;
    }

    if (data.read !== undefined) {
      updateData.read = data.read;
    }

    return projectRepository.update(id, updateData);
  }

  async deleteProject(id: string) {
    return projectRepository.delete(id);
  }

  async getAllProjects() {
    return projectRepository.findAll();
  }

  async getProjectById(id: string) {
    return projectRepository.findById(id);
  }

  async getEmployeeProjects(employeeId: string) {
    return projectRepository.findByEmployeeId(employeeId);
  }

  async assignEmployees(id: string, employeeIds: string[]) {
    return projectRepository.update(id, {
      assignedEmployees: employeeIds,
    });
  }
}

export const projectService = new ProjectService();
