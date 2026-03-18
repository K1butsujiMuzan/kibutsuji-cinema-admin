import { z } from 'zod'
import { ID_MIN_LENGTH } from '../../constants/limits.ts'
import { SUBSCRIPTION_TYPES } from '../enums/subscription-type.type.ts'

export const createSubscriptionSchema = z.object({
  type: z.enum(SUBSCRIPTION_TYPES),
  endDate: z.string().trim(),
  userId: z.string().trim().min(ID_MIN_LENGTH),
})

export const updateSubscriptionSchema = createSubscriptionSchema.omit({
  userId: true,
})

export type TCreateSubscription = z.infer<typeof createSubscriptionSchema>
export type TUpdateSubscription = z.infer<typeof updateSubscriptionSchema>
