import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { cache } from "react";

import { authConfig } from "./config";
import { db } from "@/server/db";

const { auth: uncachedAuth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  ...authConfig,
});

const auth = cache(uncachedAuth);

export { auth, handlers, signIn, signOut };
