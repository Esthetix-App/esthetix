"use client";

import { DownloadIcon, PlusIcon } from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";
import type { FormsGetAllOutput } from "./form-table-columns";

import { usePermissions } from "@/hooks/use-permissions";
import { exportTableToCSV } from "@/lib/export";

import { Button } from "@/components/ui/button";
import { FormsDeleteDialog } from "./form-delete-dialog";
import Link from "next/link";

interface FormTableToolbarActionsProps {
  table: Table<FormsGetAllOutput>;
}

export function FormTableToolbarActions({
  table,
}: FormTableToolbarActionsProps) {
  const { hasPermission } = usePermissions();
  const hasPermissionToDelete = hasPermission("ADMIN");

  return (
    <div className="flex items-center gap-2">
      {hasPermissionToDelete &&
      table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <FormsDeleteDialog
          items={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => table.toggleAllRowsSelected(false)}
        />
      ) : null}
      <Button asChild size="sm">
        <Link href="/forms/new">
          <PlusIcon className="mr-2 size-4" aria-hidden="true" />
          Novo Formulário
        </Link>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          exportTableToCSV(table, {
            filename: "clientes",
            excludeColumns: ["select", "actions"],
          })
        }
      >
        <DownloadIcon className="mr-2 size-4" aria-hidden="true" />
        Exportar
      </Button>
    </div>
  );
}
