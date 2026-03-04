import { ID_MIN_LENGTH } from '../../constants/limits.ts'
import { z } from 'zod'
import { LIKE_VALUES } from '../types/like-value.type.ts'

export const createLikeSchema = z.object({
  commentId: z.string().trim().min(ID_MIN_LENGTH),
  userId: z.string().trim().min(ID_MIN_LENGTH),
  value: z.enum(LIKE_VALUES),
})

export const updateLikeSchema = createLikeSchema.pick({ value: true })

export type TCreateLike = z.infer<typeof createLikeSchema>
export type TUpdateLike = z.infer<typeof updateLikeSchema>
