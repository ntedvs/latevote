import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth()

  if (session) {
    if (session.user.admin) {
      redirect("/admin")
    } else {
      redirect("/vote")
    }
  }

  return (
    <>
      <h1>Latevote</h1>
    </>
  )
}
