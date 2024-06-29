import { type IFormSchema } from "@/validation/form";

import { FormRenderHeader } from "./form-render-header";
import { FormRenderSection } from "./form-render-section";

interface IFormRenderProps {
  data: IFormSchema;
}

export const FormRender = ({ data }: IFormRenderProps) => {
  return (
    <main className="pb-10">
      <FormRenderHeader
        title={data.title}
        logoUrl={data.logoUrl}
        description={data.description}
      />
      <div className="grid gap-10 p-6">
        {data.formGroups.map((section) => (
          <FormRenderSection key={section.name} section={section} />
        ))}
      </div>
    </main>
  );
};
