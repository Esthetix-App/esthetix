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
import { type DateTimePicker } from "@/components/ui/datetime-picker";

type IDateTimeFieldProps = FieldComponentType;

export const DateTimeField = ({
  id,
  label,
  description,
  fieldOptions: _fieldOptions,
  ...props
}: IDateTimeFieldProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={id}
      control={control}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {/* <DateTimePicker
              date={field.value}
              setDate={field.onChange}
              {...props}
            /> */}
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

DateTimeField.displayName = "DateTimeField";
