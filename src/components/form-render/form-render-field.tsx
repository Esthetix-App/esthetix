import { cn } from "@/lib/utils";

import type { IFormGroupSchema } from "@/components/form-render/form-render-section";
import { fieldComponents } from "@/components/form-render/field-components";
import { useFormRenderContext } from "@/contexts/form-render-context";
import { usePermissions } from "@/hooks/use-permissions";

interface IFormRenderField {
  field: IFormGroupSchema["formFields"][number];
  isProfessionalSection?: boolean;
}

export const FormRenderField = ({
  field,
  isProfessionalSection,
}: IFormRenderField) => {
  const { isProfessionalUser, form } = useFormRenderContext();
  const { hasPermission } = usePermissions();

  const hasPermissionToFill = hasPermission("PROFESSIONAL");

  const Component = fieldComponents[field.type];

  const canFillForm = !form.filledAt || hasPermissionToFill;

  const disableField =
    !!field.isProfessionalField || isProfessionalSection
      ? !isProfessionalUser
      : !canFillForm;

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
        disabled={disableField}
        description={field.description}
        fieldOptions={field.fieldOptions}
        {...(field.typeOptions as object)}
      />
    </div>
  );
};
