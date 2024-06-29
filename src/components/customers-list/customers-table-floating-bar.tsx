import * as React from "react";
import {
  Cross2Icon,
  DownloadIcon,
  ReloadIcon,
  TrashIcon,
} from "@radix-ui/react-icons";

import { type Table } from "@tanstack/react-table";
import type { CustomerGetAllOutput } from "./customers-table-columns";

import { exportTableToCSV } from "@/lib/export";
import { usePermissions } from "@/hooks/use-permissions";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Kbd } from "@/components/ui/kbd";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CustomersDeleteDialog } from "./customers-delete-dialog";

interface CustomersTableFloatingBarProps {
  table: Table<CustomerGetAllOutput>;
}

export function CustomersTableFloatingBar({
  table,
}: CustomersTableFloatingBarProps) {
  const rows = table.getFilteredSelectedRowModel().rows;
  const [isPending, startTransition] = React.useTransition();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [method, setMethod] = React.useState<
    "update-status" | "update-priority" | "export" | "delete"
  >();

  const { hasPermission } = usePermissions();
  const hasPermissionToDelete = hasPermission("ADMIN");

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        table.toggleAllRowsSelected(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [table]);

  const handleDelete = () => {
    if (!hasPermissionToDelete) return;

    setMethod("delete");
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <CustomersDeleteDialog
        showTrigger={false}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        items={rows.map((row) => row.original)}
        onSuccess={() => table.toggleAllRowsSelected(false)}
      />
      <div className="fixed inset-x-0 bottom-4 z-50 mx-auto w-fit px-4">
        <div className="w-full overflow-x-auto">
          <div className="mx-auto flex w-fit items-center gap-2 rounded-md border bg-card p-2 shadow-2xl">
            <div className="flex h-7 items-center rounded-md border border-dashed pl-2.5 pr-1">
              <span className="whitespace-nowrap text-xs">
                {rows.length} selecionados
              </span>
              <Separator orientation="vertical" className="ml-2 mr-1" />
              <Tooltip delayDuration={250}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7 hover:border"
                    onClick={() => {
                      setMethod("export");

                      startTransition(() => {
                        exportTableToCSV(table, {
                          excludeColumns: ["select", "actions"],
                          onlySelected: true,
                        });
                      });
                    }}
                    disabled={isPending}
                  >
                    {isPending && method === "export" ? (
                      <ReloadIcon
                        className="size-3.5 animate-spin"
                        aria-hidden="true"
                      />
                    ) : (
                      <DownloadIcon className="size-3.5" aria-hidden="true" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="border bg-accent font-semibold text-foreground dark:bg-zinc-900">
                  <p>Exportar</p>
                </TooltipContent>
              </Tooltip>
              {hasPermissionToDelete && (
                <Tooltip delayDuration={250}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7 hover:border"
                      onClick={handleDelete}
                      disabled={isPending}
                    >
                      {isPending && method === "delete" ? (
                        <ReloadIcon
                          className="size-3.5 animate-spin"
                          aria-hidden="true"
                        />
                      ) : (
                        <TrashIcon className="size-3.5" aria-hidden="true" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="border bg-accent font-semibold text-foreground dark:bg-zinc-900">
                    <p>Excluir seleção</p>
                  </TooltipContent>
                </Tooltip>
              )}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7 hover:border"
                    onClick={() => table.toggleAllRowsSelected(false)}
                  >
                    <Cross2Icon
                      className="size-3.5 shrink-0"
                      aria-hidden="true"
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="flex items-center border bg-accent px-2 py-1 font-semibold text-foreground dark:bg-zinc-900">
                  <p className="mr-2">Limpar seleção</p>
                  <Kbd abbrTitle="Escape" variant="outline">
                    Esc
                  </Kbd>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
