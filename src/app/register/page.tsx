import Pending from "@/components/Pending"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export default function Register() {
  return (
    <>
      <h1>Register</h1>

      <form
        action={async (fd) => {
          "use server"

          const { gn, ae, an } = Object.fromEntries(fd) as {
            [k: string]: string
          }

          const group = await prisma.group.create({
            data: { name: gn },
          })

          await prisma.user.create({
            data: { email: ae, name: an, admin: true, groupId: group.id },
          })

          redirect("/api/auth/signin")
        }}
        className="flex flex-col"
      >
        <p>Group Name</p>
        <input name="gn" className="input" />

        <p>Administrator Email</p>
        <input name="ae" className="input" />

        <p>Administrator Name</p>
        <input name="an" className="input" />

        <Pending />
      </form>
    </>
  )
}
