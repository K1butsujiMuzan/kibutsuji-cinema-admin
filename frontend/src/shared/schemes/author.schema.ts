import { z } from 'zod'

export const dataAuthorSchema = z.object({
  englishName: z.string().trim().min(3),
  originalName: z.string().trim(),
  image: z.string().trim(),
})

export type TFormAuthor = z.infer<typeof dataAuthorSchema>
