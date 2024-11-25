import Pending from "@/components/Pending"
import { prisma } from "@/lib/prisma"
import protect from "@/utils/protect"
import { redirect } from "next/navigation"

export default async function Title() {
  const { groupId } = await protect(true)

  return (
    <>
      <h1>New Title</h1>

      <form
        action={async (fd) => {
          "use server"

          const { body, size } = Object.fromEntries(fd) as {
            body: string
            size: string
          }

          await prisma.title.create({ data: { body, size: +size, groupId } })

          redirect("/")
        }}
        className="flex flex-col"
      >
        <p>Body</p>
        <input name="body" className="input" />

        <p>Size</p>
        <input type="number" name="size" defaultValue={1} className="input" />

        <Pending />
      </form>
    </>
  )
}
