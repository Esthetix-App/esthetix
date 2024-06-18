import { TRPCError } from "@trpc/server";
import dayjs from "dayjs";
import bcrypt from "bcryptjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

import {
  createTRPCRouter,
  publicProcedure,
  professionalProcedure,
} from "@/server/api/trpc";
import { customerSignUpSchema } from "@/validation/customer";

const SALT_ROUNDS = 10;

export const customerRouter = createTRPCRouter({
  getAll: professionalProcedure.query(async ({ ctx }) => {
    const [customers, count] = await ctx.db.$transaction([
      ctx.db.customer.findMany(),
      ctx.db.customer.count({}),
    ]);

    return {
      status: 200,
      customers: customers.map((customer) => ({
        ...customer,
        birthdate: dayjs(customer.birthdate).format("DD/MM/YYYY"),
        createdAt: dayjs(customer.createdAt).format("DD/MM/YYYY"),
        updatedAt: dayjs(customer.updatedAt).format("DD/MM/YYYY"),
      })),
      count,
    };
  }),
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

      try {
        const result = await ctx.db.$transaction(async (prisma) => {
          const [user, customerAddress] = await Promise.all([
            prisma.user.create({
              data: { email, name, password: hashPassword },
            }),
            prisma.address.create({
              data: {
                ...address,
                zipcode: address.zipcode.replace(/[^\d]/g, ""),
              },
            }),
          ]);

          const customer = await prisma.customer.create({
            data: {
              userId: user.id,
              name: account.name,
              howMet: personalData.howMet,
              addressId: customerAddress.id,
              cellphone: personalData.cellphone,
              rg: personalData.rg.replace(/[^\d]/g, ""),
              cpf: personalData.cpf.replace(/[^\d]/g, ""),
              birthdate: dayjs(
                personalData.bithdate,
                "DD/MM/YYYY",
              ).toISOString(),
            },
          });

          return { user, customerAddress, customer };
        });

        return {
          status: 201,
          message: `Account ${result.user.email} created successfully`,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create account.",
          cause: error,
        });
      }
    }),
});
