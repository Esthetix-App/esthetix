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
  const utils = api.useUtils();

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
          title: "",
          position: 0,
          formFields: [
            {
              name: "",
              type: "TEXT",
              description: "",
              position: 0,
              typeOptions: null,
              fieldOptions: null,
              isRequired: false,
              isProfessionalField: false,
              size: "SM",
            },
          ],
          isProfessionalField: false,
        },
      ],
    },
  });

  const { mutate } = api.form.create.useMutation({
    onError() {
      toast.error("Houve um erro ao tentar criar o formulário!");
    },
    async onSuccess() {
      toast.success("Formulário criado com sucesso!", {
        position: "top-center",
      });

      await utils.form.getAll.invalidate();
      router.push("/forms");
    },
  });

  async function onSubmit(values: NewFormData) {
    mutate(values);
  }

  return { form, onSubmit };
};
