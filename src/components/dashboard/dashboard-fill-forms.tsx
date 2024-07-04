"use client";

import { api } from "@/trpc/react";

import { DashboardEmpty } from "@/components/dashboard/dashboard-empty";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import { DashboardFillFormItem } from "@/components/dashboard/dashboard-fill-form-item";

export const DashboardFillForms = () => {
  const { data, isLoading, isError } = api.dashboard.getFormsToFill.useQuery();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError || !data?.forms.length) {
    return <DashboardEmpty />;
  }

  return (
    <div className="mt-6 grid gap-10">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.forms.map((form) => (
          <DashboardFillFormItem key={form.id} form={form} />
        ))}
      </div>
    </div>
  );
};
