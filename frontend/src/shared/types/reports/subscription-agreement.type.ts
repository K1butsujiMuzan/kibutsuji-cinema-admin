import type { TSubscriptionType } from '../../enums/subscription-type.type.ts'

export type TSubscriptionAgreement = {
  email: string
  startDate: string
  endDate: string
  type: TSubscriptionType
}
