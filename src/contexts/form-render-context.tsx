"use client";

import type { RouterOutputs } from "@/trpc/react";
import { createContext, useMemo, useContext } from "react";

type FormRenderData = RouterOutputs["formHistory"]["getById"];

type FormRenderContextValue = Omit<FormRenderData, "status"> & {
  isPreview?: boolean;
};

export const FormRenderContext = createContext({} as FormRenderContextValue);

export function FormRenderProvider({
  children,
  values,
}: {
  children: React.ReactNode;
  values: FormRenderContextValue;
}) {
  const valuesMemo = useMemo(() => values, [values]);

  return (
    <FormRenderContext.Provider value={valuesMemo}>
      {children}
    </FormRenderContext.Provider>
  );
}

export function useFormRenderContext() {
  return useContext(FormRenderContext);
}
