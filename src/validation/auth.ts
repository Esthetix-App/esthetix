import z from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signUpSchema = signInSchema
  .extend({
    name: z.string().min(1),
    image: z.string().optional(),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "É necessário que a esta senha seja igual a anterior.",
  });

export type ISignIn = z.infer<typeof signInSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;
