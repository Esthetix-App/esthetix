"use client";

import { type RouterOutputs } from "@/trpc/react";
import { useForm } from "react-hook-form";

type DefaultValuesType =
  RouterOutputs["formHistory"]["getById"]["defaultValues"];

interface IUseFormViewProps {
  defaultValues?: DefaultValuesType;
  formId: string;
  onDuplicate?: () => void;
}

export const useFormView = ({ defaultValues }: IUseFormViewProps) => {
  const form = useForm({
    values: defaultValues,
  });

  async function onSubmit() {}

  return { form, onSubmit };
};
