import * as z from "zod";

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  title: z.string().optional(),
  operator: z.enum(["and", "or"]).optional().default("and"),
});

export const getCustomerHistorySchema = searchParamsSchema.merge(
  z.object({ customerId: z.string() }),
);

export type GetCustomerHistorySchema = z.infer<typeof getCustomerHistorySchema>;
