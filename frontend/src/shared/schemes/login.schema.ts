import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().trim().min(6),
})

export type TLogin = z.infer<typeof loginSchema>
