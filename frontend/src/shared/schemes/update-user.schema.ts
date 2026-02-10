import { z } from 'zod'

export const updateUserSchema = z.object({
  email: z.email(),
  name: z.string().min(3),
  role: z.enum(['USER', 'ADMIN', 'MODERATOR']),
  emailVerified: z.boolean(),
  isReceiveNotifications: z.boolean(),
  image: z.string(),
})

export type TUpdateUser = z.infer<typeof updateUserSchema>
