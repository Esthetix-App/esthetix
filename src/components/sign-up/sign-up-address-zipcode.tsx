"use client";

import { useEffect } from "react";
import { useMaskito } from "@maskito/react";
import { useFormContext } from "react-hook-form";
import { useDebounce } from "use-debounce";

import { zipcodeMaskOptions } from "@/lib/masks";
import { useGetZipcode } from "@/hooks/use-get-zipcode";
import { type SignUpFormData } from "./hooks/use-sign-up-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const SignUpAddressZipcode = () => {
  const zipcodeInputRef = useMaskito({ options: zipcodeMaskOptions });

  const { control, watch, setValue, clearErrors } =
    useFormContext<SignUpFormData>();

  const zipcode = watch("address.zipcode");
  const [debouncedZipcode] = useDebounce(zipcode, 500);

  const { zipcodeInfo } = useGetZipcode({ zipcode: debouncedZipcode });

  useEffect(() => {
    if (zipcodeInfo) {
      setValue("address.city", zipcodeInfo.city);
      setValue("address.state", zipcodeInfo.state);
      setValue("address.street", zipcodeInfo.street);
      setValue("address.neighborhood", zipcodeInfo.neighborhood);
      clearErrors([
        "address.zipcode",
        "address.city",
        "address.state",
        "address.street",
        "address.neighborhood",
      ]);
    }
  }, [zipcodeInfo, setValue, clearErrors]);

  return (
    <FormField
      control={control}
      name="address.zipcode"
      render={({ field }) => (
        <FormItem>
          <FormLabel>CEP</FormLabel>
          <FormControl>
            <Input
              placeholder="00000-000"
              {...field}
              ref={zipcodeInputRef}
              onInput={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
