import { signIn } from "@/lib/auth"

export default function SignIn() {
  return (
    <form
      action={async (fd) => {
        "use server"
        await signIn("nodemailer", fd)
      }}
    >
      <input name="email" className="input" />
      <button className="button">Submit</button>
    </form>
  )
}
