import { z } from 'zod'
import { LIST_TYPES } from '../types/list.type.ts'

export const dataListSchema = z.object({
  animeId: z.string().trim().min(24),
  list: z.enum(LIST_TYPES),
  userId: z.string().trim().min(24),
})

export type TDataList = z.infer<typeof dataListSchema>
