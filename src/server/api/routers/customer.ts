import dayjs from "dayjs";
import bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { type Customer } from "@prisma/client";

dayjs.extend(customParseFormat);

import {
  createTRPCRouter,
  publicProcedure,
  professionalProcedure,
  adminProcedure,
} from "@/server/api/trpc";
import { buildWhereClause } from "@/lib/build-where-clause";
import { customerSignUpSchema } from "@/validation/customer";
import { getCustomersSchema } from "@/validation/get-customers";
import { z } from "zod";

const SALT_ROUNDS = 10;

export const customerRouter = createTRPCRouter({
  getById: professionalProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ input, ctx }) => {
      const { id } = input;

      try {
        const [customer, formHistoryCount] = await ctx.db.$transaction([
          ctx.db.customer.findUnique({
            where: { id },
            include: {
              address: true,
              user: {
                select: {
                  role: true,
                  email: true,
                  image: true,
                },
              },
            },
          }),
          ctx.db.formHistory.count({ where: { customerId: id } }),
        ]);

        if (!customer) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Customer not found.",
          });
        }

        return {
          status: 200,
          formHistoryCount,
          customer: {
            ...customer,
            birthdate: dayjs(customer.birthdate).format("DD/MM/YYYY"),
            createdAt: dayjs(customer.createdAt).format("DD/MM/YYYY"),
            updatedAt: dayjs(customer.updatedAt).format("DD/MM/YYYY"),
          },
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get customer.",
          cause: error,
        });
      }
    }),
  getAll: professionalProcedure
    .input(getCustomersSchema)
    .query(async ({ ctx, input }) => {
      const { page, per_page, sort, name, operator } = input;

      try {
        const offset = (page - 1) * per_page;
        const [column, order] = (sort?.split(".").filter(Boolean) ?? [
          "createdAt",
          "desc",
        ]) as [keyof Customer, "asc" | "desc"];

        let orderBy;

        if (column.includes("_")) {
          const [nestedTable, nestedField] = column.split("_");

          if (nestedTable && nestedField) {
            orderBy = { [nestedTable]: { [nestedField]: order } };
          } else {
            throw new Error("Invalid nested table or field for ordering.");
          }
        } else {
          orderBy = { [column]: order };
        }

        const where = buildWhereClause(
          [{ column: "name", value: name ?? "" }],
          operator,
        );

        const [customers, count] = await ctx.db.$transaction([
          ctx.db.customer.findMany({
            include: {
              user: {
                select: {
                  role: true,
                  email: true,
                  image: true,
                },
              },
            },
            take: per_page,
            skip: offset,
            orderBy,
            where,
          }),
          ctx.db.customer.count({ where }),
        ]);

        return {
          status: 200,
          customers: customers.map((customer) => ({
            ...customer,
            birthdate: dayjs(customer.birthdate).format("DD/MM/YYYY"),
            createdAt: dayjs(customer.createdAt).format("DD/MM/YYYY"),
            updatedAt: dayjs(customer.updatedAt).format("DD/MM/YYYY"),
          })),
          pageCount: Math.ceil(count / per_page),
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get customers.",
          cause: error,
        });
      }
    }),
  delete: adminProcedure
    .input(z.object({ ids: z.array(z.string().min(1)).min(1) }))
    .mutation(async ({ input, ctx }) => {
      const { ids } = input;

      try {
        const customers = await ctx.db.customer.findMany({
          where: {
            id: {
              in: ids,
            },
          },
        });

        if (customers.length !== ids.length) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Customer not found.",
          });
        }

        const usersIds = customers.map((customer) => customer.userId);
        const addressesIds = customers.map((customer) => customer.addressId);

        const deleteCustomers = ctx.db.customer.deleteMany({
          where: { id: { in: ids } },
        });

        const deleteAddresses = ctx.db.address.deleteMany({
          where: { id: { in: addressesIds } },
        });

        const deleteUsers = ctx.db.user.deleteMany({
          where: { id: { in: usersIds } },
        });

        const [deletedCustomers] = await ctx.db.$transaction([
          deleteCustomers,
          deleteAddresses,
          deleteUsers,
        ]);

        return {
          status: 202,
          message: `${deletedCustomers.count} customers deleted with success!`,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete customers.",
          cause: error,
        });
      }
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
