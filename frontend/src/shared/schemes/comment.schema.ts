import { z } from 'zod'
import {
  ID_MIN_LENGTH,
  MAX_COMMENT_LENGTH,
  MIN_COMMENT_LENGTH,
} from '../../constants/limits.ts'

export const createCommentSchema = z.object({
  episodeId: z.string().trim().min(ID_MIN_LENGTH),
  text: z.string().trim().min(MIN_COMMENT_LENGTH).max(MAX_COMMENT_LENGTH),
  userId: z.string().trim().min(ID_MIN_LENGTH),
})

export const updateCommentSchema = createCommentSchema.pick({ text: true })

export type TCreateComment = z.infer<typeof createCommentSchema>
export type TUpdateComment = z.infer<typeof updateCommentSchema>
