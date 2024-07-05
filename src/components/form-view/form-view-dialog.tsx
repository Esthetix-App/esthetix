"use client";

import * as React from "react";

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { FormViewContent } from "@/components/form-view/form-view-content";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Copy } from "lucide-react";

interface FormViewDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  showTrigger?: boolean;
  formId: string;
}

export function FormViewDialog({
  formId,
  showTrigger,
  ...props
}: FormViewDialogProps) {
  return (
    <Dialog {...props}>
      {showTrigger ? (
        <DialogTrigger asChild>
          <DropdownMenuItem className="font-medium">
            <Copy className="mr-2 size-4" aria-hidden="true" />
            Duplicar
          </DropdownMenuItem>
        </DialogTrigger>
      ) : null}

      <DialogContent className="h-full max-h-[90vh] max-w-5xl overflow-hidden p-0">
        <FormViewContent formId={formId} />
      </DialogContent>
    </Dialog>
  );
}
