import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string().trim().min(3),
  email: z.email().trim(),
  password: z.string().trim().min(6),
  isReceiveNotifications: z.boolean(),
})

export type TCreateUser = z.infer<typeof createUserSchema>
