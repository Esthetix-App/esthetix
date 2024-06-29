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
import { Checkbox } from "@/components/ui/checkbox";
import type { FieldComponentType } from "@/components/form-render/field-components";

type ICheckboxFieldProps = React.ComponentPropsWithoutRef<typeof Checkbox> &
  FieldComponentType;

export const CheckboxField = ({
  id,
  label,
  description,
  fieldOptions: _fieldOptions,
  ...props
}: ICheckboxFieldProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={id}
      control={control}
      defaultValue={false}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox
              checked={field.value as boolean}
              onCheckedChange={field.onChange}
              {...props}
            />
          </FormControl>
          <div className="space-y-2 leading-none">
            <FormLabel>{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

CheckboxField.displayName = "CheckboxField";
