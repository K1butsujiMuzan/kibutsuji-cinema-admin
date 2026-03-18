import { z } from 'zod'
import { ID_MIN_LENGTH, MAX_INT } from '../../constants/limits.ts'
import { SUBSCRIPTION_TYPES } from '../enums/subscription-type.type.ts'

export const createTransactionSchema = z.object({
  subscription: z.enum(SUBSCRIPTION_TYPES),
  sum: z.number().nonnegative().max(MAX_INT),
  userId: z.string().trim().min(ID_MIN_LENGTH),
})

export const updateTransactionSchema = createTransactionSchema.omit({
  userId: true,
})

export type TCreateTransaction = z.infer<typeof createTransactionSchema>
export type TUpdateTransaction = z.infer<typeof updateTransactionSchema>
