import { sessionsTable, usersTable, verificationsTable } from "@/drizzle/schema"
import { db } from "@/lib/drizzle"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import NextAuth from "next-auth"
import Nodemailer from "next-auth/providers/nodemailer"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable,
    sessionsTable,
    verificationTokensTable: verificationsTable,
  } as any),
  providers: [
    Nodemailer({
      server: process.env.EMAIL_SERVER,
      from: "auth@latevote.com",
    }),
  ],
})
