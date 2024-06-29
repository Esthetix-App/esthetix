import Link from "next/link";

import { Button } from "@/components/ui/button";

export const FormListEmpty = () => {
  return (
    <div className="flex h-full w-full flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          Você ainda não tem formulários
        </h3>
        <p className="text-sm text-muted-foreground">
          Você pode começar a visualizar assim que adicionar um formulário.
        </p>
        <Button asChild className="mt-4">
          <Link href="/forms/new">Adicionar formulário</Link>
        </Button>
      </div>
    </div>
  );
};
