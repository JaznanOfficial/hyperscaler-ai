import { z } from "zod";

export const serviceSectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["input", "textarea", "boolean"]),
});

export const createServiceSchema = z.object({
  serviceName: z.string().min(2, "Service name must be at least 2 characters"),
  sections: z.array(serviceSectionSchema),
});

export const updateServiceSchema = z.object({
  serviceName: z
    .string()
    .min(2, "Service name must be at least 2 characters")
    .optional(),
  sections: z.array(serviceSectionSchema).optional(),
});

export type ServiceSectionInput = z.infer<typeof serviceSectionSchema>;
export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
