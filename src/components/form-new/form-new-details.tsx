"use client";

import { Info } from "lucide-react";
import { useFormContext } from "react-hook-form";

import type { NewFormData } from "./hooks/use-new-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const FormNewDetails = () => {
  const { control } = useFormContext<NewFormData>();

  return (
    <Card className="pb-6 border-b-4 border-b-primary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="size-4 text-primary" />
          Detalhes do Formulário
        </CardTitle>
        <CardDescription>
          Preencha os campos abaixo com as informações do novo formulário.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Infrome o nome do formulário"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Infrome a descrição do formulário"
                    className="min-h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};
