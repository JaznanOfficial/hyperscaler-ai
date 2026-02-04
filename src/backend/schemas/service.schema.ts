import { z } from "zod";

export const serviceSectionSchema = z.object({
  sectionName: z.string(),
  sectionType: z.enum(["text", "boolean", "textarea", "number", "date"]),
  required: z.boolean().optional().default(false),
  placeholder: z.string().optional(),
});

export const serviceSchema = z.object({
  serviceName: z.string().min(2, "Service name must be at least 2 characters"),
  sections: z.array(serviceSectionSchema),
});

export const updateServiceSchema = z.object({
  serviceName: z.string().min(2).optional(),
  sections: z.array(serviceSectionSchema).optional(),
});

export type ServiceSectionInput = z.infer<typeof serviceSectionSchema>;
export type ServiceInput = z.infer<typeof serviceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
