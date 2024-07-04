import z from "zod";
import { formSchema } from "@/validation/form";

const idSchema = z.object({
  id: z.string(),
});

export const editFormSchema = idSchema.merge(formSchema);

export type IEditFormSchema = z.infer<typeof editFormSchema>;
