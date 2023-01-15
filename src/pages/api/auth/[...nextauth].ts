import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GithubProvider from "next-auth/providers/github";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import uuid from "uuid";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";
import { isValidUsername } from "../../../utils/usernameChecker";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      const userProfile = await prisma.userProfile.findUnique({
        where: {
          userId: user.id,
        },
      });
      if (!userProfile) {
        const targetUsername = (
          isValidUsername(user!.name as string) ? user!.name : uuid.v4()
        ) as string;
        await prisma.userProfile.create({
          data: {
            username: targetUsername,
            userId: user.id,
            title: targetUsername,
          },
        });
      }
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
