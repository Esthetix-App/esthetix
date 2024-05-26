import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { signUpSchema } from "@/validation/auth";

const SALT_ROUNDS = 10;

export const authRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, password, name, image } = input;

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
        data: { email, name, image, password: hashPassword },
      });

      return {
        status: 201,
        message: `Account ${user.email} created successfully`,
      };
    }),
});
