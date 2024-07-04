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
import { MultipleSelector, type Option } from "@/components/ui/multiselect";

type IMultiSelectFieldProps = FieldComponentType &
  React.ComponentPropsWithoutRef<typeof MultipleSelector>;

export const MultiSelectField = ({
  id,
  label,
  description,
  fieldOptions = [],
  ...props
}: IMultiSelectFieldProps) => {
  const { control } = useFormContext();

  const options: Option[] = React.useMemo(() => {
    return (
      fieldOptions?.map((option) => ({
        value: option.name,
        label: option.name,
      })) ?? []
    );
  }, [fieldOptions]);

  const handleFormatValues = (values: string[]): Option[] => {
    if (!values) return [];

    if (typeof values === "string") {
      return [{ label: values, value: values }];
    }

    return values?.map((value) => ({
      label: value,
      value,
    }));
  };

  const handleConvertToStringArray = (values: Option[]): string[] => {
    return values.map(({ value }) => value);
  };

  return (
    <FormField
      name={id}
      control={control}
      defaultValue={[]}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <MultipleSelector
              {...props}
              defaultOptions={options}
              value={handleFormatValues(field.value as string[])}
              onChange={(values) =>
                field.onChange(handleConvertToStringArray(values))
              }
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

MultiSelectField.displayName = "MultiSelectField";
