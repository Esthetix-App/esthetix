import { Eye } from "lucide-react";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const FormViewHeader = () => {
  return (
    <DialogHeader className="w-full space-y-3 border-b p-6">
      <DialogTitle className="flex items-center">
        <Eye className="mr-2 size-4 text-primary" aria-hidden="true" />
        Visualizar Formulário
      </DialogTitle>
      <DialogDescription>Visualizar dados do formulário.</DialogDescription>
    </DialogHeader>
  );
};
