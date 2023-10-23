import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     name: { label: "Username", type: "text", placeholder: "jsmith" },
    //   },
    //   async authorize(credentials, req) {
    //     const user = {
    //       id: "",
    //       name: credentials?.name,
    //     };

    //     if (user) {
    //       return user;
    //     } else {
    //       return null;
    //     }
    //   },
    // }),
  ],
  //   callbacks: {
  //     async jwt({ token, user, trigger, session }) {
  //       if (trigger === "update") {
  //         return { ...token, ...session.user };
  //       }
  //       return { ...token, ...user };
  //     },

  //     async session({ session, token }) {
  //       session.user = token as any;
  //       return session;
  //     },
  //   },
};
