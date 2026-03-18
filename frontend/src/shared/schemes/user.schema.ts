import { z } from 'zod'
import { ROLES } from '../enums/roles.type.ts'
import { MIN_PASSWORD_LENGTH } from '../../constants/limits.ts'

export const createUserSchema = z.object({
  name: z.string().trim().min(3),
  email: z.email().trim(),
  password: z.string().trim().min(MIN_PASSWORD_LENGTH),
  isReceiveNotifications: z.boolean(),
})

export const updateUserSchema = z.object({
  email: z.email(),
  name: z.string().min(3),
  role: z.enum(ROLES),
  emailVerified: z.boolean(),
  isReceiveNotifications: z.boolean(),
  image: z.string(),
})

export type TUpdateUser = z.infer<typeof updateUserSchema>
export type TCreateUser = z.infer<typeof createUserSchema>
