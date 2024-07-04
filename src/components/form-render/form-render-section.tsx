import { FormRenderField } from "@/components/form-render/form-render-field";
import type { RouterOutputs } from "@/trpc/react";

export type IFormGroupSchema =
  RouterOutputs["formHistory"]["getById"]["form"]["formGroups"][number];
interface IFormRenderSection {
  section: IFormGroupSchema;
}

export const FormRenderSection = ({ section }: IFormRenderSection) => {
  return (
    <section>
      <h2 className="border-b-4 border-primary pb-2 text-lg font-bold uppercase">
        {section.title}
      </h2>
      <div className="mt-5 grid grid-cols-1 gap-4 gap-y-6 md:grid-cols-4">
        {section.formFields.map((field) => (
          <FormRenderField
            key={field.id}
            field={field}
            isProfessionalSection={!!section.isProfessionalField}
          />
        ))}
      </div>
    </section>
  );
};
