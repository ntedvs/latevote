"use server"

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export const deleteTitle = async (id: number) => {
  await prisma.title.delete({ where: { id } })
  redirect("/admin")
}

export const updateTitle = async (fd: FormData) => {
  const { body, id } = Object.fromEntries(fd) as {
    body: string
    id: string
  }

  await prisma.title.update({ where: { id: +id }, data: { body } })
  redirect("/admin")
}
