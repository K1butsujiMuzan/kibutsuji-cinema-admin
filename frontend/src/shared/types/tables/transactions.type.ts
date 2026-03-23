import type { TSubscriptionType } from '../../enums/subscription-type.type.ts'

export type TTransaction = {
  id: string
  subscription: TSubscriptionType
  sum: number
  userId: string
  createdAt: string
  updatedAt: string
}
