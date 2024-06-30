"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";

import {
  FormItem,
  FormField,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import type { FieldComponentType } from "@/components/form-render/field-components";

type IDescriptionFieldProps = FieldComponentType;

export const DescriptionField = ({
  id,
  label,
  description,
  fieldOptions: _fieldOptions,
}: IDescriptionFieldProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={id}
      control={control}
      render={() => (
        <FormItem>
          <FormControl>
            <p>{label}</p>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

DescriptionField.displayName = "DescriptionField";
