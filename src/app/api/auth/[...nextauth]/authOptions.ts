import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
// import VkProvider from "next-auth/providers/vk";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },

  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // VkProvider({
    //   clientId: process.env.VK_CLIENT_ID as string,
    //   clientSecret: process.env.VK_CLIENT_SECRET as string,
    // }),
  ],
};
