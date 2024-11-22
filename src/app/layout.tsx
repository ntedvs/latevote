import { auth, signIn } from "@/lib/auth"
import "@/styles/globals.css"
import { Metadata } from "next"
import { signOut } from "next-auth/react"
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
          <Link href="/" className="gradient text-3xl font-semibold">
            Latevote
          </Link>

          <div className="ml-auto flex items-center gap-2">
            {!session && (
              <Link
                href="/register"
                className="button bg-secondary rounded-full px-3 py-2"
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
