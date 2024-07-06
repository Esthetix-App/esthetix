"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { api, type RouterOutputs } from "@/trpc/react";
import { editFormSchema } from "@/validation/form-edit";

export type EditFormData = RouterOutputs["form"]["getById"]["form"];

export const useEditForm = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const utils = api.useUtils();

  const { data, isFetching, isError } = api.form.getById.useQuery(
    { id },
    { staleTime: 1000 * 60 * 60 * 5 },
  );

  const form = useForm<EditFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(editFormSchema),
    values: data?.form,
  });

  const { mutate } = api.form.update.useMutation({
    onError() {
      toast.error("Houve um erro ao tentar editar o formulário!");
    },
    async onSuccess() {
      toast.success("Formulário editado com sucesso!", {
        position: "top-center",
      });

      router.push("/forms");
      await utils.form.getAll.invalidate();
    },
  });

  async function onSubmit(values: EditFormData) {
    mutate(values);
  }

  return {
    form,
    onSubmit,
    isFetching,
    isError,
  };
};
