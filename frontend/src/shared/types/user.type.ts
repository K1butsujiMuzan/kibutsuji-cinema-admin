import type { TRole } from '../enums/roles.type.ts'

export interface IUser {
  email: string
  role: TRole
}
