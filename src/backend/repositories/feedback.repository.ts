import type { Prisma } from "@prisma/client";
import { prisma } from "@/backend/config/prisma";

export class FeedbackRepository {
  async findById(id: string) {
    return prisma.feedback.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.FeedbackCreateInput) {
    return prisma.feedback.create({
      data,
    });
  }

  async update(id: string, data: Prisma.FeedbackUpdateInput) {
    return prisma.feedback.update({
      where: { id },
      data,
    });
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [feedbacks, total] = await Promise.all([
      prisma.feedback.findMany({
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.feedback.count(),
    ]);

    return { feedbacks, total };
  }

  async findByEmployeeId(employeeId: string, page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [feedbacks, total, unreadCount] = await Promise.all([
      prisma.feedback.findMany({
        where: {
          employeeId,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.feedback.count({
        where: {
          employeeId,
        },
      }),
      prisma.feedback.count({
        where: {
          employeeId,
          read: false,
        },
      }),
    ]);

    return { feedbacks, total, unreadCount };
  }

  async countUnreadByEmployeeId(employeeId: string) {
    return prisma.feedback.count({
      where: {
        employeeId,
        read: false,
      },
    });
  }

  async findByEmployeeIdWithFilters(
    employeeId: string,
    filters?: {
      onlyUnread?: boolean;
      daysBack?: number;
    }
  ) {
    const where: Prisma.FeedbackWhereInput = {
      employeeId,
    };

    if (filters?.onlyUnread !== undefined) {
      where.read = !filters.onlyUnread;
    }

    if (filters?.daysBack && filters.daysBack > 0) {
      const daysAgo = new Date();
      daysAgo.setDate(daysAgo.getDate() - filters.daysBack);
      where.createdAt = {
        gte: daysAgo,
      };
    }

    const [feedbacks, total, unreadCount] = await Promise.all([
      prisma.feedback.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.feedback.count({ where }),
      prisma.feedback.count({
        where: {
          employeeId,
          read: false,
        },
      }),
    ]);

    return { feedbacks, total, unreadCount };
  }
}

export const feedbackRepository = new FeedbackRepository();
