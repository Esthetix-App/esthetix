"use client";

import * as React from "react";
import Image from "next/image";

import { env } from "@/env";
import type { FieldComponentType } from "@/components/form-render/field-components";

import { FormLabel, FormDescription } from "@/components/ui/form";

type IImageFieldProps = FieldComponentType & {
  image?: string;
};

export const ImageField = ({
  label,
  description,
  image,
  fieldOptions: _fieldOptions,
}: IImageFieldProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-6">
      <FormLabel>{label}</FormLabel>
      <div className="relative min-h-80 w-full min-w-full">
        <Image
          fill
          loading="lazy"
          src={
            image
              ? `${env.NEXT_PUBLIC_BUCKET_URL}/${image}`
              : "/images/placeholder.svg"
          }
          alt="Uploaded image"
          className="h-full w-full object-contain"
        />
      </div>
      <FormDescription>{description}</FormDescription>
    </div>
  );
};

ImageField.displayName = "ImageField";
