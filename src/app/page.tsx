import { auth } from "@/lib/auth"

export default async function Home() {
  const session = await auth()

  return (
    <>
      <h1>Home</h1>

      {session ? (
        <>
          {session.user.admin ? (
            <>
              <p>ADMIN</p>
            </>
          ) : (
            <>
              <p>NOT ADMINIG</p>
            </>
          )}
        </>
      ) : (
        <>
          <p>Blah LBah new user</p>
        </>
      )}
    </>
  )
}
