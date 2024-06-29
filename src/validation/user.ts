import z from "zod";

export const createUserSchema = z
  .object({
    name: z.string().min(1, { message: "O campo é obrigatório" }),
    email: z
      .string({ required_error: "O campo é obrigatório" })
      .email({ message: "E-mail inválido" }),
    password: z
      .string({ required_error: "O campo é obrigatório" })
      .min(8, { message: "O campo deve conter pelo menos 8 caracteres" }),
    confirmPassword: z.string().min(1, { message: "O campo é obrigatório" }),
    image: z.string().optional().nullable(),
    role: z.enum(["ADMIN", "PROFESSIONAL"]).default("PROFESSIONAL"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "É necessário que a senha seja igual a anterior.",
  });

export const updateUserSchema = z.object({
  id: z.string().min(1, { message: "O campo é obrigatório" }),
  name: z.string().min(1, { message: "O campo é obrigatório" }).optional(),
  email: z
    .string({ required_error: "O campo é obrigatório" })
    .email({ message: "E-mail inválido" })
    .optional(),
  image: z.string().optional().optional(),
  role: z.enum(["ADMIN", "PROFESSIONAL"]).optional(),
});
