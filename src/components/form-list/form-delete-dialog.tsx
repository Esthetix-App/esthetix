"use client";

import { ReloadIcon, TrashIcon } from "@radix-ui/react-icons";
import * as React from "react";
import { toast } from "sonner";

import { type Row } from "@tanstack/react-table";
import type { FormsGetAllOutput } from "./form-table-columns";

import { api } from "@/trpc/react";

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
  items: Row<FormsGetAllOutput>["original"][];
  showTrigger?: boolean;
  onSuccess?: () => void;
}

export function FormsDeleteDialog({
  items,
  onSuccess,
  showTrigger = true,
  ...props
}: DeleteTasksDialogProps) {
  const utils = api.useUtils();
  const { mutate, isPending } = api.form.delete.useMutation({
    onError() {
      toast.error(
        "Houve um problema ao tentar excluir, tente novamente mais tarde.",
      );
    },
    async onSuccess() {
      toast.success("Itens excluídos");
      await utils.form.getAll.invalidate();
    },
    onSettled() {
      props.onOpenChange?.(false);
      onSuccess?.();
    },
  });

  const handleDelete = () => {
    mutate({ ids: items.map((item) => item.id) });
  };

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
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending && (
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
