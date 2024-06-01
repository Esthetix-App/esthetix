"use client";

import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useSignInForm } from "./hooks/use-sign-in-form";
import { PasswordInput } from "../ui/password-input";

export const SignInForm = () => {
  const { form, onSubmit } = useSignInForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="exemplo@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
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

        <Button
          type="submit"
          className="mt-4 w-full"
          disabled={form.formState.isSubmitting}
        >
          Entrar
        </Button>
        <Button variant="outline" asChild className="w-full">
          <Link href="/sign-up">Criar conta</Link>
        </Button>
      </form>
    </Form>
  );
};
