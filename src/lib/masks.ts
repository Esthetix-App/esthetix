import type { MaskitoOptions } from "@maskito/core";
import { maskitoDateOptionsGenerator } from "@maskito/kit";

const dateMaskOptions: MaskitoOptions = maskitoDateOptionsGenerator({
  mode: "dd/mm/yyyy",
  separator: "/",
  min: new Date(1900, 0, 1),
}) as MaskitoOptions;

const cpfMaskOptions: MaskitoOptions = {
  mask: [
    /\d/,
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    ".",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
  ],
};

const zipcodeMaskOptions: MaskitoOptions = {
  mask: [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/],
};
export { cpfMaskOptions, dateMaskOptions, zipcodeMaskOptions };
