import { prisma } from "@/backend/config/prisma";
import type { Prisma } from "@prisma/client";

export class ServiceRepository {
  async findById(id: string) {
    return prisma.service.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.ServiceCreateInput) {
    return prisma.service.create({
      data,
    });
  }

  async update(id: string, data: Prisma.ServiceUpdateInput) {
    return prisma.service.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.service.delete({
      where: { id },
    });
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [services, total] = await Promise.all([
      prisma.service.findMany({
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.service.count(),
    ]);

    return { services, total };
  }
}

export const serviceRepository = new ServiceRepository();
