"use client";

import * as React from "react";
import { ReloadIcon, TrashIcon } from "@radix-ui/react-icons";
import { type Row } from "@tanstack/react-table";
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

interface DeleteTasksDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  items: Row<unknown>["original"][];
  showTrigger?: boolean;
  onSuccess?: () => void;
}

export function CustomersDeleteDialog({
  items,
  showTrigger = true,
  onSuccess,
  ...props
}: DeleteTasksDialogProps) {
  const [isDeletePending, startDeleteTransition] = React.useTransition();

  return (
    <Dialog {...props}>
      {showTrigger ? (
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <TrashIcon className="mr-2 size-4" aria-hidden="true" />
            Excluir ({items.length})
          </Button>
        </DialogTrigger>
      ) : null}
      <DialogContent>
        <DialogHeader className="space-y-3">
          <DialogTitle>Você tem certeza absoluta?</DialogTitle>
          <DialogDescription>
            Essa ação não pode ser desfeita. Isso excluirá permanentemente{" "}
            <span className="font-medium">{items.length}</span>
            {items.length === 1 ? " item" : " itens"} da nosssa base.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:space-x-0">
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button
            aria-label="Excluir linhas selecionadas"
            variant="destructive"
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
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
