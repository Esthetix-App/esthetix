import { TRPCError } from "@trpc/server";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { submitFormSchema } from "@/validation/submit-form";

export const submitFormRouter = createTRPCRouter({
  submit: protectedProcedure
    .input(submitFormSchema)
    .mutation(async ({ ctx, input }) => {
      const { formId, responses } = input;
      const createdBy = ctx.session.user.id;

      try {
        await ctx.db.$transaction(async (prisma) => {
          await prisma.formHistory.update({
            where: { id: formId },
            data: { filledAt: new Date() },
          });

          const existingResponses = await ctx.db.formHistoryResponse.findMany({
            where: {
              formId,
              fieldId: { in: Object.keys(responses) },
            },
          });

          const existingResponseIds = new Set(
            existingResponses.map((response) => response.fieldId),
          );

          const newResponses = Object.entries(responses)
            .filter(([fieldId]) => !existingResponseIds.has(fieldId))
            .map(([fieldId, response]) => ({
              fieldId,
              formId,
              response,
              createdBy,
            }));

          if (newResponses.length > 0) {
            await prisma.formHistoryResponse.createMany({
              data: newResponses,
            });
          }

          const updatedResponses = existingResponses
            .filter(
              (existingResponse) =>
                responses[existingResponse.fieldId] !==
                existingResponse.response,
            )
            .map((existingResponse) => ({
              fieldId: existingResponse.fieldId,
              formId,
              response: responses[existingResponse.fieldId],
              createdBy,
            }));

          const updatedResponseIds = updatedResponses.map(
            (response) => response.fieldId,
          );

          if (updatedResponseIds.length > 0) {
            await prisma.formHistoryResponse.deleteMany({
              where: {
                formId,
                fieldId: { in: updatedResponseIds },
              },
            });

            await prisma.formHistoryResponse.createMany({
              data: updatedResponses,
            });
          }
        });

        return {
          status: 200,
          message: "Form responses submitted successfully",
        };
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "There is an error on submit form.",
        });
      }
    }),
});
