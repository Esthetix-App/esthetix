import { formHistorySchema } from "@/validation/form-history";
import { createTRPCRouter, professionalProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const formHistoryRouter = createTRPCRouter({
  create: professionalProcedure
    .input(formHistorySchema)
    .mutation(async ({ ctx, input }) => {
      const { customerId, enable, formId, isNamedForm, professionalId } = input;

      try {
        const form = await ctx.db.form.findUnique({ where: { id: formId } });

        if (!form) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Form not found.",
          });
        }

        return {};
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create form.",
          cause: error,
        });
      }
    }),
});
