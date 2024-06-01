"use client";

import type { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "@/trpc/react";
import { customerSignUpSchema } from "@/validation/customer";

export type SignUpFormData = z.infer<typeof customerSignUpSchema>;

export const useSignUpForm = () => {
  const router = useRouter();

  const form = useForm<SignUpFormData>({
    mode: "onChange",
    resolver: zodResolver(customerSignUpSchema),
    defaultValues: {
      account: {
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
      },
      address: {
        city: "",
        complement: "",
        neighborhood: "",
        number: "",
        state: "",
        street: "",
        zipcode: "",
      },
      personalData: {
        rg: "",
        cpf: "",
        image: "",
        bithdate: "",
        cellphone: "",
        howMet: "",
      },
    },
  });

  const { mutate } = api.customer.signUp.useMutation({
    onError() {
      toast.error("Houve um erro ao tentar criar sua conta!");
    },
    onSuccess() {
      toast.success("Conta criada com sucesso!");
      router.push("/sign-in");
    },
  });

  async function onSubmit(values: z.infer<typeof customerSignUpSchema>) {
    mutate(values);
  }

  return { form, onSubmit };
};
