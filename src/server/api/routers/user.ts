import { z } from "zod";
import bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  adminProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import type { User } from "@prisma/client";
import { getUsersSchema } from "@/validation/get-users";
import { createUserSchema, updateUserSchema } from "@/validation/user";

const SALT_ROUNDS = 10;

export const userRouter = createTRPCRouter({
  getAll: adminProcedure.input(getUsersSchema).query(async ({ ctx, input }) => {
    const { page, per_page, sort } = input;

    try {
      const offset = (page - 1) * per_page;
      const [column, order] = (sort?.split(".").filter(Boolean) ?? [
        "name",
        "desc",
      ]) as [keyof User, "asc" | "desc"];

      const orderBy = { [column]: order };

      const [users, count] = await ctx.db.$transaction([
        ctx.db.user.findMany({
          take: per_page,
          skip: offset,
          orderBy,
          where: {
            role: {
              in: ["ADMIN", "PROFESSIONAL"],
            },
          },
          select: {
            id: true,
            name: true,
            role: true,
            email: true,
            image: true,
          },
        }),
        ctx.db.user.count({
          where: {
            role: {
              in: ["ADMIN", "PROFESSIONAL"],
            },
          },
        }),
      ]);

      return {
        status: 200,
        users,
        pageCount: Math.ceil(count / per_page),
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get users.",
        cause: error,
      });
    }
  }),
  update: adminProcedure
    .input(updateUserSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;

      try {
        const user = await ctx.db.user.findUnique({ where: { id } });

        if (!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found.",
          });
        }

        await ctx.db.user.update({ where: { id }, data });

        return {
          status: 200,
          message: "User updated successfully!",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update user.",
          cause: error,
        });
      }
    }),
  delete: adminProcedure
    .input(z.object({ ids: z.array(z.string().min(1)).min(1) }))
    .mutation(async ({ input, ctx }) => {
      const { ids } = input;

      try {
        const users = await ctx.db.user.findMany({
          where: {
            id: {
              in: ids,
            },
          },
        });

        if (users.length !== ids.length) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found.",
          });
        }

        const deletedUsers = await ctx.db.user.deleteMany({
          where: { id: { in: ids } },
        });

        return {
          status: 202,
          message: `${deletedUsers.count} users deleted with success!`,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete customers.",
          cause: error,
        });
      }
    }),
  create: adminProcedure
    .input(createUserSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, password, name, image, role } = input;

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
        data: { email, name, image, role, password: hashPassword },
      });

      return {
        status: 201,
        message: `Account ${user.email} created successfully`,
      };
    }),
  userExists: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input, ctx }) => {
      const userExists = await ctx.db.user.findFirst({
        where: { email: input.email },
      });

      return {
        userExists: !!userExists?.id,
      };
    }),
});
