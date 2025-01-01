import { Config } from "tailwindcss"

const config: Config = {
  content: ["src/app/**/*.tsx", "src/components/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        foreground: "#0e0a10",
        background: "#fbfafc",
        primary: "#9772a1",
        secondary: "#8bb290",
      },
    },
  },
}

export default config
