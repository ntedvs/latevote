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
      <body className={"bg-background text-foreground " + inter.className}>
        <main className="mx-auto w-7/8 lg:w-6/8 2xl:w-5/8">{children}</main>
      </body>
    </html>
  )
}
