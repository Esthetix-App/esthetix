"use client";

import type { DataTableFilterField } from "@/types/data-table";
import { useSearchParams } from "next/navigation";
import * as React from "react";

import { useDataTable } from "@/hooks/use-data-table";
import { api } from "@/trpc/react";
import { searchParamsSchema } from "@/validation/get-forms";

import { DataTableAdvancedToolbar } from "@/components/data-table/advanced/data-table-advanced-toolbar";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { FormListEmpty } from "./form-list-empty";
import {
  FormsGetAllOutput,
  getColumns
} from "./form-table-columns";
import { FormsTableFloatingBar } from "./form-table-floating-bar";
import { FormTableToolbarActions } from "./form-table-toolbar-actions";

const ENABLE_ADVANCED_FILTER = false;

export function FormsDataTable() {
  const searchParams = useSearchParams();
  const searchObject = Object.fromEntries(searchParams.entries());
  const search = searchParamsSchema.parse(searchObject);

  const { data, isPending } = api.form.getAll.useQuery(search);

  const forms = data?.forms ?? [];
  const columns = React.useMemo(() => getColumns(), []);

  const filterFields: DataTableFilterField<FormsGetAllOutput>[] = [
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
    <>
      {!isPending && forms.length <= 0 ? (
        <FormListEmpty />
      ) : (
        <DataTable
      table={table}
      floatingBar={<FormsTableFloatingBar table={table} />}
    >
      {ENABLE_ADVANCED_FILTER ? (
        <DataTableAdvancedToolbar table={table} filterFields={filterFields}>
          <FormTableToolbarActions table={table} />
        </DataTableAdvancedToolbar>
      ) : (
        <DataTableToolbar table={table} filterFields={filterFields}>
          <FormTableToolbarActions table={table} />
        </DataTableToolbar>
      )}
    </DataTable>
      )}
    </>
  );
}
