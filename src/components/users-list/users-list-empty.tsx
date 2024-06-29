import { Button } from "@/components/ui/button";

export const UserListEmpty = () => {
  return (
    <div className="flex h-full w-full flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          Você ainda não tem usuários
        </h3>
        <p className="text-sm text-muted-foreground">
          Você pode começar a visualizar assim que adicionar um usuário.
        </p>
        <Button className="mt-4">Adicionar usuário</Button>
      </div>
    </div>
  );
};
