"use client";

import { DownloadIcon, PlusIcon } from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";

import { exportTableToCSV } from "@/lib/export";
import { usePermissions } from "@/hooks/use-permissions";

import { Button } from "@/components/ui/button";
import { UsersDeleteDialog } from "./users-delete-dialog";
import type { UsersGetAllOutput } from "@/components/users-list/users-data-table";
import Link from "next/link";

interface UsersTableToolbarActionsProps {
  table: Table<UsersGetAllOutput>;
}

export function UsersTableToolbarActions({
  table,
}: UsersTableToolbarActionsProps) {
  const { hasPermission } = usePermissions();
  const hasPermissionToDelete = hasPermission("ADMIN");

  return (
    <div className="flex items-center gap-2">
      {hasPermissionToDelete &&
      table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <UsersDeleteDialog
          items={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => table.toggleAllRowsSelected(false)}
        />
      ) : null}
      <Button asChild size="sm">
        <Link href="/users/new">
          <PlusIcon className="mr-2 size-4" aria-hidden="true" />
          Adicionar Usuário
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
