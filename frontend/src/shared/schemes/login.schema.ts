import { z } from 'zod'
import { MIN_PASSWORD_LENGTH } from '../../constants/limits.ts'

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().trim().min(MIN_PASSWORD_LENGTH),
})

export type TLogin = z.infer<typeof loginSchema>
