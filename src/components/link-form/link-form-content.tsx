import { FileSpreadsheet } from "lucide-react";

import { api } from "@/trpc/react";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { useLinkForm } from "@/components/link-form/hooks/use-link-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LinkFormSent } from "@/components/link-form/link-form-sent";

interface ILinkFormContentProps {
  simplifiedForm?: boolean;
}

export const LinkFormContent = ({ simplifiedForm }: ILinkFormContentProps) => {
  const { form, onSubmit, isFormSent, isPending, formUrl } = useLinkForm({
    simplifiedForm,
  });

  const formOptions = api.form.getAllOptions.useQuery();
  const professionalOptions = api.professional.getAllOptions.useQuery();

  return (
    <DialogContent className="max-w-xl overflow-hidden p-0">
      {isFormSent ? (
        <LinkFormSent formUrl={formUrl} />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid">
            <DialogHeader className="w-full space-y-3 p-6 text-start">
              <DialogTitle className="flex items-center">
                <FileSpreadsheet
                  className="mr-2 size-4 text-primary"
                  aria-hidden="true"
                />
                Enviar Formulário
              </DialogTitle>
              <DialogDescription>
                Enviar formulário para o preenchimento do cliente e profissional
                responsavél.
              </DialogDescription>
              <div className="!mt-10 grid justify-start gap-4">
                <FormField
                  name="formId"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="grid">
                      <FormLabel>Formulário</FormLabel>
                      <FormControl>
                        <Combobox
                          value={field.value}
                          onSelect={field.onChange}
                          isLoading={formOptions.isFetching}
                          options={formOptions.data?.options ?? []}
                          placeholder="Selecione um formulário"
                          className="w-[24rem] md:w-[32rem]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="professionalId"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profissional responsavél</FormLabel>
                      <FormControl>
                        <Combobox
                          value={field.value}
                          onSelect={field.onChange}
                          isLoading={professionalOptions.isFetching}
                          options={professionalOptions.data?.options ?? []}
                          placeholder="Selecione o profissional responsavél"
                          className="w-[24rem] md:w-[32rem]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name="enable"
                  render={({ field }) => (
                    <FormItem>
                      <div className="mt-2 flex items-center space-x-2">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="cursor-pointer">
                          {field.value
                            ? "Ativo para preenchimento"
                            : "Inativo para preenchimento"}
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              </div>
            </DialogHeader>
            <DialogFooter className="gap-2 border-t bg-muted p-4 py-3 sm:space-x-0">
              <DialogClose asChild>
                <Button
                  size="lg"
                  type="button"
                  variant="outline"
                  disabled={isPending}
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button size="lg" type="submit" disabled={isPending}>
                Enviar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      )}
    </DialogContent>
  );
};
