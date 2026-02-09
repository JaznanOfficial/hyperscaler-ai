import { z } from "zod";

export const createFeedbackSchema = z.object({
  projectId: z.string(),
  employeeId: z.string(),
  heading: z.string().min(1, "Heading is required"),
  details: z.string().min(1, "Details are required"),
});

export const updateFeedbackSchema = z.object({
  heading: z.string().min(1).optional(),
  details: z.string().min(1).optional(),
  read: z.boolean().optional(),
});

export type CreateFeedbackInput = z.infer<typeof createFeedbackSchema>;
export type UpdateFeedbackInput = z.infer<typeof updateFeedbackSchema>;
