import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { customerSignUpSchema } from "@/validation/customer";

const SALT_ROUNDS = 10;

export const customerRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(customerSignUpSchema)
    .mutation(async ({ ctx, input }) => {
      const { account, address, personalData } = input;

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

      const customerAddress = await ctx.db.address.create({
        data: address,
      });

      await ctx.db.customer.create({
        data: {
          userId: user.id,
          name: account.name,
          rg: personalData.rg,
          cpf: personalData.cpf,
          howMet: personalData.howMet,
          addressId: customerAddress.id,
          birthdate: personalData.bithdate,
          cellphone: personalData.cellphone,
        },
      });

      return {
        status: 201,
        message: `Account ${user.email} created successfully`,
      };
    }),
});
