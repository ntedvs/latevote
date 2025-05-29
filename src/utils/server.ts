import { auth } from "@/lib/auth"
import { notFound } from "next/navigation"

export const protect = async () => {
  const session = await auth()
  if (!session || session.user.type !== "admin") notFound()

  return session
}
