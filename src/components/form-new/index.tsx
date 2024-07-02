"use client";

import {
  useNewForm,
  type NewFormData,
} from "@/components/form-new/hooks/use-new-form";

import { FormComponents } from "@/components/form-components";

export const FormNew = () => {
  const { form, onSubmit } = useNewForm();

  return <FormComponents<NewFormData> form={form} onSubmit={onSubmit} />;
};
