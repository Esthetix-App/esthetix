"use client";

import { DownloadIcon } from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";
import type { CustomerGetAllOutput } from "./customers-table-columns";

import { exportTableToCSV } from "@/lib/export";
import { usePermissions } from "@/hooks/use-permissions";

import { Button } from "@/components/ui/button";
import { CustomersDeleteDialog } from "./customers-delete-dialog";

interface CustomersTableToolbarActionsProps {
  table: Table<CustomerGetAllOutput>;
}

export function CustomersTableToolbarActions({
  table,
}: CustomersTableToolbarActionsProps) {
  const { hasPermission } = usePermissions();
  const hasPermissionToDelete = hasPermission("ADMIN");

  return (
    <div className="flex items-center gap-2">
      {hasPermissionToDelete &&
      table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <CustomersDeleteDialog
          items={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => table.toggleAllRowsSelected(false)}
        />
      ) : null}
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
