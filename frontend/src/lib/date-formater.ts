export const dateFormater = (date: string) => {
  return new Date(date).toISOString().split('T')[0]
}

export const currentISODate = () => {
  return new Date().toISOString().split('T')[0]
}
