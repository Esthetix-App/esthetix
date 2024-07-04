import { api } from "@/trpc/react";

import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormRender } from "@/components/form-render";
import { FormInvalid } from "@/components/form-fill/form-invalid";
import { FormFillSkeleton } from "@/components/form-fill/form-fill-skeleton";
import { useFormFill } from "@/components/form-fill/hooks/use-form-fill";
import { DuplicateFormHeader } from "@/components/duplicate-form/duplicate-form-header";

interface IDuplicateFormContentProps {
  formId: string;
}

export const DuplicateFormContent = ({
  formId,
}: IDuplicateFormContentProps) => {
  const { data, isLoading, isError } = api.formHistory.getById.useQuery({
    id: formId,
  });

  const { form, onSubmit } = useFormFill({
    formValues: data?.form,
    defaultValues: data?.defaultValues,
  });

  if (isError) {
    return <FormInvalid />;
  }

  if (isLoading || !data) {
    return <FormFillSkeleton />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col overflow-hidden"
      >
        <DuplicateFormHeader />
        <div className="mx-auto w-full flex-1 overflow-y-auto p-6">
          <FormRender data={data} showActions={false} />
        </div>
        <DialogFooter className="gap-2 border-t bg-muted p-4 sm:space-x-0">
          <DialogClose asChild>
            <Button
              size="lg"
              type="button"
              variant="outline"
              disabled={isLoading}
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button size="lg" type="submit" disabled={isLoading}>
            Duplicar
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
