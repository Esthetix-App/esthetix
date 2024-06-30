import Link from "next/link";
import { useFormContext } from "react-hook-form";
import { ChevronLeft } from "lucide-react";

import type { NewFormData } from "./hooks/use-new-form";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FormPreview } from "../form-preview";

export const FormNewHeader = () => {
  const { watch, reset } = useFormContext<NewFormData>();

  const isEnabled = watch("enable");

  const handleResetForm = () => {
    reset();
  };

  return (
    <div className="flex items-center gap-4">
      <Button asChild variant="outline" size="icon" className="h-7 w-7">
        <Link href="/forms">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Voltar</span>
        </Link>
      </Button>
      <h1 className="flex-1 shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight sm:grow-0 md:text-2xl">
        Novo Formulário
      </h1>
      <Badge
        variant={isEnabled ? "default" : "outline"}
        className="ml-auto sm:ml-0"
      >
        {isEnabled ? "Ativo" : "Inativo"}
      </Badge>

      <div className="hidden items-center gap-2 md:ml-auto md:flex">
        <FormPreview />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleResetForm}
        >
          Descartar
        </Button>
        <Button size="sm" type="submit">
          Salvar Formulário
        </Button>
      </div>
    </div>
  );
};
