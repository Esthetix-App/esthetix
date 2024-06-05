import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { signInSchema } from "@/validation/auth";

import { db } from "@/server/db";

export default {
  pages: {
    error: "/sign-in",
    signIn: "/sign-in",
    newUser: "/sign-up",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = await signInSchema.parseAsync(credentials);

        const user = await db.user.findFirst({
          where: { email },
        });

        if (!user?.password) {
          return null;
        }

        const isValidPassword = bcrypt.compareSync(password, user.password);

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          image: user.image,
          name: user.name,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
