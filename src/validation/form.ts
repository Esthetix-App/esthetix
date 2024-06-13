import z from "zod";

export const fieldOptionsSchema = z.object({
  name: z.string().min(1, { message: "O campo é obrigatório" }),
});

export const formFieldSchema = z.object({
  name: z.string().min(1, { message: "O campo é obrigatório" }),
  isProfessionalField: z.boolean(),
  isRequired: z.boolean(),
  position: z.number(),
  type: z.enum([
    "TEXT",
    "TEXT_AREA",
    "CHECKBOX",
    "RADIO",
    "DATE",
    "DATETIME",
    "SELECT",
    "MULTI_SELECT",
    "IMAGE",
    "DESCRIPTION",
    "SIGNATURE",
  ]),
  typeOptions: z.object({}).nullable(),
  fieldOptions: z.array(fieldOptionsSchema).nullable(),
});

export const formGroupSchema = z.object({
  name: z.string().min(1, { message: "O campo é obrigatório" }),
  isProfessionalField: z.boolean(),
  position: z.number(),
  formFields: z.array(formFieldSchema),
});

export const formSchema = z.object({
  title: z.string().min(1, { message: "O campo é obrigatório" }),
  description: z.string().min(1, { message: "O campo é obrigatório" }),
  logoUrl: z.string().optional(),
  enable: z.boolean(),
  formGroups: z.array(formGroupSchema),
});

export type IFormSchema = z.infer<typeof formSchema>;
export type IFormGroupSchema = z.infer<typeof formGroupSchema>;
export type IFormFieldSchema = z.infer<typeof formGroupSchema>;
