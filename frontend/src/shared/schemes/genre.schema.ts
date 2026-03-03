import { z } from 'zod'

export const dataGenreSchema = z.object({
  name: z.string().trim().min(3),
})

export type TDataGenre = z.infer<typeof dataGenreSchema>
