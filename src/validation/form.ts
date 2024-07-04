import z, { type ZodTypeAny } from "zod";

export const fieldOptionsSchema = z.object({
  name: z.string().min(1, { message: "O campo é obrigatório" }),
});

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

export const formFieldSchema = z.object({
  name: z.string().min(1, { message: "O campo é obrigatório" }),
  description: z.string().nullish(),
  isProfessionalField: z.boolean().nullish(),
  isRequired: z.boolean(),
  position: z.number(),
  type: z.enum([
    "TEXT",
    "TEXT_AREA",
    "CHECKBOX",
    "RADIO",
    "DATE",
    "SELECT",
    "MULTI_SELECT",
    "IMAGE",
    "DESCRIPTION",
    "SIGNATURE",
  ]),
  size: z.enum(["SM", "MD", "LG", "XL"]),
  typeOptions: jsonSchema,
  fieldOptions: z.array(fieldOptionsSchema).nullish(),
});

export const formGroupSchema = z.object({
  title: z.string().nullish(),
  isProfessionalField: z.boolean().nullish(),
  position: z.number(),
  formFields: z.array(formFieldSchema),
});

export const formSchema = z.object({
  title: z.string().min(1, { message: "O campo é obrigatório" }),
  description: z.string().nullish(),
  logoUrl: z.string().nullish(),
  enable: z.boolean(),
  formGroups: z.array(formGroupSchema),
});

export type IFormSchema = z.infer<typeof formSchema>;
export type IFormGroupSchema = z.infer<typeof formGroupSchema>;
export type IFormFieldSchema = z.infer<typeof formFieldSchema>;
export type IFormOptionSchema = z.infer<typeof fieldOptionsSchema>;
