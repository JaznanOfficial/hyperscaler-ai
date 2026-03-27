import { z } from "zod";

export const onboardingBusinessSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(1, "Phone number is required"),
  businessName: z.string().min(1, "Business name is required"),
  industry: z.string().min(1, "Industry is required"),
  businessStage: z.string().min(1, "Business stage is required"),
  websiteUrl: z
    .string()
    .url("Website URL must be a valid URL")
    .optional()
    .or(z.literal("")),
  monthlyRevenueRange: z.string().optional(),
});

export type OnboardingBusinessInput = z.infer<typeof onboardingBusinessSchema>;
