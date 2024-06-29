import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { UserNewForm } from "@/components/user-new/user-new-form";

export default function NewUserPage() {
  return (
    <main className="container flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon" className="h-7 w-7">
          <Link href="/users">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Link>
        </Button>
        <h1 className="text-lg font-semibold md:text-2xl">Novo Usuário</h1>
      </div>
      <div className="mt-3">
        <UserNewForm />
      </div>
    </main>
  );
}
