import * as z from "zod";

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  title: z.string().optional(),
  operator: z.enum(["and", "or"]).optional().default("and"),
});

export const getFormSchema = searchParamsSchema;

export type GetFormSchema = z.infer<typeof getFormSchema>;
