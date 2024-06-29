"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  DotsHorizontalIcon,
  TrashIcon,
  AvatarIcon,
} from "@radix-ui/react-icons";
import { formatPhoneNumber } from "react-phone-number-input";

import type { RouterOutputs } from "@/trpc/react";
import { type ColumnDef } from "@tanstack/react-table";

import { getInitials } from "@/lib/utils";
import { usePermissions } from "@/hooks/use-permissions";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { CustomersDeleteDialog } from "./customers-delete-dialog";

export type CustomerGetAllOutput =
  RouterOutputs["customer"]["getAll"]["customers"][number];

export function getColumns(): ColumnDef<CustomerGetAllOutput>[] {
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
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nome" />
      ),
      cell: ({ row }) => {
        const image = row.original.user.image;

        return (
          <div className="flex items-center gap-4">
            <Avatar>
              {image && <AvatarImage src={image} />}
              <AvatarFallback>
                {getInitials(row.getValue("name"))}
              </AvatarFallback>
            </Avatar>
            <span>{row.getValue("name")}</span>
          </div>
        );
      },
    },
    {
      meta: { label: "E-mail" },
      accessorKey: "user.email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="E-mail" />
      ),
    },
    {
      meta: { label: "Telefone" },
      accessorKey: "cellphone",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Telefone" />
      ),
      cell: ({ row }) => (
        <div>{formatPhoneNumber(row.getValue("cellphone"))}</div>
      ),
    },
    {
      meta: { label: "Data de nascimento" },
      accessorKey: "birthdate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Data de nascimento" />
      ),
      cell: ({ row }) => (
        <div className="w-32 text-center">{row.getValue("birthdate")}</div>
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
            <CustomersDeleteDialog
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
                  onSelect={() => router.push(`/customers/${row.original.id}`)}
                >
                  <AvatarIcon className="mr-2 size-4" aria-hidden="true" />
                  Detalhes
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
