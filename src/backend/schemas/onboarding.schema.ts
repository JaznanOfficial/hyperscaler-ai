import { z } from "zod";

const onboardingBaseSchema = z.object({
  userId: z.string().cuid().optional(),
  email: z.string().email("Invalid email address").optional(),
  businessName: z.string().min(1, "Business name is required"),
  industry: z.string().min(1, "Industry is required"),
  businessStage: z.string().min(1, "Business stage is required"),
  websiteUrl: z
    .string()
    .url("Website URL must be a valid URL")
    .optional()
    .or(z.literal("")),
  monthlyRevenueRange: z.string().optional(),
  services: z
    .array(z.string().min(1, "Service value cannot be empty"))
    .min(1, "Select at least one service"),
  discoverySource: z.string().min(1, "Discovery source is required"),
});

export const onboardingSchema = onboardingBaseSchema.superRefine(
  (data, context) => {
    if (!(data.userId || data.email)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Either userId or email is required",
        path: ["userId"],
      });
    }
  }
);

export type OnboardingInput = z.infer<typeof onboardingSchema>;
