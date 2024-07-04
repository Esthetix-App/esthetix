import type { RouterOutputs } from "@/trpc/react";
import { FormRenderHeader } from "./form-render-header";
import { FormRenderSection } from "./form-render-section";
import { FormRenderProvider } from "@/contexts/form-render-context";
import { FormRenderFooter } from "@/components/form-render/form-render-footer";

export type FormDataType = Omit<
  RouterOutputs["formHistory"]["getById"],
  "status"
>;
interface IFormRenderProps {
  data: FormDataType;
  isPreview?: boolean;
  showActions?: boolean;
}

export const FormRender = ({
  data,
  isPreview,
  showActions = true,
}: IFormRenderProps) => {
  return (
    <FormRenderProvider values={{ ...data, isPreview }}>
      <main className="pb-10">
        <FormRenderHeader />

        <div className="grid gap-10 p-6">
          {data.form.formGroups.map((section) => (
            <FormRenderSection key={section.id} section={section} />
          ))}
        </div>

        {showActions && <FormRenderFooter />}
      </main>
    </FormRenderProvider>
  );
};
