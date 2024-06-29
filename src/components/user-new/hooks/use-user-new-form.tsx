"use client";

import type { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { createUserSchema } from "@/validation/user";
import { api } from "@/trpc/react";

export const useUserNewForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      image: null,
      password: "",
      confirmPassword: "",
      role: "PROFESSIONAL",
    },
  });

  const { mutate } = api.user.create.useMutation({
    onError() {
      toast.error("Houve um erro ao tentar criar usuário!");
    },
    onSuccess() {
      toast.success("Usuário criado com sucesso!", {
        position: "top-center",
      });
      router.push("/users");
    },
  });

  async function onSubmit(values: z.infer<typeof createUserSchema>) {
    mutate(values);
  }

  return { form, onSubmit };
};
