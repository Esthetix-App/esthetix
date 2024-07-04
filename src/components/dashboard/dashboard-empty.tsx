import { FileSpreadsheet } from "lucide-react";

export const DashboardEmpty = () => {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <FileSpreadsheet className="size-12 stroke-[1.2] text-primary" />

        <h3 className="text-2xl font-bold tracking-tight">
          Você ainda não tem formulários
        </h3>
        <p className="text-base text-muted-foreground">
          Você pode começar a visualizar assim que for vinculado um formulário
          ao seu usuário.
        </p>
      </div>
    </div>
  );
};
