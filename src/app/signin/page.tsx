import { signIn } from "@/lib/auth"

export default function SignIn() {
  return (
    <>
      <h1>SignIn</h1>

      <form
        action={async (fd) => {
          "use server"
          await signIn("nodemailer", fd)
        }}
        className="flex flex-col"
      >
        <p>Email</p>
        <input name="email" className="input" />

        <button className="button">Sign In</button>
      </form>
    </>
  )
}
