import z from "zod";
import { signUpSchema } from "./auth";

export const customerAddressSchema = z.object({
  city: z.string().min(1),
  state: z.string().min(1),
  street: z.string().min(1),
  number: z.string().min(1),
  zipcode: z.string().min(8),
  neighborhood: z.string().min(1),
  complement: z.string().optional(),
});

export const personalDataSchema = z.object({
  bithdate: z.string().min(1),
  cellphone: z.string().min(1),
  rg: z.string().min(1),
  cpf: z.string().min(1),
  howMet: z.string().min(1),
});

export const customerSignUpSchema = z.object({
  account: signUpSchema,
  address: customerAddressSchema,
  personalData: personalDataSchema,
});

export type ICustomerSignUpSchema = z.infer<typeof customerSignUpSchema>;
