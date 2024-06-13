import {
  Calendar,
  CalendarClock,
  CircleCheck,
  Image,
  ListChecks,
  ListTodo,
  PenLine,
  SquareCheck,
  Text,
  TextSearch,
  TextSelect,
} from "lucide-react";

import type { FieldTypes } from "@prisma/client";
import type { LucideIcon } from "lucide-react";

interface IFieldTypes {
  label: string;
  value: FieldTypes;
  icon?: LucideIcon;
}

export const fieldTypes: IFieldTypes[] = [
  {
    value: "TEXT",
    label: "Texto",
    icon: Text,
  },
  {
    value: "CHECKBOX",
    label: "Checkbox",
    icon: SquareCheck,
  },
  {
    value: "DATE",
    label: "Data",
    icon: Calendar,
  },
  {
    value: "DATETIME",
    label: "Data e hora",
    icon: CalendarClock,
  },
  {
    value: "DESCRIPTION",
    label: "Descrição",
    icon: TextSearch,
  },
  {
    value: "IMAGE",
    label: "Imagem",
    icon: Image,
  },
  {
    value: "SELECT",
    label: "Seleção",
    icon: ListTodo,
  },
  {
    value: "MULTI_SELECT",
    label: "Multi seleção",
    icon: ListChecks,
  },
  {
    value: "RADIO",
    label: "Radio",
    icon: CircleCheck,
  },
  {
    value: "SIGNATURE",
    label: "Assinatura",
    icon: PenLine,
  },
  {
    value: "TEXT_AREA",
    label: "Área de texto",
    icon: TextSelect,
  },
];
