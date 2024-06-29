import { TRPCError } from "@trpc/server";
import { formHistorySchema } from "@/validation/form-history";
import { createTRPCRouter, professionalProcedure } from "@/server/api/trpc";

export const formHistoryRouter = createTRPCRouter({
  create: professionalProcedure
    .input(formHistorySchema)
    .mutation(async ({ ctx, input }) => {
      const { customerId, enable, formId, isNamedForm, professionalId } = input;

      try {
        const customer = isNamedForm
          ? await ctx.db.customer.findUnique({ where: { id: customerId } })
          : null;

        if (isNamedForm && !customer) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Form not found.",
          });
        }

        const [professional, form] = await Promise.all([
          ctx.db.user.findUnique({ where: { id: professionalId } }),
          ctx.db.form.findUnique({
            where: { id: formId },
            include: {
              formGroups: {
                include: {
                  formFields: {
                    include: {
                      fieldOptions: true,
                    },
                  },
                },
              },
            },
          }),
        ]);

        if (!form || !professional) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Form not found.",
          });
        }

        const formHistory = await ctx.db.formHistory.create({
          data: {
            enable: enable,
            isNamedForm: isNamedForm,
            title: form.title,
            logoUrl: form.logoUrl,
            description: form.description,
            createdBy: ctx.session.user.id,
            professionalId: professionalId,
            customerId: customerId,
            formGroupsHistory: {
              create: form.formGroups?.map((group) => ({
                title: group.title,
                position: group.position,
                isProfessionalField: group.isProfessionalField,
                formFieldsHistory: {
                  create: group.formFields.map((field) => ({
                    name: field.name,
                    type: field.type,
                    position: field.position,
                    isRequired: field.isRequired,
                    typeOptions: field.typeOptions ?? undefined,
                    isProfessionalField: field.isProfessionalField,
                    fieldOptionsHistory: field.fieldOptions
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

        return {
          status: 201,
          id: formHistory.id,
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
