import { z } from "zod";

export const CreateProduct = z.object({
  name: z.string().trim().min(1).max(255),
  price: z.number().nonnegative().lte(9999999999),
  amount: z.number().int().nonnegative().lte(9999999999),
});

export type CreateProductType = z.infer<typeof CreateProduct>;
