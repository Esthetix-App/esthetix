import type { IFormFieldSchema } from "@/validation/form";

import { fieldComponents } from "@/components/form-render/field-components";
import { cn } from "@/lib/utils";

interface IFormRenderField {
  field: IFormFieldSchema;
}

export const FormRenderField = ({ field }: IFormRenderField) => {
  const Component = fieldComponents[field.type];

  if (!Component) {
    console.warn(`No component found for field type: ${field.type}`);
    return null;
  }

  console.log(field);

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
        id={field.name}
        label={field.name}
        description={field.description}
        fieldOptions={field.fieldOptions}
        {...field.typeOptions}
      />
    </div>
  );
};
