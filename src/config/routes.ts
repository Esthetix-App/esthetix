/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /dashboard
 * @type {string[]}
 */
export const authRoutes = ["/sign-in", "/sign-up"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The prefix for TRPC API routes
 * @type {string}
 */
export const apiTRPCPrefix = "/api/trpc";

/**
 * The default redirect path after sign-in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

/**
 * The default redirect path after sign-in
 * @type {string}
 */
export const DEFAULT_NOT_AUTHENTICATED_REDIRECT = "/sign-in";
