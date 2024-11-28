"use client"

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { deleteTitle, updateTitle } from "./actions"

interface Props {
  body: string
  id: number
}

export default function Title({ body, id }: Props) {
  const [show, setShow] = useState(false)
  const [edit, setEdit] = useState(false)

  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className="flex justify-between"
    >
      {edit ? (
        <form action={updateTitle}>
          <input name="body" defaultValue={body} className="bg-background" />
          <input name="id" value={id} readOnly hidden />

          <button className="button p-0">Save</button>
        </form>
      ) : (
        <p>{body}</p>
      )}

      {show && (
        <div className="flex">
          <button onClick={() => setEdit(!edit)}>
            <PencilSquareIcon className="size-6 text-green-500" />
          </button>

          <button onClick={() => deleteTitle(id)}>
            <TrashIcon className="size-6 text-red-500" />
          </button>
        </div>
      )}
    </div>
  )
}
