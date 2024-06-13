"use client";

import { Form } from "@/components/ui/form";

import { FormNewHeader } from "@/components/form-new/form-new-header";
import { FormNewDetails } from "@/components/form-new/form-new-details";
import { FormNewSections } from "@/components/form-new/form-new-sections";
import { FormNewStatusCard } from "@/components/form-new/form-new-status-card";
import { FormNewLogoUpload } from "@/components/form-new/form-new-logo-upload";
import { FormNewFooterMobile } from "@/components/form-new/form-new-footer-mobile";

import { useNewForm } from "./hooks/use-new-form";

export const FormNew = () => {
  const { form, onSubmit } = useNewForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="container grid h-full flex-1 auto-rows-max gap-4"
      >
        <FormNewHeader />
        <div className="mt-6 grid gap-4 pb-16 md:grid-cols-[1fr_250px] lg:grid-cols-4 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-3 lg:gap-8">
            <FormNewDetails />
            <FormNewSections />
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <FormNewStatusCard />
            <FormNewLogoUpload />
          </div>
        </div>
        <FormNewFooterMobile />
      </form>
    </Form>
  );
};
