"use client";

import * as React from "react";
import { TrashIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { Eye, FilePenLine } from "lucide-react";

import type { RouterOutputs } from "@/trpc/react";
import { type ColumnDef } from "@tanstack/react-table";

import { getInitials } from "@/lib/utils";
import { usePermissions } from "@/hooks/use-permissions";
import { env } from "@/env";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FormsDeleteDialog } from "../form-list/form-delete-dialog";

export type FormsGetAllOutput =
  RouterOutputs["form"]["getAll"]["forms"][number];

export function getColumns(): ColumnDef<FormsGetAllOutput>[] {
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
      meta: { label: "Editado por" },
      accessorKey: "updatedBy",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Editado por" />
      ),
      cell: ({ row }) => {
        const image = row.original.updatedByUser?.image;
        const name = row.original.updatedByUser?.name;

        return (
          <div className="flex items-center gap-4">
            <Avatar>
              {image && (
                <AvatarImage src={`${env.NEXT_PUBLIC_BUCKET_URL}/${image}`} />
              )}
              <AvatarFallback>{getInitials(name || "")}</AvatarFallback>
            </Avatar>
            <span>{name}</span>
          </div>
        );
      },
    },
    {
      meta: { label: "Editado em" },
      accessorKey: "updatedAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Editado em" />
      ),
    },
    {
      meta: { label: "Criado em" },
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Criado em" />
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

        return (
          <>
            <FormsDeleteDialog
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
                <DropdownMenuItem
                  className="font-medium"
                  onSelect={() => router.push(`/forms/edit/${row.original.id}`)}
                >
                  <FilePenLine className="mr-2 size-4" aria-hidden="true" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="font-medium"
                  onSelect={() => router.push(`/s/${row.original.id}`)}
                >
                  <Eye className="mr-2 size-4" aria-hidden="true" />
                  Preview
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
