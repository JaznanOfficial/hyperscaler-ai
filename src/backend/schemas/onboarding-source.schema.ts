import { z } from "zod";

export const onboardingSourceSchema = z.object({
  discoverySource: z.string().min(1, "Discovery source is required"),
});

export type OnboardingSourceInput = z.infer<typeof onboardingSourceSchema>;
