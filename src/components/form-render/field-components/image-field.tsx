"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";

import {
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import type { FieldComponentType } from "@/components/form-render/field-components";

type IImageFieldProps = FieldComponentType;

export const ImageField = ({
  id,
  label,
  description,
  fieldOptions: _fieldOptions,
}: IImageFieldProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={id}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <p>{field.value}</p>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

ImageField.displayName = "ImageField";
