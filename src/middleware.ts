import NextAuth from "next-auth";

import authConfig from "@/config/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  DEFAULT_NOT_AUTHENTICATED_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
  apiTRPCPrefix,
} from "@/config/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isTRPCApiRoute = nextUrl.pathname.startsWith(apiTRPCPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute || isTRPCApiRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(
      new URL(DEFAULT_NOT_AUTHENTICATED_REDIRECT, nextUrl),
    );
  }

  return;
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
