import { z } from "zod";

export const userSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .optional(),
  role: z.enum(["EMPLOYEE", "MANAGER", "ADMIN", "CLIENT"]),
  generalInfo: z.any().optional(),
});

export const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  role: z.enum(["EMPLOYEE", "MANAGER", "ADMIN", "CLIENT"]).optional(),
  generalInfo: z.any().optional(),
});

export type UserInput = z.infer<typeof userSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
