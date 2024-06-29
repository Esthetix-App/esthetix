import { TRPCError } from "@trpc/server";

import { createTRPCRouter, professionalProcedure } from "@/server/api/trpc";

export const professionalRouter = createTRPCRouter({
  getAllOptions: professionalProcedure.query(async ({ ctx }) => {
    try {
      const professionals = await ctx.db.user.findMany({
        where: {
          role: "PROFESSIONAL",
        },
      });

      return {
        status: 200,
        options: professionals.map((professional) => ({
          label: professional.name ?? "",
          value: professional.id,
        })),
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get professionals.",
        cause: error,
      });
    }
  }),
});
