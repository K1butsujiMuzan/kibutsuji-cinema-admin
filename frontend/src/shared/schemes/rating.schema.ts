import { z } from 'zod'
import { ID_MIN_LENGTH, MAX_RATING } from '../../constants/limits.ts'

export const createRatingSchema = z.object({
  animeId: z.string().trim().min(ID_MIN_LENGTH),
  userId: z.string().trim().min(ID_MIN_LENGTH),
  rating: z.number().int().positive().max(MAX_RATING),
})

export const updateRatingSchema = createRatingSchema.pick({ rating: true })

export type TCreateRating = z.infer<typeof createRatingSchema>
export type TUpdateRating = z.infer<typeof updateRatingSchema>
