import { auth, signIn, signOut } from "@/lib/auth"
import "@/styles/base.css"
import { Metadata } from "next"
import Link from "next/link"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: { default: "Latevote", template: "%s | Latevote" },
}

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth()
  const path = session?.user.admin ? "Admin" : "Vote"

  return (
    <html lang="en">
      <body>
        <nav className="flex gap-4 p-4">
          <Link
            href="/"
            className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-2xl font-semibold text-transparent"
          >
            Latevote
          </Link>

          {session && (
            <Link href={"/" + path.toLowerCase()} className="text-2xl">
              {path}
            </Link>
          )}

          <div className="ml-auto flex gap-2">
            {!session && (
              <Link
                href="/register"
                className="button rounded-full bg-secondary px-3 py-2"
              >
                Register
              </Link>
            )}

            <form
              action={async () => {
                "use server"
                session ? await signOut() : await signIn()
              }}
            >
              <button className="button rounded-full px-3 py-2">
                Sign {session ? "Out" : "In"}
              </button>
            </form>
          </div>
        </nav>
        <main className="mx-auto w-4/5 sm:w-3/5">{children}</main>
      </body>
    </html>
  )
}
