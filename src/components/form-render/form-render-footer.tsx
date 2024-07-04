import Link from "next/link";

import { Button } from "@/components/ui/button";

export const FormRenderFooter = () => {
  return (
    <footer className="mt-8 flex w-full items-center justify-end gap-3 border-b-4 border-primary bg-muted/50 p-6">
      <Button asChild type="button" size="lg" variant="outline">
        <Link href="/dashboard">Cancelar</Link>
      </Button>
      <Button type="submit" size="lg">
        Enviar formulário
      </Button>
    </footer>
  );
};
