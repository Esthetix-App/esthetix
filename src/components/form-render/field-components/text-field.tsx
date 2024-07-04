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
import { Input } from "@/components/ui/input";
import type { FieldComponentType } from "@/components/form-render/field-components";

type ITextFieldProps = React.ComponentPropsWithoutRef<typeof Input> &
  FieldComponentType;

export const TextField = ({
  id,
  label,
  description,
  fieldOptions: _fieldOptions,
  ...props
}: ITextFieldProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={id}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} {...props} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

TextField.displayName = "TextField";
