import type { TSubscriptionType } from '../../enums/subscription-type.type.ts'

type TSubscriptionsReportData = {
  count: number
  type: TSubscriptionType
}

export type TSubscriptionsReport = {
  data: TSubscriptionsReportData[]
  sum: number
  mostPopularSubscription: TSubscriptionType | null
}
