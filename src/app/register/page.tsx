import { groupsTable, usersTable } from "@/drizzle/schema"
import { db } from "@/lib/drizzle"
import { redirect } from "next/navigation"

export default function Register() {
  return (
    <form
      action={async (fd) => {
        "use server"

        const { name, email, admin } = Object.fromEntries(fd) as {
          [k: string]: string
        }

        const [group] = await db
          .insert(groupsTable)
          .values({ name })
          .returning()

        await db.insert(usersTable).values({
          email,
          name: admin,
          admin: true,
          groupId: group.id,
        })

        redirect("/signin")
      }}
    >
      <input name="name" className="input" />
      <input name="email" className="input" />
      <input name="admin" className="input" />

      <button className="button">Submit</button>
    </form>
  )
}
