import { Copy } from "lucide-react";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const DuplicateFormHeader = () => {
  return (
    <DialogHeader className="w-full space-y-3 border-b p-6">
      <DialogTitle className="flex items-center">
        <Copy className="mr-2 size-4 text-primary" aria-hidden="true" />
        Duplicar Formulário
      </DialogTitle>
      <DialogDescription>
        Duplicar formulário para o preenchimento do cliente e profissional
        responsavél.
      </DialogDescription>
    </DialogHeader>
  );
};
