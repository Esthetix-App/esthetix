import { CircleAlert } from "lucide-react";

export const FormInvalid = () => {
  return (
    <div className="mx-auto grid w-full max-w-4xl">
      <div className="mt-10 flex min-h-32 items-center gap-4 rounded-lg border bg-muted p-8 shadow-sm">
        <CircleAlert className="text-primary" />
        <p className="font-medium text-primary">
          Formulário não encontrado ou expirado!
        </p>
      </div>
    </div>
  );
};
