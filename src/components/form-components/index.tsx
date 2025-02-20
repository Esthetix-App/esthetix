"use client";

import { Form } from "@/components/ui/form";

import { FormHeader } from "@/components/form-components/form-header";
import { FormDetails } from "@/components/form-components/form-details";
import { FormSections } from "@/components/form-components/form-sections";
import { FormStatusCard } from "@/components/form-components/form-status-card";
import { FormLogoUpload } from "@/components/form-components/form-logo-upload";
import { FormFooterMobile } from "@/components/form-components/form-footer-mobile";
import type {
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";

type IFormComponents<FormValues extends FieldValues> = {
  form: UseFormReturn<FormValues>;
  onSubmit: SubmitHandler<FormValues>;
  isEditing?: boolean;
};

export function FormComponents<T extends FieldValues>({
  form,
  onSubmit,
  isEditing,
}: IFormComponents<T>) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="container grid h-full flex-1 auto-rows-max gap-4 px-3 py-6 md:px-8"
      >
        <FormHeader
          showResetButton={!isEditing}
          label={isEditing ? "Editar Formulário" : "Novo Formulário"}
        />
        <div className="mt-6 grid gap-4 pb-16 lg:grid-cols-[1fr_250px] lg:gap-8 xl:grid-cols-4">
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8 xl:col-span-3">
            <FormDetails />
            <FormSections />
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <FormStatusCard />
            <FormLogoUpload />
          </div>
        </div>
        <FormFooterMobile showResetButton={!isEditing} />
      </form>
    </Form>
  );
}
