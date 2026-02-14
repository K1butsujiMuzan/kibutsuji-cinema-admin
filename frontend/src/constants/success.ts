export const SUCCESS = {
  DELETE: (name: string) => `${name} successfully deleted`,
  CREATE: (name: string) => `${name} successfully created`,
  UPDATE: (name: string) => `${name} successfully updated`,
} as const
