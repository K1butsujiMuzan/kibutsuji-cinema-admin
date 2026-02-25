import { z } from 'zod'
import { ROLES } from '../types/roles.type.ts'

export const updateUserSchema = z.object({
  email: z.email(),
  name: z.string().min(3),
  role: z.enum(ROLES),
  emailVerified: z.boolean(),
  isReceiveNotifications: z.boolean(),
  image: z.string(),
})

export type TUpdateUser = z.infer<typeof updateUserSchema>
