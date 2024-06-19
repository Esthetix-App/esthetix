"use client";

import { DownloadIcon, PlusIcon } from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";

import { exportTableToCSV } from "@/lib/export";
import { Button } from "@/components/ui/button";

import { CustomersDeleteDialog } from "./customers-delete-dialog";
import type { CustomerGetAllOutput } from "./customers-table-columns";

interface CustomersTableToolbarActionsProps {
  table: Table<CustomerGetAllOutput>;
}

export function CustomersTableToolbarActions({
  table,
}: CustomersTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <CustomersDeleteDialog
          items={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => table.toggleAllRowsSelected(false)}
        />
      ) : null}
      <Button size="sm">
        <PlusIcon className="mr-2 size-4" aria-hidden="true" />
        Novo Agendamento
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
      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  );
}
