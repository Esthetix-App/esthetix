import { env } from "@/env";
import Image from "next/image";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useFormRenderContext } from "@/contexts/form-render-context";

dayjs.extend(customParseFormat);

export const FormRenderHeader = () => {
  const { isPreview, form } = useFormRenderContext();

  const customer = form?.customer ?? null;
  const professional = form?.professional ?? null;

  return (
    <header>
      <div className="flex w-full items-center justify-between gap-10 border-t-4 border-primary bg-muted/50 p-6">
        <div className="flex flex-1 items-end gap-6">
          <Image
            alt="Product image"
            width={160}
            height={160}
            quality={100}
            loading="lazy"
            src={
              form?.logoUrl
                ? `${env.NEXT_PUBLIC_BUCKET_URL}/${form.logoUrl}`
                : "/images/placeholder.svg"
            }
            className="aspect-square shrink-0 rounded-md object-contain"
          />
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="text-base font-semibold text-foreground">
            {isPreview ? "[NOME DO CLIENTE]" : customer?.name}
          </span>
          <span className="w-full border-t pt-1 text-sm font-medium text-muted-foreground">
            Cliente
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="text-base font-semibold text-foreground">
            {isPreview ? "[NOME DO PROFISSIONAL]" : professional?.name}
          </span>
          <span className="w-full border-t pt-1 text-sm font-medium text-muted-foreground">
            Profissional Responsável
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="text-base font-semibold text-foreground">
            {isPreview
              ? "[DATA DO PREENCHIMENTO]"
              : dayjs(form?.filledAt ?? new Date()).format("DD/MM/YYYY")}
          </span>
          <span className="w-full border-t pt-1 text-sm font-medium text-muted-foreground">
            Data de Preenchimento
          </span>
        </div>
      </div>
      <div className="grid gap-2 p-6 py-8">
        <h2 className="text-xl font-bold">{form?.title}</h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          {form?.description}
        </p>
      </div>
    </header>
  );
};
