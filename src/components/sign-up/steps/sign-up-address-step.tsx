"use client";

import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { states } from "@/constants/states";
import { type SignUpFormData } from "../hooks/use-sign-up-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  useStepperContext,
  StepperPreviousButton,
} from "@/components/ui/stepper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { SignUpAddressZipcode } from "../sign-up-address-zipcode";
import { useCalculateStepProgress } from "../hooks/use-calculate-step-progress";

export const SignUpAddressStep = () => {
  const { changeStepProgress } = useStepperContext();
  const { control, setValue } = useFormContext<SignUpFormData>();

  const progress = useCalculateStepProgress({
    step: "address",
    totalFields: 6,
  });

  useEffect(() => {
    changeStepProgress(progress);
  }, [changeStepProgress, progress]);

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <SignUpAddressZipcode />

        <FormField
          control={control}
          name="address.state"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Combobox
                  options={states}
                  value={field.value}
                  placeholder="Nome da Estado"
                  onSelect={(currentValue) => {
                    setValue("address.state", currentValue);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={control}
          name="address.city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input placeholder="Nome da Cidade" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="address.neighborhood"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bairro</FormLabel>
              <FormControl>
                <Input placeholder="Nome do Bairro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormField
          control={control}
          name="address.street"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Rua</FormLabel>
              <FormControl>
                <Input placeholder="Nome da Rua" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="address.number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número</FormLabel>
              <FormControl>
                <Input placeholder="000" className="md:text-end" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="address.complement"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Complemento</FormLabel>
            <FormControl>
              <Input placeholder="Casa, Apto etc..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="mt-3 flex items-center justify-end gap-3  ">
        <StepperPreviousButton />
        <Button type="submit">Finalizar</Button>
      </div>
    </div>
  );
};
