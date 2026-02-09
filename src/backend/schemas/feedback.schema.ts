import { z } from "zod";

export const createFeedbackSchema = z.object({
  projectId: z.string(),
  employeeId: z.string(),
  heading: z.string().min(3, "Heading must be at least 3 characters"),
  details: z.string().min(10, "Details must be at least 10 characters"),
});

export const updateFeedbackSchema = z.object({
  heading: z.string().min(3, "Heading must be at least 3 characters").optional(),
  details: z.string().min(10, "Details must be at least 10 characters").optional(),
  read: z.boolean().optional(),
});

export type CreateFeedbackInput = z.infer<typeof createFeedbackSchema>;
export type UpdateFeedbackInput = z.infer<typeof updateFeedbackSchema>;
