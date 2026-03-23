export const dateFormater = (date: string) => {
  return new Date(date).toISOString().split('T')[0]
}

export const currentDate = () => {
  return new Date().toISOString().split('T')[0]
}

export const reformatDate = (date: string): string => {
  return new Date(date).toISOString()
}
