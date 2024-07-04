import { cn } from "@/lib/utils";

import type { IFormGroupSchema } from "@/components/form-render/form-render-section";
import { fieldComponents } from "@/components/form-render/field-components";
import { useFormRenderContext } from "@/contexts/form-render-context";

interface IFormRenderField {
  field: IFormGroupSchema["formFields"][number];
  isProfessionalSection?: boolean;
}

export const FormRenderField = ({
  field,
  isProfessionalSection,
}: IFormRenderField) => {
  const { isProfessionalUser } = useFormRenderContext();

  const Component = fieldComponents[field.type];

  console.log({
    isProfessionalUser,
    isProfessionalField: !!field.isProfessionalField,
  });

  if (!Component) {
    console.warn(`No component found for field type: ${field.type}`);
    return null;
  }

  return (
    <div
      className={cn(
        "col-span-1",
        field.size === "MD" && "md:col-span-2",
        field.size === "LG" && "md:col-span-3",
        field.size === "XL" && "md:col-span-4",
      )}
    >
      <Component
        id={field.id}
        label={field.name}
        description={field.description}
        fieldOptions={field.fieldOptions}
        disabled={
          !!field.isProfessionalField || isProfessionalSection
            ? !isProfessionalUser
            : false
        }
        {...(field.typeOptions as object)}
      />
    </div>
  );
};
