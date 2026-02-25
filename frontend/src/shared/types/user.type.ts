import type { TRole } from './roles.type.ts'

export interface IUser {
  id: string
  email: string
  name: string
  role: TRole
  image: string | null
}
