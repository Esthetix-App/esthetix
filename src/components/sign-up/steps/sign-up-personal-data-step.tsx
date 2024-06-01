import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import type { MaskitoOptions } from "@maskito/core";
import { useMaskito } from "@maskito/react";
import { maskitoDateOptionsGenerator } from "@maskito/kit";

const options: MaskitoOptions = maskitoDateOptionsGenerator({
  mode: "dd/mm/yyyy",
  separator: "/",
  min: new Date(1900, 0, 1),
}) as MaskitoOptions;

const cpfOptions: MaskitoOptions = {
  mask: [
    /\d/,
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
  ],
};

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  StepperPreviousButton,
  useStepperContext,
} from "@/components/ui/stepper";

import type { SignUpFormData } from "../hooks/use-sign-up-form";
import { PhoneInput } from "@/components/ui/phone-input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const SignUpPersonalDataStep = () => {
  const maskedInputRef = useMaskito({ options });
  const cpfmaskedInputRef = useMaskito({ options: cpfOptions });
  const { control, trigger, watch, setValue } =
    useFormContext<SignUpFormData>();
  const { nextStep, changeStepProgress } = useStepperContext();

  const stepFields = watch("account");

  const calculateProgress = () => {
    const totalFields = Object.entries(stepFields).length;
    const filledFields = Object.values(stepFields).filter(Boolean).length;
    return (filledFields / totalFields) * 100;
  };

  const progress = calculateProgress();

  useEffect(() => {
    changeStepProgress(progress);
  }, [changeStepProgress, progress]);

  const handleNextStep = async () => {
    const isValid = await trigger("account", { shouldFocus: true });

    if (isValid) {
      nextStep();
    }
  };

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={control}
          name="personalData.cpf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPF</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="000.000.000-00"
                  ref={cpfmaskedInputRef}
                  onInput={(evt) => {
                    setValue("personalData.cpf", evt.currentTarget.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="personalData.bithdate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>RG</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="00.000.000-0"
                  ref={maskedInputRef}
                  onInput={(evt) => {
                    setValue("personalData.rg", evt.currentTarget.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="personalData.bithdate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Data de nascimento</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="DD/MM/AAAA"
                ref={maskedInputRef}
                onInput={(evt) => {
                  setValue("personalData.bithdate", evt.currentTarget.value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="personalData.cellphone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Celular</FormLabel>
            <FormControl>
              <PhoneInput
                defaultCountry="BR"
                placeholder="Insira um número de telefone"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="personalData.howMet"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Como você nos conheceu?</FormLabel>
            <FormControl>
              <ToggleGroup
                type="single"
                variant="outline"
                defaultValue={field.value}
                onValueChange={field.onChange}
                className="mt-2 justify-start gap-2"
              >
                <ToggleGroupItem value="Instagram" aria-label="Instagram">
                  Instagram
                </ToggleGroupItem>
                <ToggleGroupItem value="Facebook" aria-label="Facebook">
                  Facebook
                </ToggleGroupItem>
                <ToggleGroupItem value="Google" aria-label="Google">
                  Google
                </ToggleGroupItem>
                <ToggleGroupItem value="Indicação" aria-label="Indicação">
                  Indicação
                </ToggleGroupItem>
                <ToggleGroupItem value="Outros" aria-label="Outros">
                  Outros
                </ToggleGroupItem>
              </ToggleGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="mt-3 flex items-center justify-end gap-3  ">
        <StepperPreviousButton />
        <Button onClick={handleNextStep}>Avançar</Button>
      </div>
    </div>
  );
};
