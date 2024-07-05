"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import type { DataTableFilterField } from "@/types/data-table";

import { api, type RouterOutputs } from "@/trpc/react";
import { useDataTable } from "@/hooks/use-data-table";
import { searchParamsSchema } from "@/validation/get-customers";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { getColumns } from "./users-table-columns";
import { UsersTableFloatingBar } from "./users-table-floating-bar";
import { UsersTableToolbarActions } from "./users-table-toolbar-actions";
import { UserListEmpty } from "@/components/users-list/users-list-empty";

const ENABLE_ADVANCED_FILTER = false;

export type UsersGetAllOutput =
  RouterOutputs["user"]["getAll"]["users"][number];

export function UsersDataTable() {
  const searchParams = useSearchParams();
  const searchObject = Object.fromEntries(searchParams.entries());
  const search = searchParamsSchema.parse(searchObject);

  const { data, isPending } = api.user.getAll.useQuery(search);

  const users = data?.users ?? [];
  const columns = React.useMemo(() => getColumns(), []);

  const filterFields: DataTableFilterField<UsersGetAllOutput>[] = [
    {
      label: "Nome",
      value: "name",
      placeholder: "Pesquisar...",
    },
  ];

  const { table } = useDataTable({
    data: users ?? [],
    columns,
    filterFields,
    defaultPerPage: 10,
    pageCount: data?.pageCount ?? 0,
    enableAdvancedFilter: ENABLE_ADVANCED_FILTER,
  });

  if (isPending) {
    return (
      <DataTableSkeleton
        columnCount={5}
        searchableColumnCount={1}
        filterableColumnCount={2}
        cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
        shrinkZero
      />
    );
  }

  return (
    <>
      {!isPending && users.length <= 0 ? (
        <UserListEmpty />
      ) : (
        <DataTable
          table={table}
          floatingBar={<UsersTableFloatingBar table={table} />}
        >
          <DataTableToolbar table={table} filterFields={filterFields}>
            <UsersTableToolbarActions table={table} />
          </DataTableToolbar>
        </DataTable>
      )}
    </>
  );
}
