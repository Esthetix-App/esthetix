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
import Image from "next/image";
import { env } from "@/env";

type IImageFieldProps = FieldComponentType & {
  image?: string;
};

export const ImageField = ({
  id,
  label,
  description,
  image,
  fieldOptions: _fieldOptions,
}: IImageFieldProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={id}
      control={control}
      render={() => (
        <FormItem className="grid justify-center space-y-6">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative min-h-80 w-full">
              <Image
                fill
                loading="lazy"
                src={
                  image
                    ? `${env.NEXT_PUBLIC_BUCKET_URL}/${image}`
                    : "/images/placeholder.svg"
                }
                alt="Uploaded image"
                className="aspect-square shrink-0 object-contain"
              />
            </div>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

ImageField.displayName = "ImageField";
