import { prisma } from "@/lib/prisma"
import protect from "@/utils/protect"
import Link from "next/link"

export default async function Vote() {
  const { groupId, id } = await protect(false)

  const titles = await prisma.title.findMany({ where: { groupId } })
  // const responses = await prisma.response.findMany({ where: { userId: id } })

  return (
    <>
      <h1>Vote</h1>

      <div className="flex flex-col rounded border p-2">
        {titles.map((title) => {
          return (
            <Link href={"/vote/" + title.id} key={title.id}>
              {title.body}
            </Link>
          )
        })}
      </div>
    </>
  )
}
