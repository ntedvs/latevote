import { sessionsTable, usersTable, verificationsTable } from "@/drizzle/schema"
import { db } from "@/lib/drizzle"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import NextAuth from "next-auth"
import Resend from "next-auth/providers/resend"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable,
    sessionsTable,
    verificationTokensTable: verificationsTable,
  } as any),
  providers: [Resend({ from: "onboarding@resend.dev" })],
})
