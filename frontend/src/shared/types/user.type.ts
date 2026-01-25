import type { ROLES } from '../schemes/roles.ts'

export type TRole = (typeof ROLES)[keyof typeof ROLES]

export interface IUser {
  id: string
  email: string
  name: string
  role: TRole
  image: string | null | undefined
}
