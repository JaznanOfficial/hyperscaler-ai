import { z } from "zod";

export const projectSchema = z.object({
  clientId: z.string(),
  status: z.enum(["APPROVED", "PENDING", "CANCELLED"]).default("PENDING"),
  assignedEmployees: z.array(z.string()).optional(),
  services: z
    .array(
      z.object({
        serviceId: z.string(),
        updates: z.any().optional(),
      })
    )
    .optional(),
});

export const updateProjectSchema = z.object({
  status: z.enum(["APPROVED", "PENDING", "CANCELLED"]).optional(),
  read: z.boolean().optional(),
  assignedEmployees: z.array(z.string()).optional(),
});

export const updateProjectServicesSchema = z.object({
  services: z.array(
    z.object({
      serviceId: z.string(),
      serviceName: z.string().optional(),
      updates: z.any().optional(),
    })
  ),
});

export type ProjectInput = z.infer<typeof projectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type UpdateProjectServicesInput = z.infer<
  typeof updateProjectServicesSchema
>;
