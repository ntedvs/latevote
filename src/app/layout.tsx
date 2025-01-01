import { auth, signOut } from "@/lib/auth"
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
        <nav className="flex p-4 text-2xl">
          <Link href="/">Latevote</Link>

          <div className="ml-auto text-lg">
            {session ? (
              <button
                onClick={async () => {
                  "use server"
                  await signOut()
                }}
              >
                Sign Out
              </button>
            ) : (
              <div className="space-x-2">
                <Link
                  href="/register"
                  className="button bg-secondary rounded-full px-3"
                >
                  Register
                </Link>

                <Link href="/signin" className="button rounded-full px-3">
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </nav>

        <main className="mx-auto mb-8 w-4/5 lg:mt-8 lg:w-3/5">{children}</main>
      </body>
    </html>
  )
}
