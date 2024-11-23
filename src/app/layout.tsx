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

  return (
    <html lang="en">
      <body>
        <nav className="flex p-4">
          <Link
            href="/"
            className="font-semibold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
          >
            Latevote
          </Link>

          <div className="ml-auto flex gap-2">
            {!session && (
              <Link
                href="/register"
                className="button bg-secondary px-3 py-2 rounded-full"
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
              <button className="button px-3 py-2 rounded-full">
                Sign {session ? "Out" : "In"}
              </button>
            </form>
          </div>
        </nav>
        <main className="w-4/5 sm:w-3/5 mx-auto">{children}</main>
      </body>
    </html>
  )
}
