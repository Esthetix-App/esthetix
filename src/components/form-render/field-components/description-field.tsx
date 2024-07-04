"use client";

import * as React from "react";

import {
  FormItem,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import type { FieldComponentType } from "@/components/form-render/field-components";

type IDescriptionFieldProps = FieldComponentType;

export const DescriptionField = ({
  label,
  description,
  fieldOptions: _fieldOptions,
}: IDescriptionFieldProps) => {
  return (
    <FormItem>
      <FormControl>
        <p>{label}</p>
      </FormControl>
      <FormDescription>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  );
};

DescriptionField.displayName = "DescriptionField";
