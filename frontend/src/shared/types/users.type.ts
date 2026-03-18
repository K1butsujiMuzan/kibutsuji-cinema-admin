import type { TRole } from '../enums/roles.type.ts'

export type TUser = {
  id: string
  name: string
  email: string
  role: TRole
  emailVerified: boolean
  isReceiveNotifications: boolean
  image: string | null
  createdAt: string
  updatedAt: string
}
