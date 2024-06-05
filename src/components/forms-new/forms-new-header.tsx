import Link from "next/link";
import { ChevronLeft, Eye } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const FormNewHeader = () => {
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
      <Badge variant="default" className="ml-auto sm:ml-0">
        Ativo
      </Badge>
      <div className="hidden items-center gap-2 md:ml-auto md:flex">
        <Button variant="outline" size="sm">
          <Eye className="mr-2 size-5 stroke-[1.5] text-primary" />
          Preview
        </Button>
        <Button variant="outline" size="sm">
          Descartar
        </Button>
        <Button size="sm">Salvar Formulário</Button>
      </div>
    </div>
  );
};
