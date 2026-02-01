import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(6).max(50),
  isReceiveNotifications: z.boolean(),
})

export type TCreateUser = z.infer<typeof createUserSchema>
