"use client";

import * as React from "react";
import { DotsHorizontalIcon, TrashIcon } from "@radix-ui/react-icons";
import { UserCog } from "lucide-react";
import { toast } from "sonner";
import { type ColumnDef } from "@tanstack/react-table";

import { api } from "@/trpc/react";
import { getInitials } from "@/lib/utils";
import { usePermissions } from "@/hooks/use-permissions";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { UsersDeleteDialog } from "@/components/users-list/users-delete-dialog";
import type { UsersGetAllOutput } from "@/components/users-list/users-data-table";

export function getColumns(): ColumnDef<UsersGetAllOutput>[] {
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
        const image = row.original.image;

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
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="E-mail" />
      ),
    },
    {
      meta: { label: "Cargo" },
      accessorKey: "role",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Cargo" />
      ),
      cell: ({ row }) => (
        <Badge variant={row.getValue("role")}>{row.getValue("role")}</Badge>
      ),
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

        const utils = api.useUtils();

        const { mutateAsync, isPending } = api.user.update.useMutation({
          async onSuccess() {
            await utils.user.getAll.invalidate();
          },
        });

        const { hasPermission } = usePermissions();
        const hasPermissionToDelete = hasPermission("ADMIN");

        const handleUpdateUser = (value: string) => {
          toast.promise(
            mutateAsync({
              id: row.original.id,
              role: value as "ADMIN" | "PROFESSIONAL",
            }),
            {
              loading: "Atualizando...",
              success: "Cargo atualizado!",
              error: "Houve um problema ao atualizar usuário.",
            },
          );
        };

        return (
          <>
            <UsersDeleteDialog
              open={showDeleteDialog}
              onOpenChange={setShowDeleteDialog}
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
              {hasPermissionToDelete && (
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="font-medium">
                      <UserCog className="mr-2 size-4" aria-hidden="true" />
                      Editar cargo
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuRadioGroup
                        value={row.original.role}
                        onValueChange={(value) => handleUpdateUser(value)}
                      >
                        <DropdownMenuRadioItem
                          value="ADMIN"
                          className="font-medium"
                          disabled={isPending}
                        >
                          Administrador
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="PROFESSIONAL"
                          className="font-medium"
                          disabled={isPending}
                        >
                          Profissional
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={() => setShowDeleteDialog(true)}
                    className="font-medium text-destructive"
                  >
                    <TrashIcon className="mr-2 size-4" aria-hidden="true" />
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          </>
        );
      },
    },
  ];
}
