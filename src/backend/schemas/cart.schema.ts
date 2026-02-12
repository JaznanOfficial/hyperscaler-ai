import { z } from "zod";

export const addToCartSchema = z.object({
  serviceId: z.string(),
});

export const checkoutSchema = z.object({
  items: z.array(
    z.object({
      serviceId: z.string(),
    })
  ),
});

export type AddToCartInput = z.infer<typeof addToCartSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
