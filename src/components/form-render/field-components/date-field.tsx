"use client";

import * as React from "react";
import { useMaskito } from "@maskito/react";
import { useFormContext } from "react-hook-form";

import { dateMaskOptions } from "@/lib/masks";

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

type IDateFieldProps = React.ComponentPropsWithoutRef<typeof Input> &
  FieldComponentType;

export const DateField = ({
  id,
  label,
  description,
  fieldOptions: _fieldOptions,
  ...props
}: IDateFieldProps) => {
  const { control } = useFormContext();
  const dateInputRef = useMaskito({ options: dateMaskOptions });

  return (
    <FormField
      name={id}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              ref={dateInputRef}
              onInput={field.onChange}
              placeholder="DD/MM/AAAA"
              {...props}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

DateField.displayName = "DateField";
