import { type DataTableConfig } from "@/config/data-table";

export function filterColumn({
  column,
  value,
  isSelectable,
}: {
  column: string;
  value: string;
  isSelectable?: boolean;
}) {
  const [filterValue, filterOperator] = (value?.split("~").filter(Boolean) ??
    []) as [
    string,
    DataTableConfig["comparisonOperators"][number]["value"] | undefined,
  ];

  if (!filterValue) return;

  if (isSelectable) {
    switch (filterOperator) {
      case "eq":
        return {
          [column]: {
            in: filterValue?.split(".").filter(Boolean) ?? [],
          },
        };
      case "notEq":
        return {
          [column]: {
            notIn: filterValue?.split(".").filter(Boolean) ?? [],
          },
        };
      case "isNull":
        return {
          [column]: null,
        };
      case "isNotNull":
        return {
          NOT: {
            [column]: null,
          },
        };
      default:
        return {
          [column]: {
            in: filterValue?.split(".") ?? [],
          },
        };
    }
  }

  switch (filterOperator) {
    case "ilike":
      return {
        [column]: {
          contains: filterValue,
          mode: "insensitive",
        },
      };
    case "notIlike":
      return {
        NOT: {
          [column]: {
            contains: filterValue,
            mode: "insensitive",
          },
        },
      };
    case "startsWith":
      return {
        [column]: {
          startsWith: filterValue,
          mode: "insensitive",
        },
      };
    case "endsWith":
      return {
        [column]: {
          endsWith: filterValue,
          mode: "insensitive",
        },
      };
    case "eq":
      return {
        [column]: filterValue,
      };
    case "notEq":
      return {
        NOT: {
          [column]: filterValue,
        },
      };
    case "isNull":
      return {
        [column]: null,
      };
    case "isNotNull":
      return {
        NOT: {
          [column]: null,
        },
      };
    default:
      return {
        [column]: {
          contains: filterValue,
          mode: "insensitive",
        },
      };
  }
}
