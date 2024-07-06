import { api } from "@/trpc/react";

import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormRender } from "@/components/form-render";
import { FormInvalid } from "@/components/form-fill/form-invalid";
import { FormFillSkeleton } from "@/components/form-fill/form-fill-skeleton";
import { FormViewHeader } from "@/components/form-view/form-view-header";
import { useFormView } from "@/components/form-view/hooks/use-form-view";

interface IFormViewContentProps {
  formId: string;
}

export const FormViewContent = ({ formId }: IFormViewContentProps) => {
  const { data, isLoading, isError } = api.formHistory.getById.useQuery(
    {
      id: formId,
    },
    { staleTime: 1000 * 60 * 60 * 5 },
  );

  const { form, onSubmit } = useFormView({
    defaultValues: data?.defaultValues,
    formId,
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
        <FormViewHeader />
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
        </DialogFooter>
      </form>
    </Form>
  );
};
