import z from "zod";

export const customerAddressSchema = z.object({
  city: z.string().min(1, { message: "O campo é obrigatório" }),
  state: z.string().min(1, { message: "O campo é obrigatório" }),
  street: z.string().min(1, { message: "O campo é obrigatório" }),
  number: z.string().min(1, { message: "O campo é obrigatório" }),
  zipcode: z.string().min(8, { message: "O campo é obrigatório" }),
  neighborhood: z.string().min(1, { message: "O campo é obrigatório" }),
  complement: z.string().optional(),
});

export const personalDataSchema = z.object({
  rg: z.string().min(1),
  cpf: z.string().min(1),
  howMet: z.string().min(1),
  bithdate: z.string().min(1),
  cellphone: z.string().min(1),
  image: z.string().optional(),
});

export const accountSchema = z
  .object({
    name: z.string().min(1, { message: "O campo é obrigatório" }),
    email: z
      .string({ required_error: "O campo é obrigatório" })
      .email({ message: "E-mail inválido" }),
    password: z
      .string({ required_error: "O campo é obrigatório" })
      .min(8, { message: "O campo deve conter pelo menos 8 caracteres" }),
    confirmPassword: z.string().min(1, { message: "O campo é obrigatório" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "É necessário que a senha seja igual a anterior.",
  });

export const customerSignUpSchema = z.object({
  account: accountSchema,
  address: customerAddressSchema,
  personalData: personalDataSchema,
});

export type ICustomerSignUpSchema = z.infer<typeof customerSignUpSchema>;
