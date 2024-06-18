"use client";

import * as React from "react";
import type { DataTableFilterField } from "@/types/data-table";
import type { Customer } from "@prisma/client";
import { api } from "@/trpc/react";

import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { DataTableAdvancedToolbar } from "@/components/data-table/advanced/data-table-advanced-toolbar";

// import { getPriorityIcon, getStatusIcon } from "../_lib/utils";
import { getColumns } from "./customers-table-columns";
import { TasksTableFloatingBar } from "./tasks-table-floating-bar";
import { TasksTableToolbarActions } from "./tasks-table-toolbar-actions";

// interface TasksTableProps {
//   tasksPromise: ReturnType<typeof getTasks>;
// }

const ENABLE_ADVANCED_FILTER = false;

export function CustomersDataTable() {
  const { data } = api.customer.getAll.useQuery();

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo(() => getColumns(), []);

  /**
   * This component can render either a faceted filter or a search filter based on the `options` prop.
   *
   * @prop options - An array of objects, each representing a filter option. If provided, a faceted filter is rendered. If not, a search filter is rendered.
   *
   * Each `option` object has the following properties:
   * @prop {string} label - The label for the filter option.
   * @prop {string} value - The value for the filter option.
   * @prop {React.ReactNode} [icon] - An optional icon to display next to the label.
   * @prop {boolean} [withCount] - An optional boolean to display the count of the filter option.
   */
  const filterFields: DataTableFilterField<Customer>[] = [
    {
      label: "Nome",
      value: "name",
      placeholder: "Filter names...",
    },
    // {
    //   label: "Status",
    //   value: "",
    //   options: tasks.status.enumValues.map((status) => ({
    //     label: status[0]?.toUpperCase() + status.slice(1),
    //     value: status,
    //     icon: getStatusIcon(status),
    //     withCount: true,
    //   })),
    // },
    // {
    //   label: "Priority",
    //   value: "priority",
    //   options: tasks.priority.enumValues.map((priority) => ({
    //     label: priority[0]?.toUpperCase() + priority.slice(1),
    //     value: priority,
    //     icon: getPriorityIcon(priority),
    //     withCount: true,
    //   })),
    // },
  ];

  const { table } = useDataTable({
    columns,
    // filterFields,
    data: data?.customers ?? [],
    pageCount: data?.count ?? 0,
    enableAdvancedFilter: ENABLE_ADVANCED_FILTER,
    defaultPerPage: 10,
    // defaultSort: "createdAt.desc",
  });

  return (
    <DataTable
      table={table}
      floatingBar={<TasksTableFloatingBar table={table} />}
    >
      {ENABLE_ADVANCED_FILTER ? (
        <DataTableAdvancedToolbar table={table} filterFields={filterFields}>
          <TasksTableToolbarActions table={table} />
        </DataTableAdvancedToolbar>
      ) : (
        <DataTableToolbar table={table} filterFields={filterFields}>
          <TasksTableToolbarActions table={table} />
        </DataTableToolbar>
      )}
    </DataTable>
  );
}
