import { BarChart } from "lucide-react";
import { useFormContext } from "react-hook-form";

import type { NewFormData } from "./hooks/use-new-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const FormNewStatusCard = () => {
  const { control, watch } = useFormContext<NewFormData>();

  const isEnabled = watch("enable");

  return (
    <Card className="border-b-4 border-b-primary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="size-4 text-primary" />
          Status do Formulário
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <FormField
            control={control}
            name="enable"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer">
                    {isEnabled ? "Formulário Ativo" : "Formulário Inativo"}
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};
