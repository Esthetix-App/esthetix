import { filterColumn } from "./filter-column";

type Filter = {
  column: string;
  value: string;
  isSelectable?: boolean;
};

export function buildWhereClause(
  filters: Filter[],
  operator: "and" | "or" = "and",
) {
  const formattedFilters = filters
    .map((filter) => filterColumn(filter))
    .filter(Boolean);

  if (formattedFilters.length === 0) {
    return {};
  }

  return {
    [operator.toUpperCase()]: formattedFilters,
  };
}
