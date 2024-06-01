import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  useStepperContext,
  StepperPreviousButton,
} from "@/components/ui/stepper";
import { useFormContext } from "react-hook-form";
import { type SignUpFormData } from "../hooks/use-sign-up-form";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";

export const SignUpAddressStep = () => {
  const { control, trigger, watch, setValue } =
    useFormContext<SignUpFormData>();
  const { nextStep, changeStepProgress } = useStepperContext();

  const handleNextStep = async () => {
    const isValid = await trigger("address", { shouldFocus: true });

    if (isValid) {
      nextStep();
    }
  };
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormField
          control={control}
          name="address.zipcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <Input placeholder="00000-000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="address.state"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Combobox />
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
            <FormItem className="col-span-2">
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
              <FormLabel>Numero</FormLabel>
              <FormControl>
                <Input placeholder="000" className="text-end" {...field} />
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
        <Button onClick={handleNextStep}>Avançar</Button>
      </div>
    </div>
  );
};
