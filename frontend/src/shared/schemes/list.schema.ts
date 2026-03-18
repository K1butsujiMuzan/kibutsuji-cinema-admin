import { z } from 'zod'
import { LIST_TYPES } from '../enums/list-type.type.ts'
import { ID_MIN_LENGTH } from '../../constants/limits.ts'

export const createListSchema = z.object({
  animeId: z.string().trim().min(ID_MIN_LENGTH),
  list: z.enum(LIST_TYPES),
  userId: z.string().trim().min(ID_MIN_LENGTH),
})

export const updateListSchema = createListSchema.pick({ list: true })

export type TCreateList = z.infer<typeof createListSchema>
export type TUpdateList = z.infer<typeof updateListSchema>
