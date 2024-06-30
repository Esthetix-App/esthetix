"use client";

import { RouterOutputs, api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";
import * as React from "react";

import {
  getColumns,
  type HistoryGetAllOutput,
} from "@/components/customer-history-list/history-table-columns";
import type { DataTableFilterField } from "@/types/data-table";

import { useDataTable } from "@/hooks/use-data-table";
import { searchParamsSchema } from "@/validation/get-customer-history";

import { DataTableAdvancedToolbar } from "@/components/data-table/advanced/data-table-advanced-toolbar";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { HistoryTableFloatingBar } from "./history-table-floating-bar";
import { HistoryTableToolbarActions } from "./history-table-toolbar-actions";

const ENABLE_ADVANCED_FILTER = false;

type CustomerGetById = RouterOutputs["customer"]["getById"]["customer"];

interface IHistoryDataTableProps {
  customer: CustomerGetById;
}

export function HistoryDataTable({ customer }: IHistoryDataTableProps) {
  const searchParams = useSearchParams();
  const searchObject = Object.fromEntries(searchParams.entries());
  const search = searchParamsSchema.parse(searchObject);

  const { data, isPending } = api.formHistory.getByCustomer.useQuery({...search, customerId: customer.id});

  const forms = data?.forms ?? [];
  const columns = React.useMemo(() => getColumns(), []);

  const filterFields: DataTableFilterField<HistoryGetAllOutput>[] = [
    {
      label: "Nome",
      value: "title",
      placeholder: "Pesquisar...",
    },
  ];

  const { table } = useDataTable({
    data: forms,
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
          floatingBar={<HistoryTableFloatingBar table={table} />}
        >
          {ENABLE_ADVANCED_FILTER ? (
            <DataTableAdvancedToolbar table={table} filterFields={filterFields}>
              <HistoryTableToolbarActions table={table} />
            </DataTableAdvancedToolbar>
          ) : (
            <DataTableToolbar table={table} filterFields={filterFields}>
              <HistoryTableToolbarActions table={table} />
            </DataTableToolbar>
          )}
        </DataTable>
  );
}
