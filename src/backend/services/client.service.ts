import { userRepository } from "@/backend/repositories/user.repository";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 500;

export class ClientService {
  async getAllClients(limit: number = DEFAULT_LIMIT) {
    const { clients } = await userRepository.findClients(DEFAULT_PAGE, limit);

    return clients;
  }
}

export const clientService = new ClientService();
