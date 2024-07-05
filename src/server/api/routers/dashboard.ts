import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

dayjs.extend(customParseFormat);

interface IForm {
  createdAt: string;
  filledAt: string | null;
  description: string | null;
  id: string;
  title: string;
  logoUrl: string | null;
  professional: {
    name: string | null;
  } | null;
}

export const dashboardRouter = createTRPCRouter({
  getFormsToFill: protectedProcedure.query(async ({ ctx }) => {
    try {
      const customer = await ctx.db.customer.findFirst({
        where: { userId: ctx.session.user.id },
        select: { id: true },
      });

      const forms = await ctx.db.formHistory.findMany({
        where: {
          AND: [
            {
              OR: [
                { professionalId: ctx.session.user.id },
                { customerId: customer?.id },
              ],
            },
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

      const filledForms: IForm[] = [];
      const formsToFill: IForm[] = [];

      forms.forEach((form) => {
        const formattedForm = {
          ...form,
          createdAt: dayjs(form.createdAt).format("DD/MM/YYYY"),
          filledAt: form.filledAt
            ? dayjs(form.filledAt).format("DD/MM/YYYY HH:mm")
            : null,
        };

        if (formattedForm.filledAt) {
          filledForms.push(formattedForm);
        } else {
          formsToFill.push(formattedForm);
        }
      });

      return {
        status: 200,
        filledForms,
        formsToFill,
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
