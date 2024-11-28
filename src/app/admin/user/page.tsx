import Pending from "@/components/Pending"
import { prisma } from "@/lib/prisma"
import protect from "@/utils/protect"
import { redirect } from "next/navigation"

export default async function User() {
  const { groupId } = await protect(true)

  return (
    <>
      <h1>Add User</h1>

      <form
        action={async (fd) => {
          "use server"

          const { users } = Object.fromEntries(fd) as { users: string }

          const data = users.split(/[\r\n]+/).map((line) => {
            const [email, name] = line.split(",").map((side) => side.trim())
            return { email, name, groupId }
          })

          await prisma.user.createMany({ data })

          redirect("/admin")
        }}
        className="flex flex-col"
      >
        <p>Email, Name</p>
        <textarea name="users" className="input" />
        <Pending />
      </form>
    </>
  )
}
