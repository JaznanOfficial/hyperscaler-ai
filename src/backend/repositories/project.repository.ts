import { prisma } from "@/backend/config/prisma";
import type { Prisma } from "@prisma/client";

export class ProjectRepository {
  async findById(id: string) {
    return prisma.project.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.ProjectCreateInput) {
    return prisma.project.create({
      data,
    });
  }

  async update(id: string, data: Prisma.ProjectUpdateInput) {
    return prisma.project.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.project.delete({
      where: { id },
    });
  }

  async findAll() {
    return prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findByEmployeeId(employeeId: string) {
    return prisma.project.findMany({
      where: {
        assignedEmployees: {
          array_contains: employeeId,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}

export const projectRepository = new ProjectRepository();
