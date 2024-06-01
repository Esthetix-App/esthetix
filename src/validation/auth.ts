import z from "zod";

export const signInSchema = z.object({
  email: z
    .string({ required_error: "O campo é obrigatório" })
    .email({ message: "E-mail inválido" }),
  password: z
    .string({ required_error: "O campo é obrigatório" })
    .min(1, { message: "O campo é obrigatório" }),
});

export const signUpSchema = signInSchema
  .extend({
    image: z.string().optional(),
    name: z.string().min(1, { message: "O campo é obrigatório" }),
    confirmPassword: z.string().min(8, { message: "O campo é obrigatório" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "É necessário que a esta senha seja igual a anterior.",
  });

export type ISignIn = z.infer<typeof signInSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;
