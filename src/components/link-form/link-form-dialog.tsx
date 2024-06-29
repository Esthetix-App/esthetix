"use client";

import * as React from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileSpreadsheet, SendHorizontal } from "lucide-react";
import { Combobox } from "../ui/combobox";
import { api } from "@/trpc/react";

interface LinkFormDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  onSuccess?: () => void;
  showTrigger?: boolean;
}

export function LinkFormDialog({
  onSuccess,
  showTrigger = true,
  ...props
}: LinkFormDialogProps) {
  const [isDeletePending, startDeleteTransition] = React.useTransition();
  const { data, isFetching } = api.professional.getAllOptions.useQuery();

  return (
    <Dialog {...props}>
      {showTrigger ? (
        <DialogTrigger asChild>
          <Button size="sm">
            <SendHorizontal className="mr-2 size-4" aria-hidden="true" />
            Enviar Formulário
          </Button>
        </DialogTrigger>
      ) : null}
      <DialogContent className="max-w-xl overflow-hidden p-0">
        <DialogHeader className="w-full space-y-3 p-6">
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
          <div className="!mt-10 grid gap-6">
            <Combobox
              options={[]}
              placeholder="Formulário"
              className="w-[24rem] md:w-[32rem]"
            />
            <Combobox
              isLoading={isFetching}
              options={data?.options ?? []}
              placeholder="Profissional responsavél"
              className="w-[24rem] md:w-[32rem]"
            />
          </div>
        </DialogHeader>
        <DialogFooter className="gap-2 border-t bg-muted p-4 py-3 sm:space-x-0">
          <DialogClose asChild>
            <Button size="lg" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            size="lg"
            aria-label="Excluir linhas selecionadas"
            onClick={() => {
              startDeleteTransition(async () => {
                // const { error } = await deleteTasks({
                //   ids: tasks.map((task) => task.id),
                // });

                // if (error) {
                //   toast.error(error);
                //   return;
                // }

                props.onOpenChange?.(false);
                toast.success("Itens excluídos");
                onSuccess?.();
              });
            }}
            disabled={isDeletePending}
          >
            {isDeletePending && (
              <ReloadIcon
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Enviar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
