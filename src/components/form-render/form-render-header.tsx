import { env } from "@/env";
import Image from "next/image";

interface IFormRenderHeaderProps {
  title: string;
  description: string;
  logoUrl?: string;
}

export const FormRenderHeader = ({
  description,
  title,
  logoUrl,
}: IFormRenderHeaderProps) => {
  return (
    <>
      <div className="flex w-full items-center justify-between gap-10 border-t-4 border-primary bg-muted/50 p-6">
        <div className="flex flex-1 items-end gap-6">
          <Image
            alt="Product image"
            width={160}
            height={160}
            quality={100}
            loading="lazy"
            src={
              logoUrl
                ? `${env.NEXT_PUBLIC_BUCKET_URL}/${logoUrl}`
                : "/images/placeholder.svg"
            }
            className="aspect-square shrink-0 rounded-md object-contain"
          />
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="text-base font-semibold text-foreground">
            [NOME DO CLIENTE]
          </span>
          <span className="w-full border-t pt-1 text-sm font-medium text-muted-foreground">
            Cliente
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="text-base font-semibold text-foreground">
            [NOME DO PROFISSIONAL]
          </span>
          <span className="w-full border-t pt-1 text-sm font-medium text-muted-foreground">
            Profissional Responsável
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="text-base font-semibold text-foreground">
            [DATA DO PREENCHIMENTO]
          </span>
          <span className="w-full border-t pt-1 text-sm font-medium text-muted-foreground">
            Data de Preenchimento
          </span>
        </div>
      </div>
      <div className="grid gap-2 p-6 py-8">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </>
  );
};
