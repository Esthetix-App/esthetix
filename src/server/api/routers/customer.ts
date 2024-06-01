import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { customerSignUpSchema } from "@/validation/customer";

const SALT_ROUNDS = 10;

export const customerRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(customerSignUpSchema)
    .mutation(async ({ ctx, input }) => {
      const { account } = input;

      const { email, password, name } = account;

      const userExists = await ctx.db.user.findFirst({
        where: { email },
      });

      if (userExists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists.",
        });
      }

      const saltPassword = bcrypt.genSaltSync(SALT_ROUNDS);
      const hashPassword = bcrypt.hashSync(password, saltPassword);

      const user = await ctx.db.user.create({
        data: { email, name, password: hashPassword },
      });

      return {
        status: 201,
        message: `Account ${user.email} created successfully`,
      };
    }),
});
