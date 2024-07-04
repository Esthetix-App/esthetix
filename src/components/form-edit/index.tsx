"use client";

import {
  useEditForm,
  type EditFormData,
} from "@/components/form-edit/hooks/use-edit-form";

import { FormComponents } from "@/components/form-components";

export const FormEdit = () => {
  const { form, onSubmit } = useEditForm();

  return (
    <FormComponents<EditFormData> form={form} onSubmit={onSubmit} isEditing />
  );
};
