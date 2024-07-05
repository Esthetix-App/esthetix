"use client";

import { api, type RouterOutputs } from "@/trpc/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
  const utils = api.useUtils();

  const { mutate, isPending } = api.formHistory.duplicate.useMutation({
    async onSuccess() {
      toast.success("Formulário duplicado com sucesso!");
      await utils.formHistory.getByCustomer.invalidate();
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
