import type { UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import { userRepository } from "@/backend/repositories/user.repository";

export class UserService {
  async createEmployee(data: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
  }) {
    const existingUser = await userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
    });
  }

  async updateEmployee(
    id: string,
    data: {
      name?: string;
      email?: string;
      password?: string;
      role?: UserRole;
      generalInfo?: any;
    }
  ) {
    const updateData: any = {
      name: data.name,
      email: data.email,
      role: data.role,
      generalInfo: data.generalInfo,
    };

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    return userRepository.update(id, updateData);
  }

  async deleteEmployee(id: string) {
    return userRepository.delete(id);
  }

  async getEmployees(page: number, limit: number) {
    const { employees, total } = await userRepository.findEmployees(
      page,
      limit
    );

    return {
      employees,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getEmployeeById(id: string) {
    return userRepository.findById(id);
  }
}

export const userService = new UserService();
