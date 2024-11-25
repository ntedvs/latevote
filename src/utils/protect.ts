import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async (admin: boolean) => {
  const session = await auth()

  if (!session || (admin && !session.user.admin)) {
    redirect("/")
  }

  return session.user
}
