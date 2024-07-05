"use client";

import { DownloadIcon } from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";
import type { HistoryGetAllOutput } from "./history-table-columns";

import { usePermissions } from "@/hooks/use-permissions";
import { exportTableToCSV } from "@/lib/export";

import { Button } from "@/components/ui/button";
import { HistoryDeleteDialog } from "./history-delete-dialog";

interface HistoryTableToolbarActionsProps {
  table: Table<HistoryGetAllOutput>;
}

export function HistoryTableToolbarActions({
  table,
}: HistoryTableToolbarActionsProps) {
  const { hasPermission } = usePermissions();
  const hasPermissionToDelete = hasPermission("ADMIN");

  return (
    <div className="flex items-center gap-2">
      {hasPermissionToDelete &&
      table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <HistoryDeleteDialog
          items={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => table.toggleAllRowsSelected(false)}
        />
      ) : null}
      <Button
        size="sm"
        variant="outline"
        className="hidden md:flex"
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
