import { prisma } from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import Nodemailer from "next-auth/providers/nodemailer"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Nodemailer({
      server: process.env.EMAIL_SERVER,
      from: "auth@latevote.com",
    }),
  ],
  callbacks: {
    signIn: async (params) => {
      const user = await prisma.user.findUnique({
        where: { email: params.user.email! },
      })

      return !!user
    },
  },
})
