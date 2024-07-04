import { z, type ZodTypeAny } from "zod";

const jsonSchema: ZodTypeAny = z
  .lazy(() =>
    z.union([
      z.string(),
      z.number(),
      z.boolean(),
      z.null(),
      z.array(jsonSchema),
      z.record(jsonSchema),
    ]),
  )
  .nullish();

export const submitFormSchema = z.object({
  formId: z.string(),
  responses: z.record(z.string(), jsonSchema),
});

export const duplicateFormSchema = submitFormSchema;
