"use client";

import { useFormContext } from "react-hook-form";

import type { NewFormData } from "./hooks/use-new-form";

import { cn } from "@/lib/utils";
import {
  fieldsWithOptions,
  fieldsWithPlaceholder,
} from "@/constants/field-configs";
import { FieldOptionsList } from "@/components/form-new/field-options/field-options-list";
import { FieldOptionsPlaceholder } from "@/components/form-new/field-options/field-options-placeholder";

interface IFormNewFieldItemOptionsProps {
  indexField: number;
  indexFormGroup: number;
}

export const FormNewFieldItemOptions = ({
  indexField,
  indexFormGroup,
}: IFormNewFieldItemOptionsProps) => {
  const { watch } = useFormContext<NewFormData>();

  const fieldType = watch(
    `formGroups.${indexFormGroup}.formFields.${indexField}.type`,
  );

  const showOptionsList = fieldsWithOptions.includes(fieldType);
  const showPlaceholderOption = fieldsWithPlaceholder.includes(fieldType);

  if (!showOptionsList && !showPlaceholderOption) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex w-full flex-1 flex-col items-start justify-start gap-6 border-y py-6 transition-all ease-linear",
      )}
    >
      {showPlaceholderOption && (
        <FieldOptionsPlaceholder
          indexField={indexField}
          indexFormGroup={indexFormGroup}
        />
      )}
      {showOptionsList && (
        <FieldOptionsList
          indexField={indexField}
          indexFormGroup={indexFormGroup}
        />
      )}
    </div>
  );
};
