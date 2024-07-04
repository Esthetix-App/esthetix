import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

import { formRouter } from "@/server/api/routers/form";
import { userRouter } from "@/server/api/routers/user";
import { customerRouter } from "@/server/api/routers/customer";
import { formUploadRouter } from "@/server/api/routers/form-upload";
import { formHistoryRouter } from "@/server/api/routers/form-history";
import { professionalRouter } from "@/server/api/routers/professional";
import { submitFormRouter } from "@/server/api/routers/submit-form";
import { dashboardRouter } from "@/server/api/routers/dashboard";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  form: formRouter,
  user: userRouter,
  customer: customerRouter,
  formUpload: formUploadRouter,
  formHistory: formHistoryRouter,
  professional: professionalRouter,
  submitForm: submitFormRouter,
  dashboard: dashboardRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
