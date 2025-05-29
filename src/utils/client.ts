export const shape = (fd: FormData) => {
  return Object.fromEntries(fd) as { [key: string]: string }
}
