import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

import { authRouter } from "@/server/api/routers/auth";
import { customerRouter } from "@/server/api/routers/customer";
import { formUploadRouter } from "@/server/api/routers/form-upload";
import { formRouter } from "@/server/api/routers/form";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  customer: customerRouter,
  formUpload: formUploadRouter,
  form: formRouter,
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
