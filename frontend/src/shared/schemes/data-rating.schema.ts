import { z } from 'zod'
import { MAX_RATING } from '../../constants/max-values.ts'

export const dataRatingSchema = z.object({
  animeId: z.string().trim().min(24),
  userId: z.string().trim().min(24),
  rating: z.number().int().positive().max(MAX_RATING),
})

export type TDataRating = z.infer<typeof dataRatingSchema>
