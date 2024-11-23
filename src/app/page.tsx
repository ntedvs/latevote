import { auth } from "@/lib/auth"
import Admin from "./Admin"
import Standard from "./Standard"

export default async function Home() {
  const session = await auth()

  return (
    <>
      {session ? (
        session.user.admin ? (
          <Admin groupId={session.user.groupId} />
        ) : (
          <Standard />
        )
      ) : (
        <>
          <h1>Latevote</h1>
          <p>Superlatives the easy way.</p>
        </>
      )}
    </>
  )
}
