import { z } from "zod";

export const useInvoiceSchema = () => {
  return z.object({
    fire_product_id: z.number().min(1),
    period: z.number(),
    insured_price: z.number(),
    premium_base: z.number(),
    premium_rate: z.number(),
    transaction_fee: z.number(),
    total: z.number(),
  });
};

export type InvoceFormValues = z.infer<ReturnType<typeof useInvoiceSchema>>;
