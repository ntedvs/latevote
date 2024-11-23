import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function Admin({ groupId }: { groupId: number }) {
  const titles = await prisma.title.findMany({ where: { groupId } })
  const users = await prisma.user.findMany({ where: { groupId } })

  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <h2>Titles</h2>

        <Link href="/new/title" className="button">
          New
        </Link>
      </div>

      <div className="space-y-2 rounded border p-4">
        {titles
          .sort((a, b) => a.body.localeCompare(b.body))
          .map((title) => {
            return (
              <div key={title.id}>
                <p className="text-lg">{title.body}</p>
              </div>
            )
          })}
      </div>

      <div className="mb-2 mt-4 flex items-center justify-between">
        <h2>Users</h2>

        <Link href="/new/user" className="button">
          New
        </Link>
      </div>

      <div className="space-y-2 rounded border p-4">
        {users.map((user) => {
          return (
            <div key={user.id}>
              <p className="text-lg">{user.name}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}
