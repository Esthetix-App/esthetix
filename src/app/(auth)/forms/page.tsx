import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function FormsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Formulários</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
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
    </main>
  );
}
