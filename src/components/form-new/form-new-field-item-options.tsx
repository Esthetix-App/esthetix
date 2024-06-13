"use client";

import { useFormContext } from "react-hook-form";
import { Reorder, useDragControls } from "framer-motion";
import { GripVerticalIcon, Trash } from "lucide-react";

import type { FieldTypes } from "@prisma/client";
import type { IFormFieldSchema } from "@/validation/form";
import type { NewFormData } from "./hooks/use-new-form";

import { cn } from "@/lib/utils";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { fieldTypes } from "@/constants/field-types";
import { ProfessionalFieldTooltip } from "@/components/professional-field-tooltip";

interface IFormNewFieldItemOptionsProps {
  indexField: number;
  indexFormGroup: number;
}

export const FormNewFieldItemOptions = ({
  indexField,
  indexFormGroup,
}: IFormNewFieldItemOptionsProps) => {
  const { control, setValue, watch } = useFormContext<NewFormData>();

  return (
    <div
      className={cn(
        "flex flex-col gap-6 border-y py-6 transition-all ease-linear",
      )}
    >
      <span className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Opções do campo
      </span>
    </div>
  );
};
