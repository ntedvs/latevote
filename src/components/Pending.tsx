"use client"

import { useFormStatus } from "react-dom"

export default function Pending() {
  const { pending } = useFormStatus()

  return (
    <button
      disabled={pending}
      className="button disabled:bg-primary/80 disabled:cursor-not-allowed"
    >
      Submit
    </button>
  )
}
