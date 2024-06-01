import Link from "next/link";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useStepperContext } from "@/components/ui/stepper";

import type { SignUpFormData } from "../hooks/use-sign-up-form";

export const SignUpAccountStep = () => {
  const { control, trigger, watch } = useFormContext<SignUpFormData>();
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
      <FormField
        control={control}
        name="account.name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome completo</FormLabel>
            <FormControl>
              <Input autoComplete="name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="account.email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>E-mail</FormLabel>
            <FormControl>
              <Input type="email" placeholder="exemplo@email.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={control}
          name="account.password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="account.confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar senha</FormLabel>
              <FormControl>
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="mt-3 flex items-center justify-end gap-3  ">
        <Button asChild variant="ghost">
          <Link href="/sign-in">Cancelar</Link>
        </Button>
        <Button onClick={handleNextStep}>Avançar</Button>
      </div>
    </div>
  );
};
