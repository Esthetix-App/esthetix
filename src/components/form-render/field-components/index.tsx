import type { IFormFieldSchema } from "@/validation/form";

import { TextField } from "@/components/form-render/field-components/text-field";
import { CheckboxField } from "@/components/form-render/field-components/checkbox-field";
import { DateField } from "@/components/form-render/field-components/date-field";
import { DescriptionField } from "@/components/form-render/field-components/description-field";
import { ImageField } from "@/components/form-render/field-components/image-field";
import { RadioField } from "@/components/form-render/field-components/radio-field";
import { TextAreaField } from "@/components/form-render/field-components/textarea-field";
import { SignatureField } from "@/components/form-render/field-components/signature-field";
import { MultiSelectField } from "@/components/form-render/field-components/multiselect-field";
import { SelectField } from "@/components/form-render/field-components/select-field";

type FieldTypes = IFormFieldSchema["type"];
type FieldOptions = IFormFieldSchema["fieldOptions"];

export type FieldComponentType = {
  id: string;
  label?: string;
  description?: string | null;
  disabled?: boolean;
  fieldOptions?: FieldOptions;
};

type FieldComponentMap = {
  [key in FieldTypes]: React.FC<FieldComponentType>;
};

export const fieldComponents: FieldComponentMap = {
  TEXT: TextField,
  CHECKBOX: CheckboxField,
  DATE: DateField,
  DESCRIPTION: DescriptionField,
  IMAGE: ImageField,
  MULTI_SELECT: MultiSelectField,
  RADIO: RadioField,
  SELECT: SelectField,
  SIGNATURE: SignatureField,
  TEXT_AREA: TextAreaField,
};
