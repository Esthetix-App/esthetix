import { CircleHelp } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ProfessionalFieldTooltip = () => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <CircleHelp className="size-4 text-muted-foreground/60" />
      </TooltipTrigger>
      <TooltipContent
        align="center"
        className="w-80 bg-muted text-xs text-muted-foreground shadow-md"
      >
        <p>
          Caso o campo{" "}
          <span className="font-semibold italic">Seçao do Profissional</span>{" "}
          seja ativado a seção só ficara visivel para um usuário Profissional.
        </p>
      </TooltipContent>
    </Tooltip>
  );
};
