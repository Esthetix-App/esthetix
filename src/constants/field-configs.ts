import type { FieldTypes } from "@prisma/client";

export const fieldsWithOptions: Partial<FieldTypes>[] = [
  "RADIO",
  "SELECT",
  "MULTI_SELECT",
];

export const fieldsWithPlaceholder: Partial<FieldTypes>[] = [
  "TEXT",
  "TEXT_AREA",
  "DATE",
  "SELECT",
  "MULTI_SELECT",
];

export const fieldsWithUpload: Partial<FieldTypes>[] = ["IMAGE"];
