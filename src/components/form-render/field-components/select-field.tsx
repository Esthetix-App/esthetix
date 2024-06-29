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
import { Combobox, type IComboboxOption } from "@/components/ui/combobox";

type ISelectFieldProps = Omit<
  React.ComponentPropsWithoutRef<typeof Combobox>,
  "options"
> &
  FieldComponentType;

export const SelectField = ({
  id,
  label,
  description,
  fieldOptions = [],
  ...props
}: ISelectFieldProps) => {
  const { control } = useFormContext();

  const options: IComboboxOption[] = React.useMemo(() => {
    return (
      fieldOptions?.map((option) => ({
        value: option.name,
        label: option.name,
      })) ?? []
    );
  }, [fieldOptions]);

  return (
    <FormField
      name={id}
      control={control}
      defaultValue={[]}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Combobox
              {...props}
              value={field.value as string}
              onSelect={field.onChange}
              options={options}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

SelectField.displayName = "SelectField";
