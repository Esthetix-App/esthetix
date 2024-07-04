"use client";

import { DotsHorizontalIcon, TrashIcon } from "@radix-ui/react-icons";
import { ClipboardIcon, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

import type { RouterOutputs } from "@/trpc/react";
import { type ColumnDef } from "@tanstack/react-table";

import { env } from "@/env";
import { usePermissions } from "@/hooks/use-permissions";
import { copyTextToClipboard, getInitials } from "@/lib/utils";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HistoryDeleteDialog } from "./history-delete-dialog";
import { toast } from "sonner";

export type HistoryGetAllOutput =
  RouterOutputs["formHistory"]["getByCustomer"]["forms"][number];

export function getColumns(): ColumnDef<HistoryGetAllOutput>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value: boolean) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      meta: { label: "Nome" },
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nome" />
      ),
      cell: ({ row }) => {
        const image = row.original.logoUrl;

        return (
          <div className="flex items-center gap-4">
            <Avatar>
              {image && (
                <AvatarImage src={`${env.NEXT_PUBLIC_BUCKET_URL}/${image}`} />
              )}
              <AvatarFallback>
                {getInitials(row.getValue("title"))}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">{row.getValue("title")}</span>
          </div>
        );
      },
    },
    {
      meta: { label: "Descrição" },
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Descrição" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-4">
            <span className="max-w-xs truncate">
              {row.getValue("description")}
            </span>
          </div>
        );
      },
    },
    {
      meta: { label: "Profissional Responsável" },
      accessorKey: "professional.name",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Profissional Responsável"
        />
      ),
    },
    {
      meta: { label: "Data de preenchimento" },
      accessorKey: "filledAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Data de preenchimento" />
      ),
    },
    {
      meta: { label: "Criado em" },
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Data de criação" />
      ),
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const router = useRouter();
        const [showDeleteTaskDialog, setShowDeleteTaskDialog] =
          React.useState(false);

        const { hasPermission } = usePermissions();
        const hasPermissionToDelete = hasPermission("ADMIN");

        const handleCopy = async () => {
          const url = `${env.NEXT_PUBLIC_APP_URL}/form/${row.original.id}`;

          await copyTextToClipboard(url);
          toast.success("Link copiado para área de transferência!");
        };

        return (
          <>
            <HistoryDeleteDialog
              open={showDeleteTaskDialog}
              onOpenChange={setShowDeleteTaskDialog}
              items={[row.original]}
              showTrigger={false}
              onSuccess={() => row.toggleSelected(false)}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="Open menu"
                  variant="ghost"
                  className="flex size-8 p-0 data-[state=open]:bg-muted"
                >
                  <DotsHorizontalIcon className="size-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem className="font-medium" onSelect={handleCopy}>
                  <ClipboardIcon className="mr-2 size-4" aria-hidden="true" />
                  Copiar link
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="font-medium"
                  onSelect={() => router.push(`/s/${row.original.id}`)}
                >
                  <Eye className="mr-2 size-4" aria-hidden="true" />
                  Visualizar
                </DropdownMenuItem>
                {hasPermissionToDelete && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onSelect={() => setShowDeleteTaskDialog(true)}
                      className="font-medium text-destructive"
                    >
                      <TrashIcon className="mr-2 size-4" aria-hidden="true" />
                      Excluir
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
    },
  ];
}
