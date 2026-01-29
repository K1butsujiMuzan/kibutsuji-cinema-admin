import type { TRole } from './roles.type.ts'

export interface IUsers {
  id: string
  name: string
  email: string
  role: TRole
  emailVerified: boolean
  isReceiveNotifications: boolean
  image: string | null | undefined
  createdAt: string
  updatedAt: string
}
