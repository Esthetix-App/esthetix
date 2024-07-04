import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

dayjs.extend(customParseFormat);

export const dashboardRouter = createTRPCRouter({
  getFormsToFill: protectedProcedure.query(async ({ ctx }) => {
    try {
      const customer = await ctx.db.formHistory.findUnique({
        select: { id: true },
        where: { id: ctx.session.user.id },
      });

      const forms = await ctx.db.formHistory.findMany({
        where: {
          OR: [
            { professionalId: ctx.session.user.id },
            { customerId: customer?.id },
          ],
        },
        select: {
          id: true,
          title: true,
          description: true,
          logoUrl: true,
          createdAt: true,
          filledAt: true,
          professional: {
            select: {
              name: true,
            },
          },
        },
      });

      return {
        status: 200,
        forms: forms.map((form) => ({
          ...form,
          createdAt: dayjs(form.createdAt).format("DD/MM/YYYY"),
          filledAt: form.filledAt
            ? dayjs(form.filledAt).format("DD/MM/YYYY HH:mm")
            : null,
        })),
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get my forms.",
        cause: error,
      });
    }
  }),
});
