import { z } from "zod";
import type { FieldTypes } from "@prisma/client";

import {
  stringFields,
  arrayFields,
  booleanFields,
  dateFields,
} from "@/constants/field-configs";

export interface IValidationFormField {
  id: string;
  type: FieldTypes;
  isRequired: boolean;
}

export function createValidationSchema(formFields: IValidationFormField[]) {
  const schemaObject: { [key: string]: z.ZodTypeAny } = {};

  formFields.forEach((field) => {
    let fieldSchema: z.ZodTypeAny;

    const isDateField = dateFields.includes(field.type);
    const isArrayField = arrayFields.includes(field.type);
    const isStringField = stringFields.includes(field.type);
    const isBooleanField = booleanFields.includes(field.type);

    if (isStringField) {
      fieldSchema = field.isRequired
        ? z.string().min(1, {
            message: "O campo é obrigatório",
          })
        : z.string();
    } else if (isBooleanField) {
      fieldSchema = z.boolean();
    } else if (isArrayField) {
      fieldSchema = field.isRequired
        ? z.array(z.string()).min(1, {
            message: "O campo é obrigatório",
          })
        : z.array(z.string());
    } else if (isDateField) {
      fieldSchema = z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Formato de data inválida",
      });
    } else {
      fieldSchema = z.any();
    }

    if (field.isRequired && isBooleanField) {
      fieldSchema = fieldSchema.refine((val) => val === true, {
        message: "O campo é obrigatório",
      });
    }

    schemaObject[field.id] = fieldSchema;
  });

  return z.object(schemaObject);
}
