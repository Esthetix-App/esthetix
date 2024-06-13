"use client";

import type { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "@/trpc/react";
import { formSchema } from "@/validation/form";

export type NewFormData = z.infer<typeof formSchema>;

export const useNewForm = () => {
  const router = useRouter();

  const form = useForm<NewFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      logoUrl: "",
      description: "",
      enable: true,
      formGroups: [
        {
          name: "",
          position: 0,
          formFields: [
            {
              name: "",
              type: "TEXT",
              position: 0,
              typeOptions: null,
              fieldOptions: null,
              isRequired: false,
              isProfessionalField: false,
            },
          ],
          isProfessionalField: false,
        },
      ],
    },
  });

  const { mutate } = api.customer.signUp.useMutation({
    onError() {
      toast.error("Houve um erro ao tentar criar sua conta!");
    },
    onSuccess() {
      toast.success("Conta criada com sucesso!", {
        position: "top-center",
      });
      router.push("/sign-in");
    },
  });

  async function onSubmit(values: NewFormData) {
    console.log(values);
  }

  return { form, onSubmit };
};
