import { MixIcon, SquareIcon } from "@radix-ui/react-icons";

export type DataTableConfig = typeof dataTableConfig;

export const dataTableConfig = {
  comparisonOperators: [
    { label: "Contém", value: "ilike" as const },
    { label: "Não contém", value: "notIlike" as const },
    { label: "É", value: "eq" as const },
    { label: "Não é", value: "notEq" as const },
    { label: "Começa com", value: "startsWith" as const },
    { label: "Termina com", value: "endsWith" as const },
    { label: "Está vazio", value: "isNull" as const },
    { label: "Não está vazio", value: "isNotNull" as const },
  ],
  selectableOperators: [
    { label: "É", value: "eq" as const },
    { label: "Não é", value: "notEq" as const },
    { label: "Está vazio", value: "isNull" as const },
    { label: "Não está vazio", value: "isNotNull" as const },
  ],
  logicalOperators: [
    {
      label: "E",
      value: "and" as const,
      description: "All conditions must be met",
    },
    {
      label: "Ou",
      value: "or" as const,
      description: "At least one condition must be met",
    },
  ],
  featureFlags: [
    {
      label: "Filtro avançado",
      value: "advancedFilter" as const,
      icon: MixIcon,
      tooltipTitle: "Alternar filtro avançado",
      tooltipDescription:
        "Uma noção como construtor de consultas para filtrar linhas.",
    },
    {
      label: "Floating bar",
      value: "floatingBar" as const,
      icon: SquareIcon,
      tooltipTitle: "Alternar barra flutuante",
      tooltipDescription: "Uma barra flutuante que gruda no topo da tabela.",
    },
  ],
};
