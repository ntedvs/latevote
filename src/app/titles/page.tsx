import { prisma } from "@/lib/prisma"
import protect from "@/utils/protect"
import { CheckIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

export default async function Titles() {
  const { groupId, id } = await protect(false)

  const titles = await prisma.title.findMany({ where: { groupId } })
  const responses = await prisma.response.findMany({ where: { userId: id } })

  return (
    <>
      <h1>Titles</h1>

      <div className="space-y-2 rounded border p-2">
        {titles.map((title) => {
          return (
            <div key={title.id} className="flex justify-between">
              <Link href={"/titles/" + title.id}>{title.body}</Link>

              {responses.find((response) => response.titleId === title.id) && (
                <CheckIcon className="size-6 text-green-500" />
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
