"use client";

import type { z } from "zod";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { signInSchema } from "@/validation/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/config/routes";

export const useSignInForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    const data = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    if (data?.error) {
      toast.error("Email e/ou senha inválidos.", {
        description: "Por favor, verifique suas credenciais e tente novamente.",
        position: "top-center",
        className: "w-[420px]",
      });

      return;
    }

    router.push(DEFAULT_LOGIN_REDIRECT);
  }

  return { form, onSubmit };
};
