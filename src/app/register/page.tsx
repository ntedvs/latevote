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

          const { groupName, adminEmail, adminName } = Object.fromEntries(
            fd,
          ) as { [k: string]: string }

          const group = await prisma.group.create({
            data: { name: groupName },
          })

          await prisma.title.createMany({
            data: [
              { body: "Most Likely to Succeed", size: 1 },
              { body: "Most Likely to Become Famous", size: 1 },
              { body: "Best Dressed", size: 1 },
              { body: "Best Duo", size: 2 },
              { body: "Best Hair", size: 2 },
              { body: "Most Athletic", size: 1 },
              { body: "Cutest Couple", size: 2 },
            ].map((title) => ({ ...title, groupId: group.id })),
          })

          await prisma.user.create({
            data: {
              email: adminEmail,
              name: adminName,
              admin: true,
              groupId: group.id,
            },
          })

          redirect("/api/auth/signin")
        }}
        className="flex flex-col"
      >
        <p>Group Name</p>
        <input name="groupName" className="input" />

        <p>Administrator Email</p>
        <input name="adminEmail" className="input" />

        <p>Administrator Name</p>
        <input name="adminName" className="input" />

        <Pending />
      </form>
    </>
  )
}
