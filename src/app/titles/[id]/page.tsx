import Pending from "@/components/Pending"
import { prisma } from "@/lib/prisma"
import protect from "@/utils/protect"
import { notFound } from "next/navigation"

interface Props {
  params: Promise<{ id: string }>
}

export default async function Id({ params }: Props) {
  const { id: userId, groupId } = await protect(false)
  const { id } = await params

  const title = await prisma.title.findUnique({ where: { id: +id } })
  if (!title || title.groupId !== groupId) notFound()

  const users = await prisma.user.findMany({
    where: { groupId, admin: false },
  })

  const response = await prisma.response.findUnique({
    where: { titleId_userId: { titleId: title.id, userId } },
  })

  return (
    <>
      <h1>{title.body}</h1>

      <form
        action={async (fd) => {
          "use server"

          const names = Array.from(fd.entries())
            .filter(([key]) => !isNaN(+key))
            .map((name) => name[1]) as string[]

          await prisma.response.upsert({
            where: { titleId_userId: { titleId: title.id, userId } },
            create: { names, titleId: title.id, userId },
            update: { names },
          })
        }}
        className="flex flex-col gap-2"
      >
        {Array.from({ length: title.size }).map((_, index) => (
          <select
            key={index}
            name={index + ""}
            defaultValue={response?.names[index] || ""}
            className="input"
          >
            {users.map((user) => (
              <option key={user.id}>{user.name}</option>
            ))}
          </select>
        ))}

        <Pending />
      </form>
    </>
  )
}
