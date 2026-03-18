import type { TSubscriptionType } from '../enums/subscription-type.type.ts'

export type TSubscription = {
  id: string
  endDate: string
  type: TSubscriptionType
  userId: string
  createdAt: string
  updatedAt: string
}
