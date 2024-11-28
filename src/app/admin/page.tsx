import { prisma } from "@/lib/prisma"
import protect from "@/utils/protect"
import Link from "next/link"
import Title from "./Title"

export default async function Admin() {
  const { groupId } = await protect(true)

  const titles = await prisma.title.findMany({ where: { groupId } })
  const users = await prisma.user.findMany({ where: { groupId } })

  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <h2>Titles</h2>

        <Link href="/admin/title" className="button">
          New
        </Link>
      </div>

      <div className="space-y-2 rounded border p-4">
        {titles
          .sort((a, b) => a.body.localeCompare(b.body))
          .map((title) => (
            <Title key={title.id} id={title.id} body={title.body} />
          ))}
      </div>

      <div className="mb-2 mt-4 flex items-center justify-between">
        <h2>Users</h2>

        <Link href="/admin/user" className="button">
          Add
        </Link>
      </div>

      <div className="space-y-2 rounded border p-4">
        {users.map((user) => {
          return (
            <div key={user.id} className="flex justify-between">
              <p className={`${user.admin && "font-semibold"}`}>{user.name}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}
