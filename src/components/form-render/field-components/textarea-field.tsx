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
import { Textarea } from "@/components/ui/textarea";
import type { FieldComponentType } from "@/components/form-render/field-components";

type ITextAreaFieldProps = React.ComponentPropsWithoutRef<typeof Textarea> &
  FieldComponentType;

export const TextAreaField = ({
  id,
  label,
  description,
  fieldOptions: _fieldOptions,
  ...props
}: ITextAreaFieldProps) => {
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
            <Textarea rows={7} {...field} {...props} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

TextAreaField.displayName = "TextAreaField";
