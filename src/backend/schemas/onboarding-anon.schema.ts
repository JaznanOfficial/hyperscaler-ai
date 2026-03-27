import { z } from "zod";

export const anonIdentifierSchema = z.object({
  anonId: z.string().min(1, "anonId is required"),
});

export type AnonIdentifierInput = z.infer<typeof anonIdentifierSchema>;
