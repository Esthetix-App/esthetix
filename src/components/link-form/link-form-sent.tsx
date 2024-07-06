import { CircleCheck, ClipboardIcon } from "lucide-react";
import { toast } from "sonner";

import { copyTextToClipboard } from "@/lib/utils";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface ILinkFormSentProps {
  formUrl: string;
}

export const LinkFormSent = ({ formUrl }: ILinkFormSentProps) => {
  const handleCopy = async () => {
    await copyTextToClipboard(formUrl);
    toast.success("Link copiado para área de transferência!");
  };

  return (
    <div>
      <DialogHeader className="w-full space-y-3 p-6">
        <DialogTitle className="flex items-center">
          <CircleCheck
            className="mr-2 size-5 text-primary"
            aria-hidden="true"
          />
          Formulário criado com sucesso!
        </DialogTitle>
        <DialogDescription className="text-left">
          Formulário criado, segue o link para preenchimento do cliente e
          profissional responsavél.
        </DialogDescription>
        {formUrl && (
          <div className="!mt-8 flex w-full flex-col items-center gap-2 md:flex-row">
            <div className="flex flex-1 items-center rounded-md border bg-muted p-3 shadow-sm">
              <span className="truncate text-sm text-muted-foreground">
                {formUrl}
              </span>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button type="button" onClick={handleCopy}>
                    <ClipboardIcon className="mr-2 h-4 w-4" />
                    Copiar
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="border bg-muted text-muted-foreground">
                  <p>Clique para copiar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </DialogHeader>
    </div>
  );
};
