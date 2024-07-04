"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  formHistorySchema,
  type IFormHistorySchema,
} from "@/validation/form-history";
import { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { env } from "@/env";

interface IUseLinkFormProps {
  simplifiedForm?: boolean;
}

export const useLinkForm = ({ simplifiedForm }: IUseLinkFormProps) => {
  const [isFormSent, setIsFormSent] = useState(false);
  const [formUrl, setformUrl] = useState<string>("");
  const { id } = useParams<{ id: string }>();

  const { mutate, isPending } = api.formHistory.create.useMutation({
    onSuccess(response) {
      setIsFormSent(true);
      setformUrl(`${env.NEXT_PUBLIC_APP_URL}/form/${response.id}`);
    },
    onError() {
      toast.error(
        "Houve um erro ao tentar enviar o formulário, tente novamente mais tarde!",
      );
    },
  });

  const form = useForm<IFormHistorySchema>({
    resolver: zodResolver(formHistorySchema),
    defaultValues: {
      customerId: "",
      formId: "",
      professionalId: "",
      enable: true,
      isNamedForm: false,
    },
  });

  useEffect(() => {
    if (simplifiedForm && id) {
      form.setValue("customerId", id);
    }
  }, [simplifiedForm, form, id]);

  async function onSubmit(values: IFormHistorySchema) {
    console.log(values);
    mutate(values);
  }

  return { form, onSubmit, isFormSent, formUrl, isPending };
};
