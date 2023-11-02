import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
// import VkProvider from "next-auth/providers/vk";
import MailRuProvider from "next-auth/providers/mailru";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    session: async ({ session, token, ...arg }) => {
      if (session?.user) {
        //@ts-ignore
        session.user.id = token.sub;
      }
      return session;
    },
    jwt: async ({ user, token, ...arg }) => {
      if (user) {
        token.uid = token.id;
      }
      return token;
    },
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    MailRuProvider({
      clientId: process.env.MAILRU_CLIENT_ID as string,
      clientSecret: process.env.MAILRU_CLIENT_SECRET as string,
    }),
    // VkProvider({
    //   clientId: process.env.VK_CLIENT_ID as string,
    //   clientSecret: process.env.VK_CLIENT_SECRET as string,
    // }),
  ],
};
