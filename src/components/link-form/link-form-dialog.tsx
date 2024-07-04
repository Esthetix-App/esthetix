"use client";

import * as React from "react";
import { SendHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { LinkFormContent } from "@/components/link-form/link-form-content";

interface LinkFormDialogProps {
  simplifiedForm?: boolean;
}

export function LinkFormDialog({ simplifiedForm }: LinkFormDialogProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <SendHorizontal className="mr-2 size-4" aria-hidden="true" />
          Enviar Formulário
        </Button>
      </DialogTrigger>
      {open && <LinkFormContent simplifiedForm={simplifiedForm} />}
    </Dialog>
  );
}
