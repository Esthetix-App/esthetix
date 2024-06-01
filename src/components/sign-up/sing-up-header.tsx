import Image from "next/image";
import { StepperProgress } from "@/components/ui/stepper";

export const SingUpHeader = () => {
  return (
    <div className="mb-3 flex w-full flex-col items-center justify-center gap-4">
      <Image
        width={60}
        height={60}
        quality={100}
        priority
        alt="Logo"
        src="/logo.svg"
        className="object-cover dark:brightness-[0.2] dark:grayscale"
      />

      <h1 className="text-3xl font-bold">Criar conta</h1>

      <div className="mt-2 grid w-full max-w-xs grid-cols-3 gap-3">
        <StepperProgress />
      </div>

      <p className="mt-2 text-balance text-muted-foreground">
        Crie uma conta para acesssar os recursos da platafroma.
      </p>
    </div>
  );
};
