"use client";

import { Form } from "@/components/ui/form";
import { Stepper, StepperActiveStep } from "@/components/ui/stepper";

import { useSignUpForm } from "./hooks/use-sign-up-form";

import { SingUpHeader } from "./sing-up-header";
import { SignUpAccountStep } from "./steps/sign-up-account-step";
import { SignUpAddressStep } from "./steps/sign-up-address-step";
import { SignUpPersonalDataStep } from "./steps/sign-up-personal-data-step";

export const SignUpForm = () => {
  const { form, onSubmit } = useSignUpForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <Stepper
          steps={[
            {
              id: "account",
              content: <SignUpAccountStep />,
            },
            {
              id: "personal-data",
              content: <SignUpPersonalDataStep />,
            },
            {
              id: "address",
              content: <SignUpAddressStep />,
            },
          ]}
        >
          <SingUpHeader />
          <StepperActiveStep />
        </Stepper>
      </form>
    </Form>
  );
};
