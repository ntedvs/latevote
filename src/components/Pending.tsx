"use client"

import { useFormStatus } from "react-dom"

export default function Pending() {
  const status = useFormStatus()

  return (
    <button
      disabled={status.pending}
      className="button disabled:cursor-not-allowed disabled:bg-opacity-80"
    >
      Submit
    </button>
  )
}
