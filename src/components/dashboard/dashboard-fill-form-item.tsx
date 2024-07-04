import Link from "next/link";
import { env } from "@/env";
import { getInitials } from "@/lib/utils";
import type { RouterOutputs } from "@/trpc/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type FormItem = RouterOutputs["dashboard"]["getFormsToFill"]["forms"][number];

interface IDashboardFillFormItemProps {
  form: FormItem;
}

export const DashboardFillFormItem = ({
  form,
}: IDashboardFillFormItemProps) => {
  return (
    <Link href={`form/${form.id}`}>
      <div className=" flex h-full flex-col justify-between gap-4 rounded-lg border bg-muted/40 p-4 shadow-sm transition-shadow ease-linear hover:shadow-md">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 rounded-lg shadow-sm">
            {form.logoUrl && (
              <AvatarImage
                src={`${env.NEXT_PUBLIC_BUCKET_URL}/${form.logoUrl}`}
              />
            )}
            <AvatarFallback className="rounded-lg border bg-background text-base">
              {getInitials(form.title)}
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <span className="line-clamp-1 text-base font-semibold">
              {form.title}
            </span>

            {form.description && (
              <p className="line-clamp-2 text-xs text-muted-foreground">
                {form.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-between gap-3">
          {!!form.professional?.name && (
            <span className="truncate text-xs font-semibold text-muted-foreground/70">
              {form.professional?.name}
            </span>
          )}
          <span className="justify-end text-xs font-medium text-muted-foreground/70">
            Criado em: {form.createdAt}
          </span>
        </div>
      </div>
    </Link>
  );
};
