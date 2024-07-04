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
import { Signature } from "@/components/ui/signature";

type ISignatureFieldProps = FieldComponentType &
  React.ComponentPropsWithoutRef<typeof Signature>;

export const SignatureField = ({
  id,
  label,
  description,
  fieldOptions: _fieldOptions,
  ...props
}: ISignatureFieldProps) => {
  const { control } = useFormContext();

  const handleFormatPoints = React.useCallback(
    (stringPoints: string): Record<string, number[][]> => {
      if (!stringPoints) return {};

      try {
        const pointsArray = JSON.parse(stringPoints) as Record<
          string,
          number[][]
        >;
        return pointsArray;
      } catch (error) {
        return {};
      }
    },
    [],
  );

  const handlePointsToString = React.useCallback(
    (points: number[][]): string => {
      try {
        const pointsString = JSON.stringify(points);
        return pointsString;
      } catch (error) {
        return "";
      }
    },
    [],
  );

  return (
    <FormField
      name={id}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Signature
              defaultPoints={handleFormatPoints(field.value as string)}
              onPointer={(points) =>
                field.onChange(handlePointsToString(points))
              }
              {...props}
            />
          </FormControl>
          <FormLabel>{label}</FormLabel>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

SignatureField.displayName = "SignatureField";
