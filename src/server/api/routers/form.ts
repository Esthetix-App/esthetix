import dayjs from "dayjs";
import { TRPCError } from "@trpc/server";
import customParseFormat from "dayjs/plugin/customParseFormat";

import type { Form } from "@prisma/client";

import { formSchema } from "@/validation/form";
import { getFormSchema } from "@/validation/get-forms";
import { buildWhereClause } from "@/lib/build-where-clause";
import { createTRPCRouter, professionalProcedure } from "@/server/api/trpc";

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
                  title: group.name,
                  position: group.position,
                  isProfessionalField: group.isProfessionalField,
                  formFields: {
                    create: group.formFields.map((field) => ({
                      name: field.name,
                      position: field.position,
                      type: field.type,
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
});
