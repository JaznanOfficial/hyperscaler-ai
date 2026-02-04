import { z } from "zod";

export const feedbackSchema = z.object({
  projectId: z.string(),
  employeeId: z.string(),
  heading: z.string().min(3, "Heading must be at least 3 characters"),
  details: z.string().min(10, "Details must be at least 10 characters"),
});

export const updateFeedbackSchema = z.object({
  heading: z.string().min(3).optional(),
  details: z.string().min(10).optional(),
  read: z.boolean().optional(),
});

export type FeedbackInput = z.infer<typeof feedbackSchema>;
export type UpdateFeedbackInput = z.infer<typeof updateFeedbackSchema>;
