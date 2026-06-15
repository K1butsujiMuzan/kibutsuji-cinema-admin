import { z } from 'zod'
import { SLUG_REGEXP } from '../../constants/regexp.ts'

export const dataAuthorSchema = z.object({
  slug: z.string().trim().min(3).regex(SLUG_REGEXP),
  englishName: z.string().trim().min(3),
  originalName: z.string().trim(),
  image: z.string().trim(),
})

export type TFormAuthor = z.infer<typeof dataAuthorSchema>
