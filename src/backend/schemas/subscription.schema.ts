import { z } from "zod";

export const subscriptionSchema = z.object({
  userId: z.string(),
  subscriptionId: z.string(),
  priceId: z.string(),
  invoiceId: z.string().optional().nullable(),
  amount: z.number().int().positive(),
  status: z.enum(["PAID", "UNPAID", "CANCELLED"]),
  nextBillingAt: z.date().optional().nullable(),
});

export const updateSubscriptionSchema = z.object({
  status: z.enum(["PAID", "UNPAID", "CANCELLED"]).optional(),
  amount: z.number().int().positive().optional(),
  invoiceId: z.string().optional().nullable(),
  nextBillingAt: z.date().optional().nullable(),
});

export type SubscriptionInput = z.infer<typeof subscriptionSchema>;
export type UpdateSubscriptionInput = z.infer<typeof updateSubscriptionSchema>;
