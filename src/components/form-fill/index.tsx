"use client";

import { useParams } from "next/navigation";

import { api } from "@/trpc/react";

import { Form } from "@/components/ui/form";
import { FormRender } from "@/components/form-render";
import { useFormFill } from "@/components/form-fill/hooks/use-form-fill";
import { FormFillSkeleton } from "@/components/form-fill/form-fill-skeleton";
import { FormInvalid } from "@/components/form-fill/form-invalid";

export const FormFill = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = api.formHistory.getById.useQuery({
    id,
  });

  const { form, onSubmit } = useFormFill({
    formValues: data?.form,
    defaultValues: data?.defaultValues,
  });

  if (isLoading) {
    return <FormFillSkeleton />;
  }

  if (isError) {
    return <FormInvalid />;
  }

  return !!data ? (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto grid w-full max-w-4xl"
      >
        <FormRender data={data} />
      </form>
    </Form>
  ) : null;
};
