"use client"

import Pending from "@/components/pending"
import { useActionState } from "react"
import { check } from "./actions"

export default function Form() {
  const [state, action] = useActionState(check, { error: "", email: "" })

  return (
    <form action={action} className="mx-auto flex max-w-100 flex-col">
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        required
        placeholder="Email"
        className="input mb-2"
        defaultValue={state?.email}
      />

      {state?.error && (
        <p className="mb-2 text-center text-red-500">{state.error}</p>
      )}

      <Pending />
    </form>
  )
}
