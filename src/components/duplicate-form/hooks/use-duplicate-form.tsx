"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { api, type RouterOutputs } from "@/trpc/react";

type DefaultValuesType =
  RouterOutputs["formHistory"]["getById"]["defaultValues"];

interface IUseDuplicateFormProps {
  defaultValues?: DefaultValuesType;
  formId: string;
  onDuplicate?: () => void;
}

export const useDuplicateForm = ({
  formId,
  defaultValues,
  onDuplicate,
}: IUseDuplicateFormProps) => {
  const { mutate, isPending } = api.formHistory.duplicate.useMutation({
    onSuccess() {
      toast.success("Formulário duplicado com sucesso!");
      onDuplicate?.();
    },
    onError() {
      toast.error(
        "Houve um erro ao tentar enviar o formulário, tente novamente mais tarde!",
      );
    },
  });

  const form = useForm({
    values: defaultValues,
  });

  async function onSubmit(values: any) {
    mutate({
      responses: values,
      formId,
    });
  }

  return { form, onSubmit, isPending };
};
