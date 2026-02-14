export const getToastId = () => {
  return crypto?.randomUUID() ?? Date.now().toString()
}
