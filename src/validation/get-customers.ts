import * as z from "zod";

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  name: z.string().optional(),
  operator: z.enum(["and", "or"]).optional().default("and"),
});

export const getCustomersSchema = searchParamsSchema;

export type GetCustomersSchema = z.infer<typeof getCustomersSchema>;
