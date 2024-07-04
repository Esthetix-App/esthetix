import type { FieldTypes } from "@prisma/client";

export const fieldsWithOptions: FieldTypes[] = [
  "RADIO",
  "SELECT",
  "MULTI_SELECT",
];

export const fieldsWithPlaceholder: FieldTypes[] = [
  "TEXT",
  "TEXT_AREA",
  "DATE",
  "SELECT",
  "MULTI_SELECT",
];

export const fieldsWithUpload: FieldTypes[] = ["IMAGE"];

export const dateFields: FieldTypes[] = ["DATE"];
export const arrayFields: FieldTypes[] = ["MULTI_SELECT"];
export const stringFields: FieldTypes[] = [
  "RADIO",
  "SELECT",
  "SIGNATURE",
  "TEXT",
  "TEXT_AREA",
];
export const booleanFields: FieldTypes[] = ["CHECKBOX"];
