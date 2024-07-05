import { z } from "zod";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { createId } from "@paralleldrive/cuid2";
import { TRPCError } from "@trpc/server";

import type { FormHistory } from "@prisma/client";

import {
  createTRPCRouter,
  professionalProcedure,
  protectedProcedure,
  adminProcedure,
} from "@/server/api/trpc";
import { buildWhereClause } from "@/lib/build-where-clause";
import { getCustomerHistorySchema } from "@/validation/get-customer-history";
import { duplicateFormSchema } from "@/validation/submit-form";
import { formHistorySchema } from "@/validation/form-history";

dayjs.extend(customParseFormat);

export const formHistoryRouter = createTRPCRouter({
  create: professionalProcedure
    .input(formHistorySchema)
    .mutation(async ({ ctx, input }) => {
      const { customerId, enable, formId, isNamedForm, professionalId } = input;

      try {
        const customer = isNamedForm
          ? await ctx.db.customer.findUnique({ where: { id: customerId } })
          : null;

        if (isNamedForm && !customer) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Form not found.",
          });
        }

        const [professional, form] = await Promise.all([
          ctx.db.user.findUnique({ where: { id: professionalId } }),
          ctx.db.form.findUnique({
            where: { id: formId },
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
          }),
        ]);

        if (!form || !professional) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Form not found.",
          });
        }

        const formHistory = await ctx.db.formHistory.create({
          data: {
            enable: enable,
            isNamedForm: isNamedForm,
            title: form.title,
            logoUrl: form.logoUrl,
            description: form.description,
            createdBy: ctx.session.user.id,
            professionalId: professionalId,
            customerId: customerId,
            formGroupsHistory: {
              create: form.formGroups?.map((group) => ({
                title: group.title,
                position: group.position,
                isProfessionalField: group.isProfessionalField,
                formFieldsHistory: {
                  create: group.formFields.map((field) => ({
                    name: field.name,
                    description: field.description,
                    position: field.position,
                    type: field.type,
                    size: field.size,
                    typeOptions: field.typeOptions ?? undefined,
                    isRequired: field.isRequired,
                    isProfessionalField: field.isProfessionalField,
                    fieldOptionsHistory: field.fieldOptions
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

        return {
          status: 201,
          id: formHistory.id,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create form.",
          cause: error,
        });
      }
    }),
  getByCustomer: professionalProcedure
    .input(getCustomerHistorySchema)
    .query(async ({ ctx, input }) => {
      const { page, per_page, sort, title, operator, customerId } = input;

      try {
        const offset = (page - 1) * per_page;
        const [column, order] = (sort?.split(".").filter(Boolean) ?? [
          "createdAt",
          "desc",
        ]) as [keyof FormHistory, "asc" | "desc"];

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
          [
            { column: "title", value: title ?? "" },
            { column: "customerId", value: customerId },
          ],
          operator,
        );

        const [forms, count] = await ctx.db.$transaction([
          ctx.db.formHistory.findMany({
            include: {
              professional: {
                select: { name: true },
              },
            },
            take: per_page,
            skip: offset,
            orderBy,
            where,
          }),
          ctx.db.formHistory.count({ where }),
        ]);

        return {
          status: 200,
          forms: forms.map((form) => ({
            ...form,
            createdAt: dayjs(form.createdAt).format("DD/MM/YYYY"),
            filledAt: form.filledAt
              ? dayjs(form.filledAt).format("DD/MM/YYYY HH:mm")
              : null,
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
  getById: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ input, ctx }) => {
      const { id } = input;

      try {
        const formHistory = await ctx.db.formHistory.findUnique({
          where: { id, enable: true },
          include: {
            formGroupsHistory: {
              include: {
                formFieldsHistory: {
                  include: {
                    fieldOptionsHistory: true,
                  },
                },
              },
            },
            professional: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            customer: {
              select: {
                birthdate: true,
                cellphone: true,
                cpf: true,
                howMet: true,
                name: true,
                rg: true,
                id: true,
                address: true,
                userId: true,
              },
            },
          },
        });

        if (!formHistory) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Form not found or private.",
          });
        }

        if (
          ctx.session.user.role === "CUSTOMER" &&
          formHistory.isNamedForm &&
          formHistory.customer?.userId !== ctx.session.user.id
        ) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Form not found or private.",
          });
        }

        const formResponses = await ctx.db.formHistoryResponse.findMany({
          where: { formId: formHistory.id },
          select: {
            fieldId: true,
            response: true,
          },
        });

        const defaultValues: {
          [key: string]: any;
        } = {};

        formResponses.forEach(({ fieldId, response }) => {
          if (response !== null) {
            defaultValues[fieldId] = response;
          }
        });

        const { formGroupsHistory, ...data } = formHistory;

        const form = {
          ...data,
          formGroups: formGroupsHistory.map(
            ({ formFieldsHistory, ...formGroups }) => ({
              ...formGroups,
              formFields: formFieldsHistory.map(
                ({ fieldOptionsHistory, ...formFields }) => ({
                  ...formFields,
                  fieldOptions: fieldOptionsHistory.map((fieldOptions) => ({
                    ...fieldOptions,
                  })),
                }),
              ),
            }),
          ),
        };

        const isProfessionalUser =
          ctx.session.user.role === "ADMIN" ||
          ctx.session.user.role === "PROFESSIONAL";

        return {
          status: 200,
          form,
          isProfessionalUser,
          defaultValues,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get form.",
          cause: error,
        });
      }
    }),
  duplicate: professionalProcedure
    .input(duplicateFormSchema)
    .mutation(async ({ ctx, input }) => {
      const { formId, responses } = input;

      try {
        const form = await ctx.db.formHistory.findUnique({
          where: { id: formId },
          include: {
            formGroupsHistory: {
              include: {
                formFieldsHistory: {
                  include: {
                    fieldOptionsHistory: true,
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

        const newFormId = createId();

        const formHistory = await ctx.db.formHistory.create({
          data: {
            id: newFormId,
            enable: form.enable,
            isNamedForm: form.isNamedForm,
            title: form.title,
            logoUrl: form.logoUrl,
            description: form.description,
            createdBy: ctx.session.user.id,
            professionalId: form.professionalId,
            customerId: form.customerId,
            formGroupsHistory: {
              create: form.formGroupsHistory?.map((group) => ({
                title: group.title,
                position: group.position,
                isProfessionalField: group.isProfessionalField,
                formFieldsHistory: {
                  create: group.formFieldsHistory.map((field) => ({
                    name: field.name,
                    description: field.description,
                    position: field.position,
                    type: field.type,
                    size: field.size,
                    typeOptions: field.typeOptions ?? undefined,
                    isRequired: field.isRequired,
                    isProfessionalField: field.isProfessionalField,
                    formHistoryResponses: responses[field.id]
                      ? {
                          create: {
                            formId: newFormId,
                            response: responses[field.id],
                            createdBy: ctx.session.user.id,
                          },
                        }
                      : undefined,
                    fieldOptionsHistory: field.fieldOptionsHistory
                      ? {
                          create: field.fieldOptionsHistory.map((option) => ({
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

        return {
          status: 201,
          id: formHistory.id,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create form.",
          cause: error,
        });
      }
    }),
  delete: adminProcedure
    .input(z.object({ ids: z.array(z.string().min(1)).min(1) }))
    .mutation(async ({ input, ctx }) => {
      const { ids } = input;

      try {
        const forms = await ctx.db.formHistory.findMany({
          select: { id: true },
          where: { id: { in: ids } },
        });

        if (forms.length !== ids.length) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Form not found.",
          });
        }

        const deletedForms = await ctx.db.formHistory.deleteMany({
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
});
