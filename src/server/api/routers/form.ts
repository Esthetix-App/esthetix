import { TRPCError } from "@trpc/server";

import { formSchema } from "@/validation/form";
import { createTRPCRouter, professionalProcedure } from "@/server/api/trpc";

export const formRouter = createTRPCRouter({
  create: professionalProcedure
    .input(formSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.$transaction(async (prisma) => {
          const form = await prisma.form.create({
            data: {
              title: input.title,
              enable: input.enable,
              logoUrl: input.logoUrl,
              updatedBy: ctx.session.user.id,
              description: input.description,
              formGroups: {
                create: input.formGroups.map((group) => ({
                  title: group.name,
                  position: group.position,
                  isProfessionalField: group.isProfessionalField,
                  formFields: {
                    create: group.formFields.map((field) => ({
                      name: field.name,
                      position: field.position,
                      type: field.type,
                      size: field.size,
                      typeOptions: field.typeOptions ?? undefined,
                      isProfessionalField: field.isProfessionalField,
                      isRequired: field.isRequired,
                      fieldOptions: field.fieldOptions
                        ? {
                            create: field.fieldOptions.map((option) => ({
                              name: option.name,
                            })),
                          }
                        : undefined,
                    })),
                  },
                })),
              },
            },
          });

          return { form };
        });

        return {
          status: 201,
          message: "Form created successfully!",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create form.",
          cause: error,
        });
      }
    }),
});
