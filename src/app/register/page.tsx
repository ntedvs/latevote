import Pending from "@/components/Pending"
import { organizationsTable, usersTable } from "@/drizzle/schema"
import { signIn } from "@/lib/auth"
import { db } from "@/lib/drizzle"
import { shape } from "@/utils/client"

export default function Register() {
  return (
    <>
      <h1>Register</h1>

      <form
        action={async (fd) => {
          "use server"

          const { org, name, email } = shape(fd)

          const [{ id }] = await db
            .insert(organizationsTable)
            .values({ name: org })
            .returning()

          await db
            .insert(usersTable)
            .values({ email, name, type: "manager", organizationId: id })

          fd.append("redirectTo", "/organization/" + id)
          await signIn("resend", fd)
        }}
        className="flex flex-col"
      >
        <label htmlFor="org">Organization Name</label>
        <input
          id="org"
          name="org"
          required
          placeholder="Organization Name"
          className="input"
        />

        <label htmlFor="name">Your Name</label>
        <input
          id="name"
          name="name"
          required
          placeholder="Your Name"
          className="input"
        />

        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Your Email"
          className="input"
        />

        <Pending />
      </form>
    </>
  )
}
