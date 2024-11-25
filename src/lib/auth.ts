import { prisma } from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import Nodemailer from "next-auth/providers/nodemailer"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      admin: boolean
      groupId: number
    }
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Nodemailer({
      server: process.env.EMAIL_SERVER,
      from: "auth@latevote.com",
    }),
  ],
  callbacks: {
    async signIn({ user: { email } }) {
      const user = await prisma.user.findUnique({
        where: { email: email! },
      })

      return !!user
    },
  },
  // pages: { signIn: "/signin", verifyRequest: "/verify" },
})
