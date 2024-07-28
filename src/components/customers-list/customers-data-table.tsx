"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import type { DataTableFilterField } from "@/types/data-table";

import { api } from "@/trpc/react";
import { useDataTable } from "@/hooks/use-data-table";
import { searchParamsSchema } from "@/validation/get-customers";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import {
  getColumns,
  type CustomerGetAllOutput,
} from "./customers-table-columns";
import { CustomersTableFloatingBar } from "./customers-table-floating-bar";
import { CustomersTableToolbarActions } from "./customers-table-toolbar-actions";

const ENABLE_ADVANCED_FILTER = false;

export function CustomersDataTable() {
  const searchParams = useSearchParams();
  const searchObject = Object.fromEntries(searchParams.entries());
  const search = searchParamsSchema.parse(searchObject);

  const { data, isPending } = api.customer.getAll.useQuery(search, {
    staleTime: 0,
    gcTime: 0,
  });

  const customers = data?.customers ?? [];
  const columns = React.useMemo(() => getColumns(), []);

  const filterFields: DataTableFilterField<CustomerGetAllOutput>[] = [
    {
      label: "Nome",
      value: "name",
      placeholder: "Pesquisar...",
    },
  ];

  const { table } = useDataTable({
    data: customers ?? [],
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
    <DataTable
      table={table}
      floatingBar={<CustomersTableFloatingBar table={table} />}
    >
      <DataTableToolbar table={table} filterFields={filterFields}>
        <CustomersTableToolbarActions table={table} />
      </DataTableToolbar>
    </DataTable>
  );
}
