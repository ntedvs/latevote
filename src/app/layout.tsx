import { auth } from "@/lib/auth"
import "@/styles/base.css"
import { Metadata } from "next"
import Link from "next/link"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: { default: "LateVote", template: "%s | LateVote" },
}

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth()

  return (
    <html lang="en">
      <body>
        {session ? <p>x</p> : <Link href="/signin">Sign In</Link>}
        <main>{children}</main>
      </body>
    </html>
  )
}
