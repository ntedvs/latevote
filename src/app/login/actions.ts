"use server"

import { usersTable } from "@/drizzle/schema"
import { signIn } from "@/lib/auth"
import { db } from "@/lib/drizzle"
import { shape } from "@/utils/client"
import { eq } from "drizzle-orm"

export const check = async (state: any, fd: FormData) => {
  const { email: raw } = shape(fd)
  const email = raw.trim().toLowerCase()

  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
  })

  if (!user) return { error: "Account not found", email: raw }

  await signIn("nodemailer", {
    email,
    redirectTo: "/" + user.groupId,
  })
}
