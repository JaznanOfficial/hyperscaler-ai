import { prisma } from "@/backend/config/prisma";

export class SubscriptionRepository {
  findByClientId(clientId: string) {
    return prisma.subscription.findMany({
      where: {
        userId: clientId,
        packageName: { not: null },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        packageName: true,
        amount: true,
        status: true,
        createdAt: true,
        nextBillingAt: true,
        subscriptionId: true,
      },
    });
  }
}

export const subscriptionRepository = new SubscriptionRepository();
