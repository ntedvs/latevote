import { auth, signIn } from "@/lib/auth"
import "@/styles/globals.css"
import { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: "",
}

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth()
  console.log(session)

  return (
    <html lang="en">
      <body>
        <nav>
          {session ? (
            <>
              <p>Signed In</p>
            </>
          ) : (
            <>
              <form
                action={async () => {
                  "use server"
                  await signIn()
                }}
              >
                <button>Sign In</button>
              </form>
            </>
          )}
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}
