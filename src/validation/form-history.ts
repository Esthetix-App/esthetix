import { z } from "zod";

export const formHistorySchema = z
  .object({
    formId: z.string().min(1, { message: "O campo é obrigatório" }),
    professionalId: z.string().min(1, { message: "O campo é obrigatório" }),
    customerId: z.string().min(1, { message: "O campo é obrigatório" }),
    isNamedForm: z.boolean(),
    enable: z.boolean(),
  })
  .refine((data) => (data.isNamedForm ? data.customerId : true), {
    path: ["customerId"],
    message: "O campo é obrigatório",
  });

export type IFormHistorySchema = z.infer<typeof formHistorySchema>;
