import { subscriptionRepository } from "@/backend/repositories/subscription.repository";

export class SubscriptionService {
  async getClientPackages(clientId: string) {
    return subscriptionRepository.findByClientId(clientId);
  }
}

export const subscriptionService = new SubscriptionService();
