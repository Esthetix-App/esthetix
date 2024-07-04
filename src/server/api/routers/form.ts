import { z } from "zod";
import dayjs from "dayjs";
import { TRPCError } from "@trpc/server";
import customParseFormat from "dayjs/plugin/customParseFormat";

import type { Form } from "@prisma/client";

import { formSchema } from "@/validation/form";
import { getFormSchema } from "@/validation/get-forms";
import { buildWhereClause } from "@/lib/build-where-clause";
import {
  createTRPCRouter,
  professionalProcedure,
  adminProcedure,
} from "@/server/api/trpc";
import { editFormSchema } from "@/validation/form-edit";

dayjs.extend(customParseFormat);

export const formRouter = createTRPCRouter({
  create: professionalProcedure
    .input(formSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.$transaction(async (prisma) => {
          const form = await prisma.form.create({
            data: {
              title: input.title,
              enable: input.enable,
              logoUrl: input.logoUrl,
              updatedBy: ctx.session.user.id,
              description: input.description,
              formGroups: {
                create: input.formGroups.map((group) => ({
                  title: group.title,
                  position: group.position,
                  isProfessionalField: group.isProfessionalField,
                  formFields: {
                    create: group.formFields.map((field) => ({
                      name: field.name,
                      description: field.description,
                      position: field.position,
                      type: field.type,
                      size: field.size,
                      typeOptions: field.typeOptions ?? undefined,
                      isProfessionalField: field.isProfessionalField,
                      isRequired: field.isRequired,
                      fieldOptions: field.fieldOptions
                        ? {
                            create: field.fieldOptions.map((option) => ({
                              name: option.name,
                            })),
                          }
                        : undefined,
                    })),
                  },
                })),
              },
            },
          });

          return { form };
        });

        return {
          status: 201,
          message: "Form created successfully!",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create form.",
          cause: error,
        });
      }
    }),
  update: professionalProcedure
    .input(editFormSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.$transaction(async (prisma) => {
          const form = await prisma.form.update({
            where: { id: input.id },
            data: {
              title: input.title,
              enable: input.enable,
              logoUrl: input.logoUrl,
              updatedBy: ctx.session.user.id,
              description: input.description,
              formGroups: {
                deleteMany: {},
                create: input.formGroups.map((group) => ({
                  title: group.title,
                  position: group.position,
                  isProfessionalField: group.isProfessionalField,
                  formFields: {
                    create: group.formFields.map((field) => ({
                      name: field.name,
                      description: field.description,
                      position: field.position,
                      type: field.type,
                      size: field.size,
                      typeOptions: field.typeOptions ?? undefined,
                      isProfessionalField: field.isProfessionalField,
                      isRequired: field.isRequired,
                      fieldOptions: field.fieldOptions
                        ? {
                            create: field.fieldOptions.map((option) => ({
                              name: option.name,
                            })),
                          }
                        : undefined,
                    })),
                  },
                })),
              },
            },
          });

          return { form };
        });

        return {
          status: 201,
          message: "Form updated successfully!",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update form.",
          cause: error,
        });
      }
    }),
  getAll: professionalProcedure
    .input(getFormSchema)
    .query(async ({ ctx, input }) => {
      const { page, per_page, sort, title, operator } = input;

      try {
        const offset = (page - 1) * per_page;
        const [column, order] = (sort?.split(".").filter(Boolean) ?? [
          "createdAt",
          "desc",
        ]) as [keyof Form, "asc" | "desc"];

        const orderBy = { [column]: order };

        const where = buildWhereClause(
          [{ column: "title", value: title ?? "" }],
          operator,
        );

        const [forms, count] = await ctx.db.$transaction([
          ctx.db.form.findMany({
            include: {
              updatedByUser: {
                select: {
                  id: true,
                  name: true,
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
          ctx.db.form.count({ where }),
        ]);

        return {
          status: 200,
          forms: forms.map((form) => ({
            ...form,
            createdAt: dayjs(form.createdAt).format("DD/MM/YYYY"),
            updatedAt: dayjs(form.updatedAt).format("DD/MM/YYYY"),
          })),
          pageCount: Math.ceil(count / per_page),
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get forms.",
          cause: error,
        });
      }
    }),
  delete: adminProcedure
    .input(z.object({ ids: z.array(z.string().min(1)).min(1) }))
    .mutation(async ({ input, ctx }) => {
      const { ids } = input;

      try {
        const forms = await ctx.db.form.findMany({
          select: { id: true },
          where: { id: { in: ids } },
        });

        if (forms.length !== ids.length) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Form not found.",
          });
        }

        const deletedForms = await ctx.db.form.deleteMany({
          where: { id: { in: ids } },
        });

        return {
          status: 202,
          message: `${deletedForms.count} forms deleted with success!`,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete forms.",
          cause: error,
        });
      }
    }),
  getById: professionalProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ input, ctx }) => {
      const { id } = input;

      try {
        const form = await ctx.db.form.findUnique({
          where: { id },
          include: {
            formGroups: {
              include: {
                formFields: {
                  include: {
                    fieldOptions: true,
                  },
                },
              },
            },
          },
        });

        if (!form) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Form not found.",
          });
        }

        return {
          status: 200,
          form,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get customer.",
          cause: error,
        });
      }
    }),
  getAllOptions: professionalProcedure.query(async ({ ctx }) => {
    try {
      const forms = await ctx.db.form.findMany({
        where: {
          enable: true,
        },
        select: {
          id: true,
          title: true,
        },
      });

      return {
        status: 200,
        options: forms.map((form) => ({
          label: form.title ?? "",
          value: form.id,
        })),
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get form options.",
        cause: error,
      });
    }
  }),
});
