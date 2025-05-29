import "@/styles/base.css"
import { Metadata } from "next"
import { Inter } from "next/font/google"
import { ReactNode } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: { default: "LateVote", template: "%s | LateVote" },
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`bg-background text-foreground ${inter.className}`}>
        <main className="mx-auto my-8 max-w-4xl">{children}</main>
      </body>
    </html>
  )
}
