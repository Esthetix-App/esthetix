import { Columns2, Columns3, Columns4, Square } from "lucide-react";

import type { FieldSize } from "@prisma/client";
import type { LucideIcon } from "lucide-react";

interface IFieldSizes {
  label: string;
  value: FieldSize;
  icon?: LucideIcon;
}

export const fieldSizes: IFieldSizes[] = [
  {
    value: "SM",
    label: "1/4",
    icon: Square,
  },
  {
    value: "MD",
    label: "2/4",
    icon: Columns2,
  },
  {
    value: "LG",
    label: "3/4",
    icon: Columns3,
  },
  {
    value: "XL",
    label: "4/4",
    icon: Columns4,
  },
];
