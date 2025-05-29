import Pending from "@/components/pending"
import { groupsTable, usersTable } from "@/drizzle/schema"
import { signIn } from "@/lib/auth"
import { db } from "@/lib/drizzle"
import { shape } from "@/utils/client"
import { protect } from "@/utils/server"

export default async function Register() {
  await protect()

  return (
    <>
      <h1>Register</h1>

      <form
        action={async (fd) => {
          "use server"

          const { email, name, group } = shape(fd)

          const [{ id }] = await db
            .insert(groupsTable)
            .values({ name: group })
            .returning()

          await db
            .insert(usersTable)
            .values({ email, name, type: "leader", groupId: id })

          await signIn("nodemailer", {
            email,
            redirectTo: "/" + id,
          })
        }}
        className="flex flex-col"
      >
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          required
          placeholder="Email"
          className="input mb-2"
        />

        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          required
          placeholder="Name"
          className="input mb-2"
        />

        <label htmlFor="group">Group</label>
        <input
          id="group"
          name="group"
          required
          placeholder="Group"
          className="input mb-4"
        />

        <Pending />
      </form>
    </>
  )
}
