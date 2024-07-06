"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { api, type RouterOutputs } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createValidationSchema,
  type IValidationFormField,
} from "@/lib/create-validation-schema";

type FormDataType = RouterOutputs["formHistory"]["getById"]["form"];
type DefaultValuesType =
  RouterOutputs["formHistory"]["getById"]["defaultValues"];

interface IUseFormFillProps {
  formValues?: FormDataType;
  defaultValues?: DefaultValuesType;
  isProfessionalUser?: boolean;
}

export const useFormFill = ({
  formValues,
  defaultValues,
  isProfessionalUser,
}: IUseFormFillProps) => {
  const router = useRouter();
  const utils = api.useUtils();

  const schemaMemo = useMemo(() => {
    const formFields: IValidationFormField[] = [];

    if (!formValues) {
      return z.any();
    }

    for (let i = 0; i < formValues.formGroups?.length; i++) {
      const groupItem = formValues.formGroups[i];
      if (groupItem) {
        for (let k = 0; k < groupItem.formFields?.length; k++) {
          const fieldItem = formValues?.formGroups?.[i]?.formFields[k];
          const isProfessionalField =
            fieldItem?.isProfessionalField || groupItem.isProfessionalField;

          if (
            fieldItem &&
            (!isProfessionalField ||
              (isProfessionalField && isProfessionalUser))
          ) {
            formFields.push({
              id: fieldItem.id,
              type: fieldItem.type,
              isRequired: fieldItem.isRequired,
            });
          }
        }
      }
    }

    return createValidationSchema(formFields);
  }, [formValues, isProfessionalUser]);

  const { mutate } = api.submitForm.submit.useMutation({
    async onSuccess() {
      toast.success("Frmulário enviado com sucesso.");
      router.push("/dashboard");
      await utils.formHistory.getById.invalidate();
    },
    onError() {
      toast.error("Houve um erro ao enviar formulário.");
    },
  });

  const form = useForm({
    resolver: zodResolver(schemaMemo),
    values: defaultValues,
  });

  async function onSubmit(values: z.infer<typeof schemaMemo>) {
    if (!formValues?.id) {
      toast.error("Houve um erro ao enviar formulário.");
      return;
    }

    mutate({
      formId: formValues.id,
      responses: values,
    });
  }

  return { form, onSubmit };
};
