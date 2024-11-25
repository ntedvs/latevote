import { prisma } from "@/lib/prisma"
import protect from "@/utils/protect"
import { notFound } from "next/navigation"

interface Props {
  params: Promise<{ id: number }>
}

export default async function Id({ params }: Props) {
  const { groupId } = await protect(false)
  const { id } = await params

  const title = await prisma.title.findUnique({
    where: { id: +id },
  })

  if (!title || title.groupId !== groupId) {
    notFound()
  }

  const x = await prisma.user.findMany({ where: { groupId, admin: false } })
  console.log(x)

  return (
    <>
      <h1>{title.body}</h1>
    </>
  )
}
