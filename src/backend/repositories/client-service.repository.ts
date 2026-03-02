import type { Prisma } from "@prisma/client";
import { prisma } from "@/backend/config/prisma";

export class ClientServiceRepository {
  findById(id: string) {
    return prisma.clientService.findUnique({
      where: { id },
    });
  }

  create(data: Prisma.ClientServiceCreateInput) {
    return prisma.clientService.create({
      data,
    });
  }

  update(id: string, data: Prisma.ClientServiceUpdateInput) {
    return prisma.clientService.update({
      where: { id },
      data,
    });
  }

  delete(id: string) {
    return prisma.clientService.delete({
      where: { id },
    });
  }

  findAll() {
    return prisma.clientService.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  findByEmployeeId(employeeId: string) {
    return prisma.clientService.findMany({
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

  findByClientId(clientId: string) {
    return prisma.clientService.findMany({
      where: {
        clientId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}

export const clientServiceRepository = new ClientServiceRepository();
