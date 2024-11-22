import Pending from "@/components/Pending"
import { prisma } from "@/lib/prisma"

export default function Register() {
  return (
    <>
      <h1>Register</h1>

      <form
        action={async (fd) => {
          "use server"

          const { name, admin } = Object.fromEntries(fd) as {
            name: string
            admin: string
          }

          const school = await prisma.school.create({
            data: { name },
          })

          await prisma.user.create({
            data: { email: admin, admin: true, schoolId: school.id },
          })
        }}
        className="flex flex-col"
      >
        <p>School Name</p>
        <input name="name" className="input" />

        <p>Administrator Email</p>
        <input name="admin" className="input" />

        <Pending />
      </form>
    </>
  )
}
