"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";

import {
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface IFieldOptionsPlaceholder {
  indexField: number;
  indexFormGroup: number;
}

export const FieldOptionsPlaceholder = ({
  indexField,
  indexFormGroup,
}: IFieldOptionsPlaceholder) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={`formGroups.${indexFormGroup}.formFields.${indexField}.typeOptions.placeholder`}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>Placeholder</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="Informe o placeholder do campo"
              value={field.value ?? ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
