import { z } from "zod";

export const onboardingServicesSchema = z.object({
  services: z.array(z.string().min(1, "Service value cannot be empty")),
});

export type OnboardingServicesInput = z.infer<typeof onboardingServicesSchema>;
