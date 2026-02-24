import type { Prisma } from "@prisma/client";
import { prisma } from "@/backend/config/prisma";

export class UserRepository {
  findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        generalInfo: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  create(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        generalInfo: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  update(id: string, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        generalInfo: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  delete(id: string) {
    return prisma.user.delete({
      where: { id },
    });
  }

  async findEmployees(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [employees, total] = await Promise.all([
      prisma.user.findMany({
        where: {
          role: {
            in: ["EMPLOYEE", "MANAGER"],
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          generalInfo: true,
          createdAt: true,
          updatedAt: true,
        },
        skip,
        take: limit,
      }),
      prisma.user.count({
        where: {
          role: {
            in: ["EMPLOYEE", "MANAGER"],
          },
        },
      }),
    ]);

    return { employees, total };
  }

  async findClients(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [clients, total] = await Promise.all([
      prisma.user.findMany({
        where: {
          role: "CLIENT",
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          generalInfo: true,
          createdAt: true,
          updatedAt: true,
        },
        skip,
        take: limit,
      }),
      prisma.user.count({
        where: {
          role: "CLIENT",
        },
      }),
    ]);

    return { clients, total };
  }
}

export const userRepository = new UserRepository();
